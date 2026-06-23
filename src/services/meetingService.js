import api from './api';

export const meetingService = {
  // Get all meetings
  getMeetings: async () => {
    try {
      const response = await api.get('/meetings');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single meeting
  getMeeting: async (id) => {
    try {
      const response = await api.get(`/meetings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create meeting
  createMeeting: async (meetingData) => {
    try {
      const response = await api.post('/meetings', meetingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update meeting
  updateMeeting: async (id, meetingData) => {
    try {
      const response = await api.put(`/meetings/${id}`, meetingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete meeting
  deleteMeeting: async (id) => {
    try {
      const response = await api.delete(`/meetings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Join meeting
  joinMeeting: async (id) => {
    try {
      const response = await api.post(`/meetings/${id}/join`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // End meeting
  endMeeting: async (id) => {
    try {
      const response = await api.post(`/meetings/${id}/end`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};