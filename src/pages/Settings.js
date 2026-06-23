import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Mail,
  Building2,
  Briefcase,
  Camera,
  Save,
  RefreshCw,
  Lock,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  LogOut,
  Trash2,
  Edit2,
  X,
  Loader2,
  Zap,
  Star,
  Award,
  Clock,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLocalData } from '../hooks/useLocalData';
import { userStorage } from '../services/localStorageService';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, logout } = useAuth();
  const { loadData } = useLocalData();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    companyName: '',
    role: '',
    bio: '',
    location: '',
    website: '',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        companyName: user.companyName || '',
        role: user.role || '',
        bio: user.bio || 'Product enthusiast and team player',
        location: user.location || 'San Francisco, CA',
        website: user.website || 'https://intellmeet.ai',
      });
    }
  }, [user]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Update user in localStorage
      const updatedUser = {
        ...user,
        ...profileData
      };
      userStorage.updateCurrent(updatedUser);
      
      toast.success('Profile updated successfully! 🎉');
      setEditMode(false);
      await loadData();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setSaving(true);
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully! 🔒');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion is not available in demo mode');
    setShowDeleteModal(false);
  };

  const handleToggle = (setting) => {
    toast.success(`${setting} toggled successfully`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="w-8 h-8 text-indigo-400 animate-spin-slow" />
            Settings
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => loadData()}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all flex items-center gap-2 border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full border border-indigo-500/30">
                {user?.role || 'User'}
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {user?.companyName || 'No company'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Joined {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="bg-white/5 rounded-xl px-4 py-2 text-center">
              <p className="text-xl font-bold text-white">12</p>
              <p className="text-gray-400 text-xs">Meetings</p>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-2 text-center">
              <p className="text-xl font-bold text-white">8</p>
              <p className="text-gray-400 text-xs">Tasks</p>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-2 text-center">
              <p className="text-xl font-bold text-white">3</p>
              <p className="text-gray-400 text-xs">Teams</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Settings */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-400' : ''}`} />
              <span className="flex-1 text-left">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              )}
            </motion.button>
          ))}

          {/* Danger Zone */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-white text-xl font-semibold">Profile Settings</h2>
                    <p className="text-gray-400 text-sm">Update your personal information</p>
                  </div>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-xl transition-all flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!editMode}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2 text-white placeholder-gray-500 transition-all outline-none ${
                          editMode 
                            ? 'border-indigo-500/50 focus:border-indigo-500/50 focus:shadow-lg focus:shadow-indigo-500/10' 
                            : 'border-white/10 cursor-not-allowed opacity-70'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!editMode}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2 text-white placeholder-gray-500 transition-all outline-none ${
                          editMode 
                            ? 'border-indigo-500/50 focus:border-indigo-500/50 focus:shadow-lg focus:shadow-indigo-500/10' 
                            : 'border-white/10 cursor-not-allowed opacity-70'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Company Name</label>
                      <input
                        type="text"
                        value={profileData.companyName}
                        onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                        disabled={!editMode}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2 text-white placeholder-gray-500 transition-all outline-none ${
                          editMode 
                            ? 'border-indigo-500/50 focus:border-indigo-500/50 focus:shadow-lg focus:shadow-indigo-500/10' 
                            : 'border-white/10 cursor-not-allowed opacity-70'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Role</label>
                      <input
                        type="text"
                        value={profileData.role}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        disabled={!editMode}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2 text-white placeholder-gray-500 transition-all outline-none ${
                          editMode 
                            ? 'border-indigo-500/50 focus:border-indigo-500/50 focus:shadow-lg focus:shadow-indigo-500/10' 
                            : 'border-white/10 cursor-not-allowed opacity-70'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!editMode}
                      rows={3}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-2 text-white placeholder-gray-500 transition-all outline-none resize-none ${
                        editMode 
                          ? 'border-indigo-500/50 focus:border-indigo-500/50 focus:shadow-lg focus:shadow-indigo-500/10' 
                          : 'border-white/10 cursor-not-allowed opacity-70'
                      }`}
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  {editMode && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Notification Settings</h2>
                <p className="text-gray-400 text-sm mb-6">Choose what notifications you want to receive</p>
                
                <div className="space-y-3">
                  {[
                    { id: 'email', label: 'Email Notifications', description: 'Receive email updates about your account' },
                    { id: 'meeting', label: 'Meeting Reminders', description: 'Get reminders before your meetings start' },
                    { id: 'task', label: 'Task Updates', description: 'Notifications when tasks are assigned or updated' },
                    { id: 'team', label: 'Team Invites', description: 'Get notified when you\'re added to a team' },
                    { id: 'summary', label: 'AI Summaries', description: 'Receive AI-generated meeting summaries' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div>
                        <span className="text-white font-medium">{item.label}</span>
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleToggle(item.label)}
                        className="w-12 h-6 bg-indigo-500 rounded-full relative cursor-pointer transition-all hover:scale-105"
                      >
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all shadow-lg" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Security Settings</h2>
                <p className="text-gray-400 text-sm mb-6">Manage your account security</p>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Current Password</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">New Password</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        placeholder="Enter new password"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Change Password
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 space-y-3">
                  <button className="w-full p-4 bg-white/5 rounded-xl text-left text-white hover:bg-white/10 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-indigo-400" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                  <button className="w-full p-4 bg-white/5 rounded-xl text-left text-white hover:bg-white/10 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-indigo-400" />
                      <span>Active Sessions</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Appearance</h2>
                <p className="text-gray-400 text-sm mb-6">Customize how IntellMeet looks</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <div>
                      <span className="text-white font-medium">Dark Mode</span>
                      <p className="text-gray-400 text-xs">Switch between light and dark themes</p>
                    </div>
                    <button
                      onClick={() => handleToggle('Dark Mode')}
                      className="w-12 h-6 bg-indigo-500 rounded-full relative cursor-pointer transition-all hover:scale-105"
                    >
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all shadow-lg">
                        <Moon className="w-3 h-3 text-gray-800 absolute top-1 left-1" />
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <div>
                      <span className="text-white font-medium">Compact Mode</span>
                      <p className="text-gray-400 text-xs">Reduce spacing for more content</p>
                    </div>
                    <button
                      onClick={() => handleToggle('Compact Mode')}
                      className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer transition-all hover:scale-105"
                    >
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all" />
                    </button>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Theme Color</label>
                    <div className="flex gap-3">
                      {[
                        { color: 'from-indigo-500 to-purple-500', name: 'Default' },
                        { color: 'from-blue-500 to-cyan-500', name: 'Ocean' },
                        { color: 'from-green-500 to-emerald-500', name: 'Nature' },
                        { color: 'from-red-500 to-pink-500', name: 'Sunset' },
                      ].map((theme, index) => (
                        <button
                          key={index}
                          onClick={() => handleToggle(theme.name)}
                          className={`w-10 h-10 rounded-xl bg-gradient-to-r ${theme.color} transition-all hover:scale-110 ${index === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
                        >
                          <span className="sr-only">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Preferences</h2>
                <p className="text-gray-400 text-sm mb-6">Set your language and regional preferences</p>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <label className="text-gray-400 text-sm block mb-1">Language</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors">
                      <option value="en">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <label className="text-gray-400 text-sm block mb-1">Timezone</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors">
                      <option value="utc">UTC (Coordinated Universal Time)</option>
                      <option value="est">EST (Eastern Time)</option>
                      <option value="cst">CST (Central Time)</option>
                      <option value="pst">PST (Pacific Time)</option>
                      <option value="gmt">GMT (Greenwich Mean Time)</option>
                      <option value="ist">IST (Indian Standard Time)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <label className="text-gray-400 text-sm block mb-1">Date Format</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors">
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="yyyy/mm/dd">YYYY/MM/DD</option>
                    </select>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <label className="text-gray-400 text-sm block mb-1">Week Start</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 transition-colors">
                      <option value="monday">Monday</option>
                      <option value="sunday">Sunday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-red-500/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  Delete Account
                </h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all border border-red-500/20"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;