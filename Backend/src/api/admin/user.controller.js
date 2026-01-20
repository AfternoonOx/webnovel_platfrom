const express = require('express');
const { AdminUserService } = require('../../services/admin');
const {
    validatePagination,
    validateUserFilters,
    validateUserUpdate,
    validateUserId,
    validateBlockAction,
    validateDeleteType,
    handleValidationErrors
} = require('../../middleware/admin.validation');
const { HTTP_STATUS, API_STATUS } = require('../../utils/constants');

const router = express.Router();

// Admin-only user listing with pagination, filters, and optional inclusion of deleted users.
router.get('/',
    validatePagination,
    validateUserFilters,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const result = await AdminUserService.getUsers(req.query);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

// Admin detail view for a specific user.
router.get('/:id',
    validateUserId,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const user = await AdminUserService.getUserById(req.params.id);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
);

// Restricts updates to administrative fields (role/status). The service prevents self-modification.
router.put('/:id',
    validateUserId,
    validateUserUpdate,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const user = await AdminUserService.updateUser(
                req.params.id,
                req.user.id,
                req.body
            );
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
);

// Block/unblock is modeled as a status change; request defaults to "block" unless explicitly set to false.
router.post('/:id/block',
    validateUserId,
    validateBlockAction,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const block = req.body.block !== false;
            const user = await AdminUserService.blockUser(
                req.params.id,
                req.user.id,
                block
            );
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: user,
                message: block ? 'User blocked successfully' : 'User unblocked successfully'
            });
        } catch (error) {
            next(error);
        }
    }
);

// Supports both reversible (soft) delete and permanent (hard) delete.
router.delete('/:id',
    validateUserId,
    validateDeleteType,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const isHardDelete = req.query.hard === 'true';

            if (isHardDelete) {
                await AdminUserService.hardDeleteUser(req.params.id, req.user.id);
                res.status(HTTP_STATUS.OK).json({
                    status: API_STATUS.SUCCESS,
                    message: 'User permanently deleted'
                });
            } else {
                const user = await AdminUserService.softDeleteUser(req.params.id, req.user.id);
                res.status(HTTP_STATUS.OK).json({
                    status: API_STATUS.SUCCESS,
                    data: user,
                    message: 'User soft deleted'
                });
            }
        } catch (error) {
            next(error);
        }
    }
);

// Restore is only valid for soft-deleted users.
router.post('/:id/restore',
    validateUserId,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const user = await AdminUserService.restoreUser(req.params.id);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: user,
                message: 'User restored successfully'
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
