import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalData } from '../hooks/useLocalData';
import { Mic, Camera, Monitor, Phone, MessageSquare, Users, X, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const MeetingRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetings, loading, loadData, joinMeeting, endMeeting } = useLocalData();
  const [meeting, setMeeting] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participants, setParticipants] = useState([]);

  const fetchMeeting = useCallback(async () => {
    await loadData();
    const found = meetings.find(m => m._id === id);
    if (found) {
      setMeeting(found);
      setParticipants(found.participants || []);
      // Auto-join the meeting
      await joinMeeting(id);
    } else {
      navigate('/meetings');
    }
  }, [id, meetings, loadData, joinMeeting, navigate]);

  useEffect(() => {
    fetchMeeting();
  }, [fetchMeeting]);

  const handleEndCall = async () => {
    try {
      await endMeeting(id);
      navigate('/meetings');
    } catch (error) {
      console.error('Error ending meeting:', error);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading || !meeting) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-lg">{meeting.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(meeting.startTime).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {participants.length} participants
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs ${
              meeting.status === 'ongoing' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              meeting.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}>
              {meeting.status}
            </span>
            <span className="text-gray-400 text-sm">Code: {meeting.meetingCode}</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 flex items-center justify-center relative">
          <div className="relative w-full max-w-6xl aspect-video bg-black/50 rounded-2xl border border-white/10 overflow-hidden">
            {/* Main Video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <span className="text-white text-3xl font-bold">
                    {meeting.creator?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="text-white text-lg font-medium">{meeting.creator?.name}</h3>
                <p className="text-gray-400 text-sm">Organizer {isVideoOff ? '(Camera Off)' : '(Camera On)'}</p>
              </div>
            </div>

            {/* Meeting Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <p className="text-white font-medium">{meeting.title}</p>
              <p className="text-gray-400 text-xs">{participants.length} participants</p>
            </div>

            {/* Participant Grid - Small */}
            <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
              {participants.slice(0, 4).map((p, index) => (
                <div key={index} className="w-16 h-16 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {p.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              ))}
            </div>

            {/* Recording indicator */}
            <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-xs">Recording</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-black/30 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all ${
                isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-all ${
                isVideoOff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Camera className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full transition-all ${
                isScreenSharing ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-4 rounded-full transition-all ${
                isChatOpen ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              onClick={handleEndCall}
              className="p-4 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all border border-red-500/30"
            >
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="absolute right-0 top-0 h-full w-80 bg-black/80 backdrop-blur-xl border-l border-white/10 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Chat
              </h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="text-center text-gray-400 text-sm">
                <div className="bg-white/5 rounded-xl p-4">
                  <p>💬 Chat is ready</p>
                  <p className="text-xs mt-1">Start the conversation</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;