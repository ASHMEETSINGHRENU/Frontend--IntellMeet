import api from './api';

export const summaryService = {
  // Generate summary
  generateSummary: async (meetingId, data) => {
    try {
      const response = await api.post('/summaries/generate', { meetingId, ...data });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get summary
  getSummary: async (id) => {
    try {
      const response = await api.get(`/summaries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get meeting summary
  getMeetingSummary: async (meetingId) => {
    try {
      const response = await api.get(`/summaries/meeting/${meetingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update action item
  updateActionItem: async (summaryId, itemIndex, data) => {
    try {
      const response = await api.put(`/summaries/${summaryId}/action-items/${itemIndex}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};