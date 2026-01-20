import api from './api';

const AdminNovelService = {
  getNovels: async (params = {}) => {
    const response = await api.get('/admin/novels', { params });
    return response.data;
  },

  getNovelById: async (id) => {
    const response = await api.get(`/admin/novels/${id}`);
    return response.data;
  },

  getNovelChapters: async (id, params = {}) => {
    const response = await api.get(`/admin/novels/${id}/chapters`, { params });
    return response.data;
  },

  updateNovel: async (id, data) => {
    const response = await api.put(`/admin/novels/${id}`, data);
    return response.data;
  },

  toggleFeature: async (id, featured = true) => {
    const response = await api.post(`/admin/novels/${id}/feature`, { featured });
    return response.data;
  },

  deleteNovel: async (id, hard = false) => {
    const response = await api.delete(`/admin/novels/${id}`, { params: hard ? { hard: 'true' } : {} });
    return response.data;
  },

  restoreNovel: async (id) => {
    const response = await api.post(`/admin/novels/${id}/restore`);
    return response.data;
  }
};

export default AdminNovelService;
