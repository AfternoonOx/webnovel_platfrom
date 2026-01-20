import api from './api';

const AdminCommentService = {
  getComments: async (params = {}) => {
    const response = await api.get('/admin/comments', { params });
    return response.data;
  },

  getCommentById: async (id) => {
    const response = await api.get(`/admin/comments/${id}`);
    return response.data;
  },

  deleteComment: async (id, hard = false) => {
    const response = await api.delete(`/admin/comments/${id}`, { params: hard ? { hard: 'true' } : {} });
    return response.data;
  },

  restoreComment: async (id) => {
    const response = await api.post(`/admin/comments/${id}/restore`);
    return response.data;
  }
};

export default AdminCommentService;
