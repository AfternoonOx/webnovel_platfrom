const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const validateGetNotifications = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be between 1 and 50')
];

const validateNotificationId = [
    param('id')
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid notification ID')
];

module.exports = {
    validateGetNotifications,
    validateNotificationId
};
