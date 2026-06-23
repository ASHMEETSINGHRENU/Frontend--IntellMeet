import React, { useState, useEffect } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import MeetingCard from '../components/Meetings/MeetingCard';
import CreateMeetingModal from '../components/Meetings/CreateMeetingModal';
import { Plus, Video, Calendar, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Meetings = () => {
  const navigate = useNavigate();
  const { meetings, loading, createMeeting, loadData } = useLocalData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadData]); // Fixed: Added loadData as dependency

  const handleCreateMeeting = async (data) => {
    try {
      const newMeeting = createMeeting({
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        participants: data.participants || [],
      });
      toast.success('Meeting created successfully! 🎉');
      setIsModalOpen(false);
      return newMeeting;
    } catch (error) {
      toast.error('Failed to create meeting. Please try again.');
      console.error('Error creating meeting:', error);
    }
  };

  const handleJoinMeeting = (id) => {
    toast.success('Joining meeting...');
    navigate(`/meeting/${id}`);
  };

  // Get statistics
  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled' || m.status === 'ongoing');
  const completedMeetings = meetings.filter(m => m.status === 'completed');

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Meetings</h1>
          <p className="text-gray-400">Manage all your meetings in one place</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2 hover:scale-105 transform"
        >
          <Plus className="w-4 h-4" />
          Create Meeting
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{meetings.length}</p>
              <p className="text-gray-400 text-sm">Total Meetings</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{upcomingMeetings.length}</p>
              <p className="text-gray-400 text-sm">Upcoming</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{completedMeetings.length}</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <MeetingCard
              key={meeting._id}
              meeting={meeting}
              onJoin={handleJoinMeeting}
              index={index}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Video className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No meetings yet</h3>
            <p className="text-gray-400 mb-6">Create your first meeting to start collaborating</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105 transform"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create Your First Meeting
            </button>
          </motion.div>
        )}
      </div>

      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateMeeting}
      />
    </div>
  );
};

export default Meetings;