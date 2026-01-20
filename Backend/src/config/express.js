const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const timeout = require('express-timeout-handler');
const { corsMiddleware } = require('./cors');
const security = require('./security');
const logger = require('../utils/logger');
const {
	initializeElasticsearch,
	isElasticsearchEnabled
} = require('./elasticsearch');
const syncService = require('../services/sync.service');
const crypto = require('crypto');
const {
	FILE_SIZES,
	HTTP_STATUS,
	ERROR_MESSAGES,
	RATE_LIMITS,
	TIMEOUTS
} = require('../utils/constants');

const configureExpress = (app) => {
	// Disable x-powered-by header in production to minimize information disclosure about the server
	if (process.env.NODE_ENV === 'production') {
		app.disable('x-powered-by');
	}

	// Request timeout is configured before other middleware to ensure
	// all routes are subject to the timeout limit
	app.use(timeout.handler({
		timeout: TIMEOUTS.CONNECT,
		onTimeout: function (req, res) {
			res.status(HTTP_STATUS.SERVICE_UNAVAILABLE)
				.json({
					status: 'error',
					message: ERROR_MESSAGES.TIMEOUT
				});
		}
	}));

	app.use(security);

	app.use(corsMiddleware);

	app.use(express.json({
		limit: FILE_SIZES.JSON_LIMIT
	}));
	app.use(express.urlencoded({
		extended: true,
		limit: FILE_SIZES.URLENCODED_LIMIT
	}));

	app.use(mongoSanitize());

	app.use(compression());

	const limiter = rateLimit({
		windowMs: RATE_LIMITS.API.windowMs,
		max: RATE_LIMITS.API.max,
		message: ERROR_MESSAGES.TOO_MANY_REQUESTS,
		standardHeaders: true,
		legacyHeaders: false,
	});
	app.use('/api', limiter);

	app.use((req, res, next) => {
		const startTime = Date.now();
		const logData = {
			method: req.method,
			path: req.path,
			ip: req.headers['x-forwarded-for']?.split(',')[0] || req.ip,
			userId: req.user?.id,
			correlationId: req.headers['x-correlation-id'] || crypto.randomUUID()
		};

		if (process.env.NODE_ENV !== 'production') {
			const safeHeaders = {
				...req.headers
			};
			const sensitiveFields = ['authorization', 'cookie', 'x-api-key', 'password'];
			sensitiveFields.forEach(field => delete safeHeaders[field]);
			logData.headers = safeHeaders;
			logData.query = req.query;
		}

		res.on('finish', () => {
			logData.statusCode = res.statusCode;
			logData.responseTime = Date.now() - startTime;

			const level = res.statusCode >= 400 ? 'error' : 'info';
			logger[level]('Request completed', logData);
		});

		next();
	});

	app.get('/', (req, res) => {
		if (process.env.NODE_ENV === 'production') {
			return res.status(200).json({
				status: 'ok'
			});
		}

		res.json({
			message: 'Welcome to the Novel Reading API',
			version: process.env.npm_package_version || '1.0.0',
			endpoints: {
				api: '/api',
				docs: '/api/docs',
				health: '/api/health'
			}
		});
	});

	initializeElasticsearch()
		.then(async () => {
			if (!isElasticsearchEnabled()) {
				return;
			}

			try {
				await syncService.initializeSync();

				setInterval(() => {
					syncService.verifySync().catch(error => {
						logger.error('Scheduled sync verification failed:', error);
					});
				}, 24 * 60 * 60 * 1000);

				logger.info('Elasticsearch initialized and synchronized successfully');
			} catch (error) {
				logger.error('Failed to initialize sync:', error);
			}
		})
		.catch(error => {
			logger.error('Failed to initialize Elasticsearch:', error);
		});

	return app;
};

module.exports = configureExpress;