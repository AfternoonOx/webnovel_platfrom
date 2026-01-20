const mongoose = require('mongoose');
const Novel = require('../models/novel.model');
const elasticsearchService = require('./elasticsearch.service');
const { isElasticsearchEnabled, getElasticClient, NOVEL_INDEX } = require('../config/elasticsearch');
const logger = require('../utils/logger');

class SyncService {
	constructor() {
		this.pollInterval = 30000;
		this.pollTimer = null;
		this.lastSyncTime = new Date();
		this.maxRetries = 3;
		this.batchSize = 100;
	}

	async initializeSync() {
		if (!isElasticsearchEnabled()) {
			logger.info('Elasticsearch disabled, skipping sync initialization');
			return;
		}

		try {
			logger.info('Starting initial sync with Elasticsearch');
			await this.processNovelsInBatches(
				await Novel.find().populate('author', 'username').lean(),
				async (novel) => await elasticsearchService.indexNovel(novel)
			);
			this.setupPolling();
		} catch (error) {
			logger.error('Failed to initialize sync:', error);
			throw error;
		}
	}

	async migrateToElasticsearch() {
		if (!isElasticsearchEnabled()) {
			throw new Error('Cannot migrate: Elasticsearch is not enabled. Set ELASTICSEARCH_ENABLED=true first.');
		}

		logger.info('Starting full migration to Elasticsearch');
		const novels = await Novel.find().populate('author', 'username').lean();

		let indexed = 0;
		let failed = 0;

		await this.processNovelsInBatches(novels, async (novel) => {
			try {
				await this.retryOperation(() => elasticsearchService.indexNovel(novel));
				indexed++;
				if (indexed % 100 === 0) {
					logger.info(`Migration progress: ${indexed}/${novels.length} novels indexed`);
				}
			} catch (error) {
				failed++;
				logger.error(`Failed to index novel ${novel._id}:`, error.message);
			}
		});

		logger.info(`Migration complete: ${indexed} indexed, ${failed} failed out of ${novels.length} total`);
		return { total: novels.length, indexed, failed };
	}

	setupPolling() {
		if (this.pollTimer) clearInterval(this.pollTimer);

		this.pollTimer = setInterval(async () => {
			const currentTime = new Date();
			try {
				await this.pollForChanges(currentTime);
				this.lastSyncTime = currentTime;
			} catch (error) {
				logger.error('Error during polling sync:', error);
			}
		}, this.pollInterval);

		logger.info('Polling-based synchronization initialized');
	}

	async pollForChanges(currentTime) {
		if (!isElasticsearchEnabled()) return;

		const modifiedNovels = await Novel.find({
			updatedAt: {
				$gt: this.lastSyncTime
			}
		})
			.populate('author', 'username')
			.lean();

		if (modifiedNovels.length > 0) {
			await this.processNovelsInBatches(modifiedNovels,
				async (novel) => await this.retryOperation(
					() => elasticsearchService.updateNovel(novel._id, novel)
				)
			);
		}

		await this.handleDeletedNovels();
	}

	async handleDeletedNovels() {
		if (!isElasticsearchEnabled()) return;

		const [esNovels, mongoNovels] = await Promise.all([
			elasticsearchService.getAllNovelIds(),
			Novel.find({}, '_id').lean()
		]);

		const mongoIds = new Set(mongoNovels.map(n => n._id.toString()));
		const deletedIds = esNovels.filter(id => !mongoIds.has(id));

		if (deletedIds.length > 0) {
			await this.processNovelsInBatches(deletedIds,
				async (id) => await this.retryOperation(
					() => elasticsearchService.deleteNovel(id)
				)
			);
		}
	}

	async verifySync() {
		if (!isElasticsearchEnabled()) return;

		try {
			logger.info('Starting sync verification');
			const novels = await Novel.find()
				.populate('author', 'username')
				.lean();

			let repaired = 0;
			await this.processNovelsInBatches(novels, async (novel) => {
				try {
					const esDoc = await getElasticClient().get({
						index: NOVEL_INDEX,
						id: novel._id.toString()
					});

					if (!this.compareDocuments(novel, esDoc._source)) {
						await this.retryOperation(
							() => elasticsearchService.indexNovel(novel)
						);
						repaired++;
					}
				} catch (error) {
					if (error.meta?.statusCode === 404) {
						await this.retryOperation(
							() => elasticsearchService.indexNovel(novel)
						);
						repaired++;
					}
				}
			});

			logger.info(`Sync verification completed. Repaired ${repaired} documents`);
		} catch (error) {
			logger.error('Failed to verify sync:', error);
		}
	}

	async processNovelsInBatches(items, operation) {
		for (let i = 0; i < items.length; i += this.batchSize) {
			const batch = items.slice(i, i + this.batchSize);
			await Promise.all(batch.map(operation));
		}
	}

	async retryOperation(operation, retries = this.maxRetries) {
		for (let attempt = 1; attempt <= retries; attempt++) {
			try {
				return await operation();
			} catch (error) {
				if (attempt === retries) throw error;
				const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
				await new Promise(resolve => setTimeout(resolve, delay));
			}
		}
	}

	compareDocuments(mongoDoc, esDoc) {
		const fields = [
			'title', 'description', 'genres', 'tags', 'status',
			'calculatedStats', 'viewCount', 'totalChapters'
		];

		return fields.every(field => {
			const mongoValue = mongoDoc[field];
			const esValue = esDoc[field];
			return typeof mongoValue === 'object' && mongoValue !== null ?
				JSON.stringify(mongoValue) === JSON.stringify(esValue) :
				mongoValue === esValue;
		});
	}

	stopSync() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
			logger.info('Sync service stopped');
		}
	}
}

module.exports = new SyncService();