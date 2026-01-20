import api from './api';

const AdminUserService = {
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },

  blockUser: async (id, block = true) => {
    const response = await api.post(`/admin/users/${id}/block`, { block });
    return response.data;
  },

  deleteUser: async (id, hard = false) => {
    const response = await api.delete(`/admin/users/${id}`, { params: hard ? { hard: 'true' } : {} });
    return response.data;
  },

  restoreUser: async (id) => {
    const response = await api.post(`/admin/users/${id}/restore`);
    return response.data;
  }
};

export default AdminUserService;
