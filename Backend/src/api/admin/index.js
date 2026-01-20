const express = require('express');
const router = express.Router();

const { authJWT, authorize } = require('../../middleware/authJWT');
const { ROLES } = require('../../utils/constants');

// All routes under /admin are protected and require an admin role.
router.use(authJWT);
router.use(authorize(ROLES.ADMIN));

const userRoutes = require('./user.controller');
router.use('/users', userRoutes);

const novelRoutes = require('./novel.controller');
router.use('/novels', novelRoutes);

const commentRoutes = require('./comment.controller');
router.use('/comments', commentRoutes);

module.exports = router;
