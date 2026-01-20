const jwt = require('jsonwebtoken');
const SocketService = require('../services/socket.service');
const NotificationService = require('../services/notification.service');
const logger = require('../utils/logger');

function initializeSocket(io) {
    SocketService.initialize(io);
    NotificationService.setSocketService(SocketService);

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication required'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.type !== 'access') {
                return next(new Error('Invalid token type'));
            }
            socket.userId = decoded.userId;
            next();
        } catch (error) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.userId;

        SocketService.addUserSocket(userId, socket.id);
        logger.info(`User ${userId} connected via WebSocket (${socket.id})`);

        socket.on('disconnect', () => {
            SocketService.removeUserSocket(userId, socket.id);
            logger.info(`User ${userId} disconnected (${socket.id})`);
        });
    });

    logger.info('Socket.io initialized');
}

module.exports = { initializeSocket };
