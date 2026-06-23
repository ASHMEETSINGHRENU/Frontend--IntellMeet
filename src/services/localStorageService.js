// Local Storage Service - Simulates database operations

const STORAGE_KEYS = {
  MEETINGS: 'intellmeet_meetings',
  TEAMS: 'intellmeet_teams',
  TASKS: 'intellmeet_tasks',
  SUMMARIES: 'intellmeet_summaries',
  USERS: 'intellmeet_users',
  CURRENT_USER: 'intellmeet_current_user',
};

// Initialize with sample data if empty
const initializeData = () => {
  // Only initialize if no data exists
  if (!localStorage.getItem(STORAGE_KEYS.MEETINGS)) {
    // Sample meetings
    const meetings = [
      {
        _id: '1',
        title: 'Product Review Meeting',
        description: 'Review Q1 product roadmap and feature prioritization',
        creator: { _id: 'user1', name: 'John Doe', email: 'john@example.com' },
        participants: [
          { user: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' }, status: 'joined' },
          { user: { _id: 'user3', name: 'Mike Johnson', email: 'mike@example.com' }, status: 'pending' },
        ],
        startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        endTime: new Date(Date.now() + 7200000).toISOString(),
        status: 'scheduled',
        duration: 60,
        meetingLink: 'meet-123456',
        meetingCode: 'ABC123',
        hasSummary: true,
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        title: 'Team Sync',
        description: 'Weekly team sync to discuss progress and blockers',
        creator: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' },
        participants: [
          { user: { _id: 'user1', name: 'John Doe', email: 'john@example.com' }, status: 'joined' },
          { user: { _id: 'user4', name: 'Emily Davis', email: 'emily@example.com' }, status: 'joined' },
        ],
        startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
        endTime: new Date(Date.now() + 9000000).toISOString(),
        status: 'scheduled',
        duration: 30,
        meetingLink: 'meet-789012',
        meetingCode: 'XYZ789',
        hasSummary: false,
        createdAt: new Date().toISOString(),
      },
      {
        _id: '3',
        title: 'Client Presentation',
        description: 'Present the new features to the client',
        creator: { _id: 'user3', name: 'Mike Johnson', email: 'mike@example.com' },
        participants: [
          { user: { _id: 'user1', name: 'John Doe', email: 'john@example.com' }, status: 'joined' },
          { user: { _id: 'user5', name: 'Client Rep', email: 'client@example.com' }, status: 'pending' },
        ],
        startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        endTime: new Date(Date.now() - 1800000).toISOString(),
        status: 'completed',
        duration: 45,
        meetingLink: 'meet-345678',
        meetingCode: 'DEF456',
        hasSummary: true,
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    const teams = [
      {
        _id: 'team1',
        name: 'Product Team',
        description: 'Building amazing products together',
        workspace: 'IntellMeet',
        owner: { _id: 'user1', name: 'John Doe', email: 'john@example.com' },
        members: [
          { user: { _id: 'user1', name: 'John Doe', email: 'john@example.com' }, role: 'admin' },
          { user: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' }, role: 'member' },
          { user: { _id: 'user3', name: 'Mike Johnson', email: 'mike@example.com' }, role: 'member' },
        ],
        inviteCode: 'TEAM123',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'team2',
        name: 'Engineering Team',
        description: 'Building the future of collaboration',
        workspace: 'IntellMeet',
        owner: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' },
        members: [
          { user: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' }, role: 'admin' },
          { user: { _id: 'user4', name: 'Emily Davis', email: 'emily@example.com' }, role: 'member' },
        ],
        inviteCode: 'TEAM456',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    const tasks = [
      {
        _id: 'task1',
        title: 'Finalize Q1 Roadmap',
        description: 'Review and finalize the Q1 product roadmap',
        assignedTo: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' },
        assignedBy: { _id: 'user1', name: 'John Doe', email: 'john@example.com' },
        priority: 'high',
        status: 'in_progress',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        labels: ['feature', 'meeting'],
        createdAt: new Date().toISOString(),
        meeting: { _id: '1', title: 'Product Review Meeting' },
      },
      {
        _id: 'task2',
        title: 'Update Documentation',
        description: 'Update API documentation with new endpoints',
        assignedTo: { _id: 'user3', name: 'Mike Johnson', email: 'mike@example.com' },
        assignedBy: { _id: 'user1', name: 'John Doe', email: 'john@example.com' },
        priority: 'medium',
        status: 'todo',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        labels: ['improvement'],
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'task3',
        title: 'Deploy to Production',
        description: 'Deploy the latest version to production',
        assignedTo: { _id: 'user4', name: 'Emily Davis', email: 'emily@example.com' },
        assignedBy: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' },
        priority: 'high',
        status: 'review',
        dueDate: new Date(Date.now() + 43200000).toISOString(),
        labels: ['bug'],
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'task4',
        title: 'Design Meeting UI',
        description: 'Create mockups for the new meeting interface',
        assignedTo: { _id: 'user1', name: 'John Doe', email: 'john@example.com' },
        assignedBy: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' },
        priority: 'medium',
        status: 'completed',
        dueDate: new Date(Date.now() - 86400000).toISOString(),
        labels: ['feature'],
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SUMMARIES)) {
    const summaries = [
      {
        _id: 'sum1',
        meeting: { _id: '1', title: 'Product Review Meeting' },
        summary: 'The team discussed the Q1 product roadmap and decided to prioritize UI improvements and performance optimization. Key decisions include redesigning the meeting interface and implementing real-time collaboration features.',
        keyPoints: [
          'UI redesign is top priority',
          'Performance optimization needed',
          'Real-time collaboration features',
          'Q2 planning starts next month',
        ],
        actionItems: [
          {
            task: 'Create UI mockups for meeting redesign',
            assignedTo: { _id: 'user2', name: 'Sarah Smith', email: 'sarah@example.com' },
            priority: 'high',
            status: 'in_progress',
            dueDate: new Date(Date.now() + 86400000).toISOString(),
          },
          {
            task: 'Research WebRTC implementation',
            assignedTo: { _id: 'user3', name: 'Mike Johnson', email: 'mike@example.com' },
            priority: 'medium',
            status: 'pending',
            dueDate: new Date(Date.now() + 172800000).toISOString(),
          },
          {
            task: 'Prepare Q2 planning document',
            assignedTo: { _id: 'user1', name: 'John Doe', email: 'john@example.com' },
            priority: 'low',
            status: 'completed',
            dueDate: new Date(Date.now() - 43200000).toISOString(),
          },
        ],
        decisions: [
          'Adopt new UI framework',
          'Implement WebRTC for video calls',
          'Use AI for meeting summaries',
        ],
        participants: [
          { name: 'John Doe', speakingTime: 12, engagement: 85 },
          { name: 'Sarah Smith', speakingTime: 15, engagement: 90 },
          { name: 'Mike Johnson', speakingTime: 8, engagement: 70 },
        ],
        meetingDuration: 45,
        generatedAt: new Date().toISOString(),
      },
      {
        _id: 'sum2',
        meeting: { _id: '3', title: 'Client Presentation' },
        summary: 'The client presentation went well. The client was impressed with the new features and requested some minor changes. The team received positive feedback on the UI design and performance improvements.',
        keyPoints: [
          'Client impressed with new features',
          'Minor changes requested',
          'Positive feedback on UI design',
        ],
        actionItems: [
          {
            task: 'Implement client feedback changes',
            assignedTo: { _id: 'user4', name: 'Emily Davis', email: 'emily@example.com' },
            priority: 'high',
            status: 'pending',
            dueDate: new Date(Date.now() + 43200000).toISOString(),
          },
        ],
        decisions: [
          'Proceed with current design direction',
          'Schedule follow-up meeting next week',
        ],
        participants: [
          { name: 'Mike Johnson', speakingTime: 20, engagement: 95 },
          { name: 'John Doe', speakingTime: 10, engagement: 80 },
          { name: 'Client Rep', speakingTime: 15, engagement: 100 },
        ],
        meetingDuration: 45,
        generatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SUMMARIES, JSON.stringify(summaries));
  }

  // Set current user if not set
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    const currentUser = {
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      companyName: 'IntellMeet Inc',
      role: 'admin',
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }
};

// Initialize data on service load
initializeData();

// Meeting CRUD operations
export const meetingStorage = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.MEETINGS);
    return data ? JSON.parse(data) : [];
  },
  
  getById: (id) => {
    const meetings = meetingStorage.getAll();
    return meetings.find(m => m._id === id) || null;
  },
  
  create: (meetingData) => {
    const meetings = meetingStorage.getAll();
    const newMeeting = {
      _id: Date.now().toString(),
      ...meetingData,
      creator: JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)),
      participants: meetingData.participants?.map(email => ({
        user: { _id: `user_${Date.now()}`, name: email, email },
        status: 'pending'
      })) || [],
      status: 'scheduled',
      meetingLink: `meet-${Date.now()}`,
      meetingCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      hasSummary: false,
      createdAt: new Date().toISOString(),
    };
    meetings.unshift(newMeeting);
    localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings));
    return newMeeting;
  },
  
  update: (id, updates) => {
    const meetings = meetingStorage.getAll();
    const index = meetings.findIndex(m => m._id === id);
    if (index !== -1) {
      meetings[index] = { ...meetings[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings));
      return meetings[index];
    }
    return null;
  },
  
  delete: (id) => {
    const meetings = meetingStorage.getAll();
    const filtered = meetings.filter(m => m._id !== id);
    localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(filtered));
    return filtered;
  },
  
  join: (id) => {
    const meeting = meetingStorage.getById(id);
    if (meeting) {
      meeting.status = 'ongoing';
      const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
      const participantExists = meeting.participants.some(p => p.user.email === currentUser.email);
      if (!participantExists) {
        meeting.participants.push({
          user: currentUser,
          status: 'joined',
          joinedAt: new Date().toISOString(),
        });
      }
      meetingStorage.update(id, { status: 'ongoing', participants: meeting.participants });
      return meeting;
    }
    return null;
  },
  
  end: (id) => {
    const meeting = meetingStorage.getById(id);
    if (meeting) {
      meeting.status = 'completed';
      meetingStorage.update(id, { status: 'completed' });
      return meeting;
    }
    return null;
  },
};

// Team CRUD operations
export const teamStorage = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return data ? JSON.parse(data) : [];
  },
  
  getById: (id) => {
    const teams = teamStorage.getAll();
    return teams.find(t => t._id === id) || null;
  },
  
  create: (teamData) => {
    const teams = teamStorage.getAll();
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    const newTeam = {
      _id: `team_${Date.now()}`,
      ...teamData,
      owner: currentUser,
      members: [{ user: currentUser, role: 'admin' }],
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    teams.push(newTeam);
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    return newTeam;
  },
  
  update: (id, updates) => {
    const teams = teamStorage.getAll();
    const index = teams.findIndex(t => t._id === id);
    if (index !== -1) {
      teams[index] = { ...teams[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
      return teams[index];
    }
    return null;
  },
  
  delete: (id) => {
    const teams = teamStorage.getAll();
    const filtered = teams.filter(t => t._id !== id);
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(filtered));
    return filtered;
  },
  
  invite: (teamId, email, role) => {
    const team = teamStorage.getById(teamId);
    if (team) {
      const newMember = {
        user: { _id: `user_${Date.now()}`, name: email.split('@')[0], email },
        role: role || 'member',
        joinedAt: new Date().toISOString(),
      };
      team.members.push(newMember);
      teamStorage.update(teamId, { members: team.members });
      return team;
    }
    return null;
  },
  
  removeMember: (teamId, userId) => {
    const team = teamStorage.getById(teamId);
    if (team) {
      team.members = team.members.filter(m => m.user._id !== userId);
      teamStorage.update(teamId, { members: team.members });
      return team;
    }
    return null;
  },
};

// Task CRUD operations
export const taskStorage = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  },
  
  getById: (id) => {
    const tasks = taskStorage.getAll();
    return tasks.find(t => t._id === id) || null;
  },
  
  create: (taskData) => {
    const tasks = taskStorage.getAll();
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    const newTask = {
      _id: `task_${Date.now()}`,
      ...taskData,
      assignedBy: currentUser,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return newTask;
  },
  
  update: (id, updates) => {
    const tasks = taskStorage.getAll();
    const index = tasks.findIndex(t => t._id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return tasks[index];
    }
    return null;
  },
  
  updateStatus: (id, status) => {
    const task = taskStorage.getById(id);
    if (task) {
      task.status = status;
      if (status === 'completed') {
        task.completedAt = new Date().toISOString();
      }
      taskStorage.update(id, { status, completedAt: task.completedAt });
      return task;
    }
    return null;
  },
  
  delete: (id) => {
    const tasks = taskStorage.getAll();
    const filtered = tasks.filter(t => t._id !== id);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filtered));
    return filtered;
  },
};

// Summary CRUD operations
export const summaryStorage = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SUMMARIES);
    return data ? JSON.parse(data) : [];
  },
  
  getById: (id) => {
    const summaries = summaryStorage.getAll();
    return summaries.find(s => s._id === id) || null;
  },
  
  getByMeetingId: (meetingId) => {
    const summaries = summaryStorage.getAll();
    return summaries.find(s => s.meeting._id === meetingId) || null;
  },
  
  create: (summaryData) => {
    const summaries = summaryStorage.getAll();
    const newSummary = {
      _id: `sum_${Date.now()}`,
      ...summaryData,
      generatedAt: new Date().toISOString(),
    };
    summaries.push(newSummary);
    localStorage.setItem(STORAGE_KEYS.SUMMARIES, JSON.stringify(summaries));
    
    // Update meeting to mark hasSummary
    const meetings = meetingStorage.getAll();
    const meetingIndex = meetings.findIndex(m => m._id === summaryData.meeting._id);
    if (meetingIndex !== -1) {
      meetings[meetingIndex].hasSummary = true;
      localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings));
    }
    
    return newSummary;
  },
  
  updateActionItem: (summaryId, itemIndex, updates) => {
    const summary = summaryStorage.getById(summaryId);
    if (summary && summary.actionItems[itemIndex]) {
      summary.actionItems[itemIndex] = { ...summary.actionItems[itemIndex], ...updates };
      summaryStorage.update(summaryId, { actionItems: summary.actionItems });
      return summary;
    }
    return null;
  },
  
  update: (id, updates) => {
    const summaries = summaryStorage.getAll();
    const index = summaries.findIndex(s => s._id === id);
    if (index !== -1) {
      summaries[index] = { ...summaries[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.SUMMARIES, JSON.stringify(summaries));
      return summaries[index];
    }
    return null;
  },
};

// User operations
export const userStorage = {
  getCurrent: () => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  
  updateCurrent: (userData) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
    return userData;
  },
};

// Analytics operations
export const analyticsStorage = {
  getStats: () => {
    const meetings = meetingStorage.getAll();
    const tasks = taskStorage.getAll();
    const teams = teamStorage.getAll();
    
    const now = new Date();
    const upcoming = meetings.filter(m => new Date(m.startTime) > now && m.status !== 'completed');
    const completed = meetings.filter(m => m.status === 'completed');
    const pendingTasks = tasks.filter(t => t.status !== 'completed');
    const completedTasks = tasks.filter(t => t.status === 'completed');
    
    return {
      totalMeetings: meetings.length,
      upcomingMeetings: upcoming.length,
      completedMeetings: completed.length,
      totalTasks: tasks.length,
      pendingTasks: pendingTasks.length,
      completedTasks: completedTasks.length,
      totalTeams: teams.length,
      totalMembers: teams.reduce((acc, team) => acc + team.members.length, 0),
      meetingCompletionRate: meetings.length > 0 ? Math.round((completed.length / meetings.length) * 100) : 0,
      taskCompletionRate: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
    };
  },
};

// Create the service object
const localStorageService = {
  meetingStorage,
  teamStorage,
  taskStorage,
  summaryStorage,
  userStorage,
  analyticsStorage,
};

// Export the service as default
export default localStorageService;