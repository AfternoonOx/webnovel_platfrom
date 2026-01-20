const express = require('express');
const CommentService = require('../../services/comment.service');
const { AdminCommentService } = require('../../services/admin');
const {
    validatePagination,
    validateCommentFilters,
    validateCommentId,
    validateDeleteType,
    handleValidationErrors
} = require('../../middleware/admin.validation');
const { HTTP_STATUS, API_STATUS } = require('../../utils/constants');

const router = express.Router();

// Admin comment listing with moderation-oriented filters.
router.get('/',
    validatePagination,
    validateCommentFilters,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const result = await AdminCommentService.getComments(req.query);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

// Reuse public CommentService for the detail view, but gated behind admin auth.
router.get('/:id',
    validateCommentId,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const comment = await CommentService.getCommentById(req.params.id);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: comment
            });
        } catch (error) {
            next(error);
        }
    }
);

// Soft delete hides content while preserving record; hard delete also removes replies.
router.delete('/:id',
    validateCommentId,
    validateDeleteType,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const isHardDelete = req.query.hard === 'true';

            if (isHardDelete) {
                await AdminCommentService.hardDeleteComment(req.params.id);
                res.status(HTTP_STATUS.OK).json({
                    status: API_STATUS.SUCCESS,
                    message: 'Comment and replies permanently deleted'
                });
            } else {
                const comment = await AdminCommentService.softDeleteComment(req.params.id);
                res.status(HTTP_STATUS.OK).json({
                    status: API_STATUS.SUCCESS,
                    data: comment,
                    message: 'Comment soft deleted'
                });
            }
        } catch (error) {
            next(error);
        }
    }
);

// Restore is only meaningful for soft-deleted comments.
router.post('/:id/restore',
    validateCommentId,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const comment = await AdminCommentService.restoreComment(req.params.id);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: comment,
                message: 'Comment restored successfully'
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
