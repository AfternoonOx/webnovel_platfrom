const { body, query, param } = require('express-validator');
const { validationResult } = require('express-validator');
const { ROLES, STATUS, HTTP_STATUS, API_STATUS, NOVEL_STATUS, CONTENT_STATUS } = require('../utils/constants');

const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    query('sortBy')
        .optional()
        .isIn(['createdAt', 'username', 'email', 'lastLogin', 'status', 'role', 'title', 'viewCount', 'totalChapters'])
        .withMessage('Invalid sort field'),
    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be asc or desc')
];

const validateUserFilters = [
    query('status')
        .optional()
        .isIn(Object.values(STATUS))
        .withMessage('Invalid status filter'),
    query('role')
        .optional()
        .isIn(Object.values(ROLES))
        .withMessage('Invalid role filter'),
    query('search')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search term must be between 1 and 100 characters'),
    query('includeDeleted')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('includeDeleted must be true or false')
];

const validateUserUpdate = [
    body('role')
        .optional()
        .isIn(Object.values(ROLES))
        .withMessage('Invalid role'),
    body('status')
        .optional()
        .isIn(Object.values(STATUS))
        .withMessage('Invalid status')
];

const validateUserId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID format')
];

const validateBlockAction = [
    body('block')
        .optional()
        .isBoolean()
        .withMessage('Block must be a boolean value')
];

const validateDeleteType = [
    query('hard')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('hard must be true or false')
];

const validateNovelFilters = [
    query('status')
        .optional()
        .isIn(Object.values(NOVEL_STATUS))
        .withMessage('Invalid novel status filter'),
    query('authorId')
        .optional()
        .isMongoId()
        .withMessage('Invalid author ID format'),
    query('isFeatured')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('isFeatured must be true or false'),
    query('search')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search term must be between 1 and 100 characters')
];

const validateNovelId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid novel ID format')
];

const validateNovelUpdate = [
    body('title')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters'),
    body('description')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be between 1 and 1000 characters'),
    body('status')
        .optional()
        .isIn(Object.values(NOVEL_STATUS))
        .withMessage('Invalid novel status'),
    body('genres')
        .optional()
        .isArray()
        .withMessage('Genres must be an array'),
    body('genres.*')
        .optional()
        .isString()
        .isLength({ max: 20 })
        .withMessage('Each genre must be a string with max 20 characters'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    body('tags.*')
        .optional()
        .isString()
        .isLength({ max: 20 })
        .withMessage('Each tag must be a string with max 20 characters'),
    body('isFeatured')
        .optional()
        .isBoolean()
        .withMessage('isFeatured must be a boolean')
];

const validateFeatureAction = [
    body('featured')
        .optional()
        .isBoolean()
        .withMessage('Featured must be a boolean value')
];

const validateChapterFilters = [
    query('status')
        .optional()
        .isIn(Object.values(CONTENT_STATUS))
        .withMessage('Invalid chapter status filter')
];

const validateCommentFilters = [
    query('novelId')
        .optional()
        .isMongoId()
        .withMessage('Invalid novel ID format'),
    query('authorId')
        .optional()
        .isMongoId()
        .withMessage('Invalid author ID format'),
    query('isDeleted')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('isDeleted must be true or false'),
    query('search')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search term must be between 1 and 100 characters')
];

const validateCommentId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid comment ID format')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: API_STATUS.FAIL,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = {
    validatePagination,
    validateUserFilters,
    validateUserUpdate,
    validateUserId,
    validateBlockAction,
    validateDeleteType,
    validateNovelFilters,
    validateNovelId,
    validateNovelUpdate,
    validateFeatureAction,
    validateChapterFilters,
    validateCommentFilters,
    validateCommentId,
    handleValidationErrors
};

