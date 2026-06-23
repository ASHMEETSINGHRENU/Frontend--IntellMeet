import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Sparkles, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  Menu,
  X,
  LayoutDashboard,
  CheckSquare,
  Settings,
  Bell,
  LogOut,
  Search,
  Plus,
  ChevronRight,
  BarChart,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://backend-intellmeet.onrender.com/api/auth/profile', {
          headers: { Authorization: token }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <DashboardContent user={user} handleLogout={handleLogout} />;
  }

  return null;
};

// Dashboard Component (for authenticated users)
const DashboardContent = ({ user, handleLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Video, label: 'Meetings', id: 'meetings' },
    { icon: Users, label: 'Teams', id: 'teams' },
    { icon: CheckSquare, label: 'Tasks', id: 'tasks' },
    { icon: BarChart, label: 'Analytics', id: 'analytics' },
    { icon: Sparkles, label: 'AI Summary', id: 'ai' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  // Stats data
  const stats = [
    { icon: Calendar, label: 'Upcoming Meetings', value: '3', color: 'from-blue-500 to-cyan-500' },
    { icon: CheckCircle, label: 'Completed Today', value: '2', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Pending Tasks', value: '5', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, label: 'Team Members', value: '12', color: 'from-purple-500 to-pink-500' },
  ];

  // Meeting data
  const upcomingMeetings = [
    { title: 'Product Review', time: '10:00 AM', participants: 8, color: 'from-indigo-500 to-purple-500' },
    { title: 'Team Sync', time: '2:30 PM', participants: 5, color: 'from-blue-500 to-cyan-500' },
    { title: 'Client Meeting', time: '4:00 PM', participants: 3, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -280 }}
          animate={{ x: isSidebarOpen ? 0 : -280 }}
          transition={{ duration: 0.3 }}
          className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-black/30 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col fixed md:relative h-full z-50`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              {isSidebarOpen && (
                <span className="text-white text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  IntellMeet
                </span>
              )}
            </div>
            {isMobile && isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                {isSidebarOpen && activeTab === item.id && (
                  <div className="ml-auto w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                )}
              </motion.button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <header className="sticky top-0 bg-black/20 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between z-40">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-white text-xl font-semibold">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input 
                  type="text"
                  placeholder="Search..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 transition-colors w-48 lg:w-64"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:scale-105 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Meeting</span>
              </button>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-4 md:p-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="text-gray-400">
                Here's what's happening with your meetings today.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Meetings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    Upcoming Meetings
                  </h3>
                  <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${meeting.color} flex items-center justify-center shadow-lg`}>
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{meeting.title}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {meeting.time}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {meeting.participants} participants
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm">
                        Join
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Summary Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">AI Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-gray-300 text-sm font-medium">Latest Meeting: Product Review</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Generated 2 hours ago
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-gray-300 text-sm font-medium mb-2">3 Action Items Created</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/20">High Priority</span>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/20">Medium</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/20">Low</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105">
                    View Full Summary
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Video, label: 'Start Meeting', color: 'from-indigo-500 to-purple-500' },
                { icon: Users, label: 'Create Team', color: 'from-blue-500 to-cyan-500' },
                { icon: CheckSquare, label: 'New Task', color: 'from-green-500 to-emerald-500' },
                { icon: Sparkles, label: 'AI Assistant', color: 'from-purple-500 to-pink-500' },
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${action.color} p-4 rounded-xl text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-2`}
                >
                  <action.icon className="w-6 h-6" />
                  {action.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;