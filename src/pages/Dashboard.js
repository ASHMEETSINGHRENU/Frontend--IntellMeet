import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocalData } from '../hooks/useLocalData';
import { Calendar, CheckCircle, Clock, Users, Video, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '../components/Dashboard/StatsCard';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import MeetingCard from '../components/Meetings/MeetingCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { meetings, tasks, teams, loading, getStats } = useLocalData();
  const [stats, setStats] = useState({
    upcoming: 0,
    completed: 0,
    pending: 0,
    team: 0,
  });



  useEffect(() => {
    const statsData = getStats();
    setStats({
      upcoming: statsData.upcomingMeetings || 0,
      completed: statsData.completedMeetings || 0,
      pending: statsData.pendingTasks || 0,
      team: statsData.totalMembers || 0,
    });
  }, [meetings, tasks, teams, getStats]); // Fixed: Added getStats as dependency

  const handleJoinMeeting = (meetingId) => {
    navigate(`/meeting/${meetingId}`);
  };

  // Get only upcoming meetings for display
  const upcomingMeetings = meetings
    .filter(m => m.status === 'scheduled' || m.status === 'ongoing')
    .slice(0, 3);

  const statsData = [
    { icon: Calendar, label: 'Upcoming Meetings', value: stats.upcoming, color: 'from-blue-500 to-cyan-500' },
    { icon: CheckCircle, label: 'Completed Meetings', value: stats.completed, color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Pending Tasks', value: stats.pending, color: 'from-yellow-500 to-orange-500' },
    { icon: Users, label: 'Team Members', value: stats.team, color: 'from-purple-500 to-pink-500' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || 'User'}! 👋
        </h2>
        <p className="text-gray-400">
          Here's what's happening with your meetings today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meetings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-400" />
              Upcoming Meetings
            </h3>
            <button 
              onClick={() => navigate('/meetings')}
              className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, index) => (
                <MeetingCard
                  key={meeting._id}
                  meeting={meeting}
                  onJoin={handleJoinMeeting}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming meetings</p>
                <p className="text-sm">Create your first meeting to get started</p>
                <button
                  onClick={() => navigate('/meetings')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Create Meeting
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ActivityFeed />
        </motion.div>
      </div>

      {/* Quick Actions & AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* AI Summary Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Meeting Assistant</h3>
              <p className="text-gray-400 text-sm">Get intelligent summaries from your meetings</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/ai-summary')}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105"
          >
            View AI Summaries
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Quick Stats</h3>
              <p className="text-gray-400 text-sm">At a glance overview</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{meetings.length}</p>
              <p className="text-gray-400 text-sm">Total Meetings</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{tasks.length}</p>
              <p className="text-gray-400 text-sm">Total Tasks</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{teams.length}</p>
              <p className="text-gray-400 text-sm">Teams</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-gray-400 text-sm">Tasks Done</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;