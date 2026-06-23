import { useState, useEffect, useCallback } from 'react';
import {
  meetingStorage,
  teamStorage,
  taskStorage,
  summaryStorage,
  analyticsStorage,
} from '../services/localStorageService';

export const useLocalData = () => {
  const [meetings, setMeetings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all data
  const loadData = useCallback(() => {
    setMeetings(meetingStorage.getAll());
    setTeams(teamStorage.getAll());
    setTasks(taskStorage.getAll());
    setSummaries(summaryStorage.getAll());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Meeting operations
  const createMeeting = useCallback((data) => {
    const newMeeting = meetingStorage.create(data);
    setMeetings(prev => [newMeeting, ...prev]);
    return newMeeting;
  }, []);

  const updateMeeting = useCallback((id, data) => {
    const updated = meetingStorage.update(id, data);
    if (updated) {
      setMeetings(prev => prev.map(m => m._id === id ? updated : m));
    }
    return updated;
  }, []);

  const deleteMeeting = useCallback((id) => {
    meetingStorage.delete(id);
    setMeetings(prev => prev.filter(m => m._id !== id));
  }, []);

  const joinMeeting = useCallback((id) => {
    const meeting = meetingStorage.join(id);
    if (meeting) {
      setMeetings(prev => prev.map(m => m._id === id ? meeting : m));
    }
    return meeting;
  }, []);

  const endMeeting = useCallback((id) => {
    const meeting = meetingStorage.end(id);
    if (meeting) {
      setMeetings(prev => prev.map(m => m._id === id ? meeting : m));
    }
    return meeting;
  }, []);

  // Team operations
  const createTeam = useCallback((data) => {
    const newTeam = teamStorage.create(data);
    setTeams(prev => [...prev, newTeam]);
    return newTeam;
  }, []);

  const updateTeam = useCallback((id, data) => {
    const updated = teamStorage.update(id, data);
    if (updated) {
      setTeams(prev => prev.map(t => t._id === id ? updated : t));
    }
    return updated;
  }, []);

  const deleteTeam = useCallback((id) => {
    teamStorage.delete(id);
    setTeams(prev => prev.filter(t => t._id !== id));
  }, []);

  const inviteMember = useCallback((teamId, email, role) => {
    const team = teamStorage.invite(teamId, email, role);
    if (team) {
      setTeams(prev => prev.map(t => t._id === teamId ? team : t));
    }
    return team;
  }, []);

  // Task operations
  const createTask = useCallback((data) => {
    const newTask = taskStorage.create(data);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id, data) => {
    const updated = taskStorage.update(id, data);
    if (updated) {
      setTasks(prev => prev.map(t => t._id === id ? updated : t));
    }
    return updated;
  }, []);

  const updateTaskStatus = useCallback((id, status) => {
    const updated = taskStorage.updateStatus(id, status);
    if (updated) {
      setTasks(prev => prev.map(t => t._id === id ? updated : t));
    }
    return updated;
  }, []);

  const deleteTask = useCallback((id) => {
    taskStorage.delete(id);
    setTasks(prev => prev.filter(t => t._id !== id));
  }, []);

  // Summary operations
  const createSummary = useCallback((data) => {
    const newSummary = summaryStorage.create(data);
    setSummaries(prev => [...prev, newSummary]);
    return newSummary;
  }, []);

  const updateSummary = useCallback((id, data) => {
    const updated = summaryStorage.update(id, data);
    if (updated) {
      setSummaries(prev => prev.map(s => s._id === id ? updated : s));
    }
    return updated;
  }, []);

  // Analytics
  const getStats = useCallback(() => {
    return analyticsStorage.getStats();
  }, []);

  return {
    // Data
    meetings,
    teams,
    tasks,
    summaries,
    loading,
    loadData,
    
    // Meeting methods
    createMeeting,
    updateMeeting,
    deleteMeeting,
    joinMeeting,
    endMeeting,
    
    // Team methods
    createTeam,
    updateTeam,
    deleteTeam,
    inviteMember,
    
    // Task methods
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    
    // Summary methods
    createSummary,
    updateSummary,
    
    // Analytics
    getStats,
  };
};