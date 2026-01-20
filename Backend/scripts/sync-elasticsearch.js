#!/usr/bin/env node

/**
 * Elasticsearch Migration Script
 * 
 * Run this after enabling Elasticsearch to sync all MongoDB data.
 * Usage: npm run es:sync
 */

require('dotenv').config();

const mongoose = require('mongoose');
const { initializeElasticsearch, isElasticsearchEnabled } = require('../src/config/elasticsearch');
const syncService = require('../src/services/sync.service');
const logger = require('../src/utils/logger');

async function main() {
    console.log('='.repeat(50));
    console.log('Elasticsearch Migration Script');
    console.log('='.repeat(50));

    if (!isElasticsearchEnabled()) {
        console.error('\nError: ELASTICSEARCH_ENABLED is not set to true');
        console.log('Set ELASTICSEARCH_ENABLED=true in your .env file first.\n');
        process.exit(1);
    }

    try {
        console.log('\nConnecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected.');

        console.log('\nInitializing Elasticsearch...');
        await initializeElasticsearch();
        console.log('Elasticsearch initialized.');

        console.log('\nStarting migration...\n');
        const result = await syncService.migrateToElasticsearch();

        console.log('\n' + '='.repeat(50));
        console.log('Migration Complete');
        console.log('='.repeat(50));
        console.log(`Total novels: ${result.total}`);
        console.log(`Successfully indexed: ${result.indexed}`);
        console.log(`Failed: ${result.failed}`);
        console.log('='.repeat(50) + '\n');

        process.exit(result.failed > 0 ? 1 : 0);
    } catch (error) {
        logger.error('Migration failed:', error);
        console.error('\nMigration failed:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

main();
