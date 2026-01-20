const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const logger = require('./utils/logger');
const { TIMEOUTS } = require('./utils/constants');
const { corsOptions } = require('./config/cors');
const { initializeSocket } = require('./config/socket');

try {
	const server = http.createServer(app);

	const io = new Server(server, {
		cors: {
			origin: corsOptions.origin,
			methods: corsOptions.methods,
			credentials: corsOptions.credentials
		}
	});

	initializeSocket(io);

	server.listen(process.env.PORT, '0.0.0.0', () => {
		logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
	});

	const gracefulShutdown = () => {
		logger.info('Received shutdown signal. Starting graceful shutdown...');

		io.close(() => {
			logger.info('Socket.io closed');
		});

		server.close(() => {
			logger.info('Server closed successfully');
			process.exit(0);
		});

		setTimeout(() => {
			logger.error('Could not close connections in time, forcefully shutting down');
			process.exit(1);
		}, TIMEOUTS.GRACEFUL_SHUTDOWN);
	};

	process.on('SIGTERM', gracefulShutdown);
	process.on('SIGINT', gracefulShutdown);

} catch (error) {
	logger.error('Failed to start server:', error);
	process.exit(1);
}