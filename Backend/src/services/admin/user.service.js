const User = require('../../models/user.model');
const { NotFoundError, ValidationError } = require('../../utils/errors');
const { ERROR_MESSAGES, STATUS, ROLES, ADMIN_ERRORS } = require('../../utils/constants');

const AdminUserService = {
    async getUsers(query = {}) {
        // Query parsing is intentionally defensive: controllers validate shape, but defaults keep UX stable.
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = {};

        if (query.status) {
            filter.status = query.status;
        }

        if (query.role) {
            filter.role = query.role;
        }

        if (query.search) {
            // Regex search trades precision for convenience in admin consoles.
            filter.$or = [
                { username: new RegExp(query.search, 'i') },
                { email: new RegExp(query.search, 'i') }
            ];
        }

        if (query.includeDeleted !== 'true') {
            // Default behavior hides deleted users unless explicitly requested.
            filter.status = filter.status || { $ne: STATUS.DELETED };
        }

        const sort = {};
        const sortBy = query.sortBy || 'createdAt';
        const order = query.order === 'asc' ? 1 : -1;
        sort[sortBy] = order;

        const [users, total] = await Promise.all([
            User.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .select('-password')
                .lean(),
            User.countDocuments(filter)
        ]);

        return {
            data: users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    },

    async getUserById(userId) {
        const user = await User.findById(userId).select('-password').lean();
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return user;
    },

    async updateUser(userId, adminId, updateData) {
        // Prevent admins from accidentally locking themselves out (role/status changes).
        if (userId === adminId) {
            throw new ValidationError(ADMIN_ERRORS.CANNOT_MODIFY_SELF);
        }

        const allowedFields = ['role', 'status'];
        const updates = {};

        // Whitelist fields so extra request properties cannot be used to mutate sensitive user data.
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                updates[field] = updateData[field];
            }
        }

        if (updates.role && !Object.values(ROLES).includes(updates.role)) {
            throw new ValidationError(ERROR_MESSAGES.INVALID_ROLE);
        }

        if (updates.status && !Object.values(STATUS).includes(updates.status)) {
            throw new ValidationError(ADMIN_ERRORS.INVALID_STATUS);
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        return user;
    },

    async blockUser(userId, adminId, block = true) {
        // Same self-protection invariant applies to blocking.
        if (userId === adminId) {
            throw new ValidationError(ADMIN_ERRORS.CANNOT_MODIFY_SELF);
        }

        const newStatus = block ? STATUS.BLOCKED : STATUS.ACTIVE;

        const user = await User.findByIdAndUpdate(
            userId,
            { status: newStatus },
            { new: true }
        ).select('-password');

        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        return user;
    },

    async softDeleteUser(userId, adminId) {
        // Soft delete is reversible and keeps the record for audit/history.
        if (userId === adminId) {
            throw new ValidationError(ADMIN_ERRORS.CANNOT_MODIFY_SELF);
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { status: STATUS.DELETED },
            { new: true }
        ).select('-password');

        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        return user;
    },

    async hardDeleteUser(userId, adminId) {
        // Hard delete permanently removes the record; use with care.
        if (userId === adminId) {
            throw new ValidationError(ADMIN_ERRORS.CANNOT_MODIFY_SELF);
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        return true;
    },

    async restoreUser(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        if (user.status !== STATUS.DELETED) {
            throw new ValidationError(ADMIN_ERRORS.USER_NOT_DELETED);
        }

        user.status = STATUS.ACTIVE;
        await user.save();

        return user;
    }
};

module.exports = AdminUserService;
