import React, { useState, useEffect } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  Users,
  Video,
  CheckCircle,
  Clock,
  Calendar,
  Activity,
  ArrowRight,
  Download,
  Filter,
  RefreshCw,
  Zap,
  PieChart as PieChartIcon,
  LineChart,
  UserPlus,
  MessageSquare,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const Analytics = () => {
  const { meetings, tasks, teams, loading, loadData, getStats } = useLocalData();
  const [stats, setStats] = useState({
    totalMeetings: 0,
    upcomingMeetings: 0,
    completedMeetings: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    totalTeams: 0,
    totalMembers: 0,
    meetingCompletionRate: 0,
    taskCompletionRate: 0,
  });
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const statsData = getStats();
    setStats(statsData);
  }, [meetings, tasks, teams, getStats]);

  // Generate sample data for charts
  const generateMeetingData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      meetings: Math.floor(Math.random() * 8) + 2,
      completed: Math.floor(Math.random() * 5) + 1,
      duration: Math.floor(Math.random() * 60) + 15,
    }));
  };

  const generateTaskData = () => {
    const statuses = ['Completed', 'In Progress', 'Review', 'To Do'];
    return statuses.map(status => ({
      name: status,
      value: Math.floor(Math.random() * 15) + 5,
    }));
  };

  const generateWeeklyData = () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    return weeks.map(week => ({
      week,
      meetings: Math.floor(Math.random() * 12) + 3,
      tasks: Math.floor(Math.random() * 20) + 5,
      teams: Math.floor(Math.random() * 3) + 1,
    }));
  };

  const generateTeamPerformance = () => {
    if (teams.length > 0) {
      return teams.map(team => ({
        name: team.name.length > 10 ? team.name.slice(0, 10) + '...' : team.name,
        meetings: Math.floor(Math.random() * 10) + 2,
        tasks: Math.floor(Math.random() * 15) + 3,
        completion: Math.floor(Math.random() * 40) + 60,
      }));
    }
    return [
      { name: 'Product', meetings: 12, tasks: 45, completion: 85 },
      { name: 'Engineering', meetings: 8, tasks: 32, completion: 78 },
      { name: 'Marketing', meetings: 6, tasks: 28, completion: 92 },
      { name: 'Design', meetings: 4, tasks: 18, completion: 70 },
    ];
  };

  const meetingData = generateMeetingData();
  const taskData = generateTaskData();
  const weeklyData = generateWeeklyData();
  const teamPerformance = generateTeamPerformance();

  const COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#60a5fa', '#f472b6'];

  const statsCards = [
    { 
      icon: Video, 
      label: 'Total Meetings', 
      value: stats.totalMeetings, 
      change: '+12%', 
      color: 'from-indigo-500 to-purple-500',
      trend: 'up',
      detail: `${stats.completedMeetings} completed`
    },
    { 
      icon: Users, 
      label: 'Team Members', 
      value: stats.totalMembers, 
      change: '+18%', 
      color: 'from-blue-500 to-cyan-500',
      trend: 'up',
      detail: `${teams.length} teams`
    },
    { 
      icon: CheckCircle, 
      label: 'Tasks Completed', 
      value: stats.completedTasks, 
      change: '+24%', 
      color: 'from-green-500 to-emerald-500',
      trend: 'up',
      detail: `${stats.pendingTasks} pending`
    },
    { 
      icon: Clock, 
      label: 'Pending Tasks', 
      value: stats.pendingTasks, 
      change: '-5%', 
      color: 'from-yellow-500 to-orange-500',
      trend: 'down',
      detail: `${stats.totalTasks} total`
    },
  ];

  const insights = [
    {
      icon: TrendingUp,
      label: 'Meeting Efficiency',
      value: '85%',
      change: '+12%',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      description: 'Meetings are 12% more efficient this month'
    },
    {
      icon: Users,
      label: 'Team Collaboration',
      value: '92%',
      change: '+8%',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      description: 'Team collaboration score increased'
    },
    {
      icon: Zap,
      label: 'Task Velocity',
      value: '78%',
      change: '+15%',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      description: 'Tasks completed 15% faster'
    },
    {
      icon: Star,
      label: 'Satisfaction Score',
      value: '4.8',
      change: '+0.3',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      description: 'Meeting satisfaction rating'
    },
  ];

  const handleExport = () => {
    toast.success('Report exported successfully! 📊');
  };

  const handleRefresh = () => {
    toast.success('Data refreshed! 🔄');
    loadData();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your meeting performance and team productivity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/10">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button 
            onClick={handleRefresh}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`${insight.bg} rounded-xl p-4 border border-white/5`}
            >
              <div className="flex items-center justify-between mb-2">
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
                <span className={`text-xs font-medium ${insight.color}`}>
                  {insight.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{insight.value}</p>
              <p className="text-gray-400 text-sm">{insight.label}</p>
              <p className="text-gray-500 text-xs mt-1">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <BarChartIcon className="w-5 h-5 text-indigo-400" />
              Meeting Activity
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Meetings
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Completed
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={meetingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="meetings" fill="#818cf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Task Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-pink-400" />
              Task Distribution
            </h3>
            <span className="text-gray-400 text-xs">By Status</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-400" />
              Weekly Performance Trends
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                Meetings
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Tasks
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Teams
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="meetings" stroke="#818cf8" fill="#818cf8" fillOpacity={0.2} />
              <Area type="monotone" dataKey="tasks" stroke="#34d399" fill="#34d399" fillOpacity={0.2} />
              <Area type="monotone" dataKey="teams" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Team Performance
            </h3>
            <span className="text-gray-400 text-xs">Completion Rate</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1a1a2e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar yAxisId="left" dataKey="meetings" fill="#818cf8" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="tasks" fill="#34d399" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="completion" stroke="#f472b6" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Recent Activity Timeline
          </h3>
          <div className="space-y-3">
            {[
              { 
                icon: Video, 
                text: 'Meeting completed: Product Review with 8 participants', 
                time: '2 hours ago', 
                color: 'from-indigo-500 to-purple-500',
                detail: '45 min duration'
              },
              { 
                icon: CheckCircle, 
                text: 'Task completed: Update Documentation by Sarah', 
                time: '4 hours ago', 
                color: 'from-green-500 to-emerald-500',
                detail: 'Priority: High'
              },
              { 
                icon: UserPlus, 
                text: 'New member joined: Engineering Team', 
                time: '1 day ago', 
                color: 'from-blue-500 to-cyan-500',
                detail: 'Role: Senior Developer'
              },
              { 
                icon: Calendar, 
                text: 'Meeting scheduled: Client Presentation', 
                time: '2 days ago', 
                color: 'from-purple-500 to-pink-500',
                detail: 'Tomorrow at 10:00 AM'
              },
              { 
                icon: MessageSquare, 
                text: 'New comment on: Q1 Planning', 
                time: '3 days ago', 
                color: 'from-yellow-500 to-orange-500',
                detail: 'From Mike Johnson'
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{activity.text}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{activity.detail}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;