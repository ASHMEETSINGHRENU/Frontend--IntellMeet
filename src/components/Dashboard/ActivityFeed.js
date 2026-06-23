import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Video, CheckCircle, Users } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    { icon: Video, user: 'John Doe', action: 'started a meeting', time: '2 min ago', color: 'from-indigo-500 to-purple-500' },
    { icon: CheckCircle, user: 'Sarah Smith', action: 'completed a task', time: '15 min ago', color: 'from-green-500 to-emerald-500' },
    { icon: Users, user: 'Mike Johnson', action: 'joined the team', time: '1 hour ago', color: 'from-blue-500 to-cyan-500' },
    { icon: User, user: 'Emily Davis', action: 'updated profile', time: '2 hours ago', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-400" />
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${activity.color} flex items-center justify-center shadow-lg`}>
              <activity.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">
                <span className="font-medium">{activity.user}</span>
                <span className="text-gray-400"> {activity.action}</span>
              </p>
              <span className="text-gray-500 text-xs">{activity.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;