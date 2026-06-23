import React from 'react';
import { motion } from 'framer-motion';
import { Video, Users, Clock, ChevronRight } from 'lucide-react';

const MeetingCard = ({ meeting, onJoin, index }) => {
  const colors = [
    'from-indigo-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
  ];

  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}>
          <Video className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-medium">{meeting.title}</p>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(meeting.startTime).toLocaleTimeString()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {meeting.participants?.length || 0} participants
            </span>
            <span>•</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              meeting.status === 'ongoing' ? 'bg-green-500/20 text-green-400' :
              meeting.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {meeting.status}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onJoin(meeting._id)}
        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm flex items-center gap-1"
      >
        Join
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default MeetingCard;