const { Client } = require('@elastic/elasticsearch');
const logger = require('../utils/logger');

let elasticClient = null;
let isEnabled = false;

function isElasticsearchEnabled() {
    return isEnabled;
}

function getElasticClient() {
    return elasticClient;
}

async function initializeElasticsearch() {
    const enabledEnv = process.env.ELASTICSEARCH_ENABLED;
    isEnabled = enabledEnv === 'true' || enabledEnv === '1';

    if (!isEnabled) {
        logger.info('Elasticsearch is disabled, running in MongoDB-only mode');
        return;
    }

    elasticClient = new Client({
        node: process.env.ELASTICSEARCH_NODE,
        auth: {
            username: process.env.ELASTICSEARCH_USERNAME,
            password: process.env.ELASTICSEARCH_PASSWORD
        },
        maxRetries: 5,
        requestTimeout: 10000,
        sniffOnStart: true
    });

    try {
        const indexExists = await elasticClient.indices.exists({
            index: NOVEL_INDEX
        });

        if (!indexExists) {
            await elasticClient.indices.create({
                index: NOVEL_INDEX,
                body: NOVEL_MAPPING
            });
            logger.info(`Created Elasticsearch index: ${NOVEL_INDEX}`);
        }

        logger.info('Elasticsearch initialized successfully');
    } catch (error) {
        logger.error('Failed to initialize Elasticsearch:', error);
        throw error;
    }
}

const NOVEL_INDEX = 'novels';

const NOVEL_MAPPING = {
    mappings: {
        properties: {
            title: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                    keyword: { type: 'keyword' }
                }
            },
            description: {
                type: 'text',
                analyzer: 'standard'
            },
            author: {
                properties: {
                    id: { type: 'keyword' },
                    username: {
                        type: 'text',
                        analyzer: 'standard',
                        fields: {
                            keyword: { type: 'keyword' }
                        }
                    }
                }
            },
            genres: { type: 'keyword' },
            tags: { type: 'keyword' },
            status: { type: 'keyword' },
            calculatedStats: {
                properties: {
                    averageRating: { type: 'float' },
                    ratingCount: { type: 'integer' }
                }
            },
            hasCover: { type: 'boolean' },
            viewCount: { type: 'integer' },
            totalChapters: { type: 'integer' },
            createdAt: { type: 'date' },
            updatedAt: { type: 'date' }
        }
    },
    settings: {
        analysis: {
            analyzer: {
                standard: {
                    type: 'standard',
                    stopwords: '_english_'
                }
            }
        }
    }
};

module.exports = {
    isElasticsearchEnabled,
    getElasticClient,
    initializeElasticsearch,
    NOVEL_INDEX,
    NOVEL_MAPPING
};