const express = require('express');
const NovelService = require('../../services/novel.service');
const ChapterService = require('../../services/chapter.service');
const { AdminNovelService } = require('../../services/admin');
const {
    validatePagination,
    validateNovelFilters,
    validateNovelUpdate,
    validateNovelId,
    validateFeatureAction,
    validateDeleteType,
    handleValidationErrors
} = require('../../middleware/admin.validation');
const { HTTP_STATUS, API_STATUS } = require('../../utils/constants');

const router = express.Router();

// Admin listing uses the public NovelService query API but is protected by /admin middleware.
router.get('/',
    validatePagination,
    validateNovelFilters,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const result = await NovelService.getNovels({ ...req.query, includeDeleted: true });
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

// Restore is only meaningful for soft-deleted novels.
router.post('/:id/restore',
    validateNovelId,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const novel = await AdminNovelService.restoreNovel(req.params.id);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: novel,
                message: 'Novel restored successfully'
            });
        } catch (error) {
            next(error);
        }
    }
);

// Admin detail view for a novel.
router.get('/:id',
    validateNovelId,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const novel = await NovelService.getNovelById(req.params.id, false, req.user);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: novel
            });
        } catch (error) {
            next(error);
        }
    }
);

// Chapter listing is exposed for moderation/auditing.
router.get('/:id/chapters',
    validateNovelId,
    validatePagination,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const result = await ChapterService.getChaptersByNovelId(req.params.id, req.query);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

// Update combines two concerns:
// - Feature/unfeature is delegated to AdminNovelService (keeps ES in sync)
// - Other novel fields use NovelService's standard update logic
router.put('/:id',
    validateNovelId,
    validateNovelUpdate,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const { isFeatured, ...updateData } = req.body;

            if (isFeatured !== undefined) {
                await AdminNovelService.toggleFeature(req.params.id, isFeatured);
            }

            let novel;
            if (Object.keys(updateData).length > 0) {
                novel = await NovelService.updateNovel(req.params.id, updateData);
            } else {
                // If only isFeatured changed, return the latest novel state without re-updating.
                novel = await NovelService.getNovelById(req.params.id, false, req.user);
            }

            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: novel
            });
        } catch (error) {
            next(error);
        }
    }
);

// Dedicated endpoint for moderation UIs that only toggle featured state.
router.post('/:id/feature',
    validateNovelId,
    validateFeatureAction,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const featured = req.body.featured !== false;
            const novel = await AdminNovelService.toggleFeature(req.params.id, featured);
            res.status(HTTP_STATUS.OK).json({
                status: API_STATUS.SUCCESS,
                data: novel,
                message: featured ? 'Novel featured successfully' : 'Novel unfeatured successfully'
            });
        } catch (error) {
            next(error);
        }
    }
);

// Soft delete hides the novel; hard delete permanently removes novel + chapters.
router.delete('/:id',
    validateNovelId,
    validateDeleteType,
    handleValidationErrors,
    async (req, res, next) => {
        try {
            const isHardDelete = req.query.hard === 'true';

            if (isHardDelete) {
                await AdminNovelService.hardDeleteNovel(req.params.id);
                res.status(HTTP_STATUS.OK).json({
                    status: API_STATUS.SUCCESS,
                    message: 'Novel and all chapters permanently deleted'
                });
            } else {
                const novel = await AdminNovelService.softDeleteNovel(req.params.id);
                res.status(HTTP_STATUS.OK).json({
                    status: API_STATUS.SUCCESS,
                    data: novel,
                    message: 'Novel soft deleted'
                });
            }
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
