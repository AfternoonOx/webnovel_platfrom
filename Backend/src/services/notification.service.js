const Notification = require('../models/notification.model');
const Library = require('../models/library.model');
const Novel = require('../models/novel.model');
const { NotFoundError, AuthorizationError } = require('../utils/errors');
const { NOTIFICATION_ERRORS, NOTIFICATION_TYPES } = require('../utils/constants');
const logger = require('../utils/logger');

// Socket service is injected at runtime to avoid a hard dependency on the websocket layer.
// This keeps notification creation usable in jobs/tests where sockets are not initialized.
let socketService = null;

const NotificationService = {
    setSocketService(service) {
        socketService = service;
    },

    async getUserNotifications(userId, query = {}) {
        return Notification.getUserNotifications(userId, query);
    },

    async getUnreadCount(userId) {
        return Notification.getUnreadCount(userId);
    },

    async markAsRead(notificationId, userId) {
        const notification = await Notification.markAsRead(notificationId, userId);
        if (!notification) {
            throw new NotFoundError(NOTIFICATION_ERRORS.NOTIFICATION_NOT_FOUND);
        }
        return notification;
    },

    async markAllAsRead(userId) {
        const result = await Notification.markAllAsRead(userId);
        return { modifiedCount: result.modifiedCount };
    },

    async deleteNotification(notificationId, userId) {
        // Ownership is enforced at query time so users cannot delete each other's notifications.
        const notification = await Notification.findOne({ _id: notificationId, user: userId });
        if (!notification) {
            throw new NotFoundError(NOTIFICATION_ERRORS.NOTIFICATION_NOT_FOUND);
        }
        await notification.deleteOne();
        return { success: true };
    },

    async createNotification(userId, type, data) {
        // Persist first so the notification is not lost if the socket emit fails.
        const notification = await Notification.createWithLimit(userId, {
            type,
            title: data.title,
            message: data.message,
            metadata: data.metadata || {}
        });

        // Best-effort real-time delivery: clients can always fetch via HTTP if offline.
        if (socketService) {
            socketService.emitToUser(userId.toString(), 'notification:new', notification);
        }

        return notification;
    },

    async notifyNewChapter(novelId, chapterData) {
        // Chapter publication can outlive the novel record (e.g., deleted novels), so log and skip.
        const novel = await Novel.findById(novelId).select('title');
        if (!novel) {
            logger.warn(`Novel ${novelId} not found for notification`);
            return;
        }

        const libraryEntries = await Library.find({ novel: novelId }).select('user');

        // Nothing to notify if nobody has the novel in their library.
        if (libraryEntries.length === 0) {
            return;
        }

        const notificationData = {
            title: `New Chapter: ${novel.title}`,
            message: `Chapter ${chapterData.chapterNumber}: ${chapterData.chapterTitle} is now available!`,
            metadata: {
                novelId: novelId,
                novelTitle: novel.title,
                chapterNumber: chapterData.chapterNumber,
                chapterTitle: chapterData.chapterTitle
            }
        };

        const notifications = await Promise.all(
            libraryEntries.map(entry =>
                this.createNotification(entry.user, NOTIFICATION_TYPES.NEW_CHAPTER, notificationData)
            )
        );

        logger.info(`Created ${notifications.length} notifications for new chapter in novel ${novelId}`);
        return notifications;
    }
};

module.exports = NotificationService;
