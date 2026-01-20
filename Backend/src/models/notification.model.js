const mongoose = require('mongoose');
const { NOTIFICATION_TYPES } = require('../utils/constants');

const NOTIFICATION_LIMIT = 50;

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: Object.values(NOTIFICATION_TYPES),
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    message: {
        type: String,
        required: true,
        maxlength: 500
    },
    isRead: {
        type: Boolean,
        default: false,
        index: true
    },
    metadata: {
        novelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Novel'
        },
        novelTitle: String,
        chapterNumber: Number,
        chapterTitle: String
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

notificationSchema.index({ user: 1, createdAt: -1 });

notificationSchema.statics = {
    async createWithLimit(userId, notificationData) {
        const count = await this.countDocuments({ user: userId });

        if (count >= NOTIFICATION_LIMIT) {
            const excess = count - NOTIFICATION_LIMIT + 1;
            const oldestNotifications = await this.find({ user: userId })
                .sort({ createdAt: 1 })
                .limit(excess)
                .select('_id');

            await this.deleteMany({
                _id: { $in: oldestNotifications.map(n => n._id) }
            });
        }

        return this.create({
            user: userId,
            ...notificationData
        });
    },

    async getUserNotifications(userId, query = {}) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;

        const [notifications, totalCount, unreadCount] = await Promise.all([
            this.find({ user: userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.countDocuments({ user: userId }),
            this.countDocuments({ user: userId, isRead: false })
        ]);

        return {
            data: notifications,
            unreadCount,
            pagination: {
                page,
                limit,
                total: totalCount,
                pages: Math.ceil(totalCount / limit)
            }
        };
    },

    async getUnreadCount(userId) {
        return this.countDocuments({ user: userId, isRead: false });
    },

    async markAsRead(notificationId, userId) {
        return this.findOneAndUpdate(
            { _id: notificationId, user: userId },
            { isRead: true },
            { new: true }
        );
    },

    async markAllAsRead(userId) {
        return this.updateMany(
            { user: userId, isRead: false },
            { isRead: true }
        );
    }
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
