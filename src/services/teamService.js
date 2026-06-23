import api from './api';

export const teamService = {
  // Get all teams
  getTeams: async () => {
    try {
      const response = await api.get('/teams');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single team
  getTeam: async (id) => {
    try {
      const response = await api.get(`/teams/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create team
  createTeam: async (teamData) => {
    try {
      const response = await api.post('/teams', teamData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Invite member
  inviteMember: async (teamId, email, role) => {
    try {
      const response = await api.post(`/teams/${teamId}/invite`, { email, role });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Remove member
  removeMember: async (teamId, userId) => {
    try {
      const response = await api.delete(`/teams/${teamId}/members/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete team
  deleteTeam: async (id) => {
    try {
      const response = await api.delete(`/teams/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};