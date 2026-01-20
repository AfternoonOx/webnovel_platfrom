const AdminUserService = require('./user.service');
const AdminNovelService = require('./novel.service');
const AdminCommentService = require('./comment.service');

// Single import surface for admin services to keep controllers decoupled from file layout.
module.exports = {
    AdminUserService,
    AdminNovelService,
    AdminCommentService
};
