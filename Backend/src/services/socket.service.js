let io = null;
const userSockets = new Map();

const SocketService = {
    initialize(socketIo) {
        // Store the Socket.IO server instance so non-socket code paths can emit events.
        io = socketIo;
    },

    addUserSocket(userId, socketId) {
        // Track multiple concurrent sockets per user (e.g., multiple tabs/devices).
        if (!userSockets.has(userId)) {
            userSockets.set(userId, new Set());
        }
        userSockets.get(userId).add(socketId);
    },

    removeUserSocket(userId, socketId) {
        if (userSockets.has(userId)) {
            userSockets.get(userId).delete(socketId);
            // Keep the map small by removing users that have no active sockets.
            if (userSockets.get(userId).size === 0) {
                userSockets.delete(userId);
            }
        }
    },

    isUserOnline(userId) {
        // “Online” here means at least one active socket registered for the user.
        return userSockets.has(userId) && userSockets.get(userId).size > 0;
    },

    emitToUser(userId, event, data) {
        // Fail fast when sockets are not configured; callers can fall back to polling.
        if (!io) return false;

        const sockets = userSockets.get(userId);
        if (sockets && sockets.size > 0) {
            // Fan-out to every active connection for consistent multi-device UX.
            sockets.forEach(socketId => {
                io.to(socketId).emit(event, data);
            });
            return true;
        }
        return false;
    },

    getOnlineUserCount() {
        return userSockets.size;
    }
};

module.exports = SocketService;
