const Comment = require('../../models/comment.model');
const { NotFoundError } = require('../../utils/errors');
const { ERROR_MESSAGES } = require('../../utils/constants');

const AdminCommentService = {
    async getComments(query = {}) {
        // Admin listing supports broad filtering for moderation queues and audits.
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = {};

        if (query.novelId) {
            filter.novelId = query.novelId;
        }

        if (query.authorId) {
            filter.author = query.authorId;
        }

        if (query.isDeleted !== undefined) {
            filter.isDeleted = query.isDeleted === 'true';
        }

        if (query.search) {
            // Free-text moderation search uses regex for flexibility over performance.
            filter.content = new RegExp(query.search, 'i');
        }

        const sort = {};
        const sortBy = query.sortBy || 'createdAt';
        const order = query.order === 'asc' ? 1 : -1;
        sort[sortBy] = order;

        const [comments, total] = await Promise.all([
            Comment.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate('author', 'username email')
                .populate('novelId', 'title')
                .lean(),
            Comment.countDocuments(filter)
        ]);

        return {
            data: comments,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    },

    async softDeleteComment(commentId) {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new NotFoundError(ERROR_MESSAGES.COMMENT_NOT_FOUND);
        }

        comment.isDeleted = true;
        await comment.save();

        return comment;
    },

    async hardDeleteComment(commentId) {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new NotFoundError(ERROR_MESSAGES.COMMENT_NOT_FOUND);
        }

        // Replies depend on the parent; a hard delete removes the whole thread to prevent orphans.
        await Comment.deleteMany({ parentId: commentId });
        await Comment.findByIdAndDelete(commentId);

        return true;
    },

    async restoreComment(commentId) {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new NotFoundError(ERROR_MESSAGES.COMMENT_NOT_FOUND);
        }

        comment.isDeleted = false;
        await comment.save();

        return comment;
    }
};

module.exports = AdminCommentService;
