const {
	getElasticClient,
	isElasticsearchEnabled,
	NOVEL_INDEX
} = require('../config/elasticsearch');
const { NOVEL_STATUS } = require('../utils/constants');
const logger = require('../utils/logger');

class ElasticsearchService {
	async indexNovel(novel) {
		if (!isElasticsearchEnabled()) return;

		try {
			await getElasticClient().index({
				index: NOVEL_INDEX,
				id: novel._id.toString(),
				document: this.transformNovelToDocument(novel)
			});
			logger.debug(`Indexed novel ${novel._id}`);
		} catch (error) {
			logger.error(`Failed to index novel ${novel._id}:`, error);
			throw error;
		}
	}

	async bulkIndex(novels) {
		if (!isElasticsearchEnabled()) return;

		try {
			const operations = novels.flatMap(novel => [{
				index: {
					_index: NOVEL_INDEX,
					_id: novel._id.toString()
				}
			},
			this.transformNovelToDocument(novel)
			]);

			const {
				errors,
				items
			} = await getElasticClient().bulk({
				operations
			});

			if (errors) {
				const failedItems = items.filter(item => item.index.error);
				logger.error(`Bulk indexing had errors:`, failedItems);
				throw new Error('Bulk indexing failed');
			}

			logger.debug(`Bulk indexed ${novels.length} novels`);
		} catch (error) {
			logger.error('Bulk indexing failed:', error);
			throw error;
		}
	}

	async updateNovel(novelId, updateData) {
		if (!isElasticsearchEnabled()) return;

		try {
			await getElasticClient().update({
				index: NOVEL_INDEX,
				id: novelId.toString(),
				doc: this.transformNovelToDocument(updateData)
			});
			logger.debug(`Updated novel ${novelId}`);
		} catch (error) {
			logger.error(`Failed to update novel ${novelId}:`, error);
			throw error;
		}
	}

	async bulkUpdate(updates) {
		if (!isElasticsearchEnabled()) return;

		try {
			const operations = updates.flatMap(({
				id,
				data
			}) => [{
				update: {
					_index: NOVEL_INDEX,
					_id: id.toString()
				}
			},
			{
				doc: this.transformNovelToDocument(data)
			}
				]);

			const {
				errors,
				items
			} = await getElasticClient().bulk({
				operations
			});

			if (errors) {
				const failedItems = items.filter(item => item.update.error);
				logger.error(`Bulk update had errors:`, failedItems);
				throw new Error('Bulk update failed');
			}

			logger.debug(`Bulk updated ${updates.length} novels`);
		} catch (error) {
			logger.error('Bulk update failed:', error);
			throw error;
		}
	}

	async deleteNovel(novelId) {
		if (!isElasticsearchEnabled()) return;

		try {
			await getElasticClient().delete({
				index: NOVEL_INDEX,
				id: novelId.toString()
			});
			logger.debug(`Deleted novel ${novelId}`);
		} catch (error) {
			logger.error(`Failed to delete novel ${novelId}:`, error);
			throw error;
		}
	}

	async bulkDelete(novelIds) {
		if (!isElasticsearchEnabled()) return;

		try {
			const operations = novelIds.map(id => ({
				delete: {
					_index: NOVEL_INDEX,
					_id: id.toString()
				}
			}));

			const {
				errors,
				items
			} = await getElasticClient().bulk({
				operations
			});

			if (errors) {
				const failedItems = items.filter(item => item.delete.error);
				logger.error(`Bulk deletion had errors:`, failedItems);
				throw new Error('Bulk deletion failed');
			}

			logger.debug(`Bulk deleted ${novelIds.length} novels`);
		} catch (error) {
			logger.error('Bulk deletion failed:', error);
			throw error;
		}
	}

	async searchNovels(searchParams) {
		if (!isElasticsearchEnabled()) return null;

		const {
			search,
			genres,
			tags,
			status,
			minRating,
			sortBy,
			page = 1,
			limit = 10,
			author,
			includeDeleted
		} = searchParams;

		try {
			const searchBody = {
				query: {
					bool: {
						must: [],
						should: [],
						filter: [],
						must_not: includeDeleted ? [] : [{ term: { status: NOVEL_STATUS.DELETED } }],
						minimum_should_match: 0
					}
				}
			};

			if (search || author) {
				searchBody.query.bool.minimum_should_match = 1;
			}

			if (search) {
				searchBody.query.bool.should.push({
					multi_match: {
						query: search,
						fields: ['title^3', 'description'],
						type: 'best_fields',
						fuzziness: 'AUTO',
						boost: 2.0
					}
				});
			}

			if (author) {
				searchBody.query.bool.should.push(
					{
						term: {
							'author.username': {
								value: author,
								boost: 5.0
							}
						}
					},
					{
						match_phrase_prefix: {
							'author.username': {
								query: author,
								boost: 3.0
							}
						}
					},
					{
						match: {
							'author.username': {
								query: author,
								fuzziness: 'AUTO',
								boost: 1.0
							}
						}
					}
				);
			}

			if (genres?.length) {
				const genreFilters = genres.map(genre => ({
					term: { genres: genre }
				}));
				searchBody.query.bool.filter.push({
					bool: {
						must: genreFilters
					}
				});
			}

			if (tags?.length) {
				const tagFilters = tags.map(tag => ({
					term: { tags: tag }
				}));
				searchBody.query.bool.filter.push({
					bool: {
						must: tagFilters
					}
				});
			}

			if (status) {
				searchBody.query.bool.filter.push({
					term: { status }
				});
			}

			if (minRating) {
				searchBody.query.bool.filter.push({
					range: {
						'calculatedStats.averageRating': { gte: Number(minRating) }
					}
				});
			}

			searchBody.sort = this.buildSortOptions(sortBy);
			searchBody.from = (page - 1) * limit;
			searchBody.size = limit;

			if (search || author) {
				searchBody.highlight = {
					fields: {
						title: {},
						description: {},
						'author.username': {}
					}
				};
			}

			const result = await getElasticClient().search({
				index: NOVEL_INDEX,
				body: searchBody
			});

			return {
				total: result.hits.total.value,
				hits: result.hits.hits.map(hit => ({
					...hit._source,
					id: hit._id,
					score: hit._score,
					highlights: hit.highlight
				}))
			};
		} catch (error) {
			logger.error('Search failed:', error);
			throw error;
		}
	}

	buildSortOptions(sortBy) {
		switch (sortBy) {
			case 'rating':
				return [{ 'calculatedStats.averageRating': 'desc' }];
			case 'views':
				return [{ viewCount: 'desc' }];
			case 'recent':
				return [{ updatedAt: 'desc' }];
			case 'chapters':
				return [{ totalChapters: 'desc' }];
			default:
				return [{ _score: 'desc' }];
		}
	}

	transformNovelToDocument(novel) {
		const esDocument = {
			title: novel.title,
			description: novel.description,

			author: novel.author && {
				id: novel.author._id?.toString(),
				username: novel.author.username
			},

			genres: novel.genres || [],
			tags: novel.tags || [],

			status: novel.status,

			calculatedStats: {
				averageRating: novel.calculatedStats?.averageRating || 0,
				ratingCount: novel.calculatedStats?.ratingCount || 0
			},

			hasCover: novel.cover && novel.cover.data ? true : false,

			viewCount: novel.viewCount || 0,
			totalChapters: novel.totalChapters || 0,

			createdAt: novel.createdAt,
			updatedAt: novel.updatedAt
		};

		if (esDocument.cover && esDocument.cover.data) {
			delete esDocument.cover;
		}

		Object.keys(esDocument).forEach(key => {
			if (esDocument[key] === undefined) {
				delete esDocument[key];
			}
		});

		return esDocument;
	}

	async getAllNovelIds() {
		if (!isElasticsearchEnabled()) return [];

		try {
			const result = await getElasticClient().search({
				index: NOVEL_INDEX,
				body: {
					query: {
						match_all: {}
					},
					_source: false,
					size: 10000
				}
			});

			return result.hits.hits.map(hit => hit._id);
		} catch (error) {
			logger.error('Failed to get novel IDs:', error);
			throw error;
		}
	}

	async getRecentNovels(limit = 5) {
		if (!isElasticsearchEnabled()) return [];

		try {
			const result = await getElasticClient().search({
				index: NOVEL_INDEX,
				body: {
					query: { match_all: {} },
					sort: [{ createdAt: 'desc' }],
					size: limit
				}
			});

			return result.hits.hits.map(hit => ({
				id: hit._id,
				title: hit._source.title,
				author: hit._source.author.username,
				createdAt: hit._source.createdAt
			}));
		} catch (error) {
			logger.error('Failed to fetch recent novels:', error);
			throw error;
		}
	}
}

module.exports = new ElasticsearchService();