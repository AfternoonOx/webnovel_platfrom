const Novel = require('../../models/novel.model');
const Chapter = require('../../models/chapter.model');
const elasticsearchService = require('../elasticsearch.service');
const { NotFoundError } = require('../../utils/errors');
const { ERROR_MESSAGES, NOVEL_STATUS } = require('../../utils/constants');

const AdminNovelService = {
    async softDeleteNovel(novelId) {
        // Soft delete keeps the novel (and chapters) in MongoDB, but hides it from normal discovery.
        const novel = await Novel.findById(novelId);
        if (!novel) {
            throw new NotFoundError(ERROR_MESSAGES.NOVEL_NOT_FOUND);
        }

        novel.status = NOVEL_STATUS.DELETED;
        await novel.save();

        const esNovel = novel.toObject();
        // Avoid pushing large/binary fields into Elasticsearch.
        delete esNovel.cover;
        await elasticsearchService.updateNovel(novelId, esNovel);

        return novel;
    },

    async restoreNovel(novelId) {
        const novel = await Novel.findById(novelId);
        if (!novel) {
            throw new NotFoundError(ERROR_MESSAGES.NOVEL_NOT_FOUND);
        }

        novel.status = NOVEL_STATUS.ONGOING;
        await novel.save();

        const esNovel = novel.toObject();
        // Avoid pushing large/binary fields into Elasticsearch.
        delete esNovel.cover;
        await elasticsearchService.updateNovel(novelId, esNovel);

        return novel;
    },

    async hardDeleteNovel(novelId) {
        // Hard delete removes both the novel and its dependent chapters, and cleans up the search index.
        const novel = await Novel.findById(novelId);
        if (!novel) {
            throw new NotFoundError(ERROR_MESSAGES.NOVEL_NOT_FOUND);
        }

        await Chapter.deleteMany({ novelId: novelId });
        await Novel.findByIdAndDelete(novelId);
        await elasticsearchService.deleteNovel(novelId);

        return true;
    },

    async toggleFeature(novelId, featured) {
        // Feature state impacts discovery; keep MongoDB and Elasticsearch consistent.
        const novel = await Novel.findByIdAndUpdate(
            novelId,
            { isFeatured: featured },
            { new: true }
        ).populate('author', 'username email');

        if (!novel) {
            throw new NotFoundError(ERROR_MESSAGES.NOVEL_NOT_FOUND);
        }

        const esNovel = novel.toObject();
        // Avoid pushing large/binary fields into Elasticsearch.
        delete esNovel.cover;
        await elasticsearchService.updateNovel(novelId, esNovel);

        return novel;
    }
};

module.exports = AdminNovelService;
