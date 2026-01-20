const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { authJWT } = require('../middleware/authJWT');
const { validateGetNotifications, validateNotificationId } = require('../middleware/notification.validation');
const NotificationService = require('../services/notification.service');
const { ValidationError } = require('../utils/errors');
const { HTTP_STATUS, API_STATUS } = require('../utils/constants');

// Centralize request validation handling so individual routes stay focused on domain logic.
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError('Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }
    next();
};

// Paginated notification feed for the currently authenticated user.
router.get('/', authJWT, validateGetNotifications, handleValidation, async (req, res, next) => {
    try {
        const result = await NotificationService.getUserNotifications(req.user.id, req.query);
        res.json({
            status: API_STATUS.SUCCESS,
            ...result
        });
    } catch (error) {
        next(error);
    }
});

// Lightweight polling endpoint for UI badges.
router.get('/unread-count', authJWT, async (req, res, next) => {
    try {
        const count = await NotificationService.getUnreadCount(req.user.id);
        res.json({
            status: API_STATUS.SUCCESS,
            data: { unreadCount: count }
        });
    } catch (error) {
        next(error);
    }
});

// Mark a single notification as read. The service enforces ownership (userId).
router.patch('/:id/read', authJWT, validateNotificationId, handleValidation, async (req, res, next) => {
    try {
        const notification = await NotificationService.markAsRead(req.params.id, req.user.id);
        res.json({
            status: API_STATUS.SUCCESS,
            data: notification
        });
    } catch (error) {
        next(error);
    }
});

// Bulk update used by “Mark all as read” UI actions.
router.post('/read-all', authJWT, async (req, res, next) => {
    try {
        const result = await NotificationService.markAllAsRead(req.user.id);
        res.json({
            status: API_STATUS.SUCCESS,
            data: result
        });
    } catch (error) {
        next(error);
    }
});

// Delete a single notification. This is scoped to the current user.
router.delete('/:id', authJWT, validateNotificationId, handleValidation, async (req, res, next) => {
    try {
        const result = await NotificationService.deleteNotification(req.params.id, req.user.id);
        res.json({
            status: API_STATUS.SUCCESS,
            data: result
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
