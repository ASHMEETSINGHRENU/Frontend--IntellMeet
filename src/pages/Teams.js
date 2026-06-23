import React, { useState, useEffect } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import { Users, Plus, MoreVertical, UserPlus, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import CreateTeamModal from '../components/Teams/CreateTeamModal';
import toast from 'react-hot-toast';

const Teams = () => {
  const { teams, loading, loadData, createTeam } = useLocalData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadData]); // Added loadData as dependency

  const handleCreateTeam = async (teamData) => {
    try {
      const newTeam = createTeam(teamData);
      toast.success('Team created successfully! 🎉');
      setIsModalOpen(false);
      return newTeam;
    } catch (error) {
      toast.error('Failed to create team. Please try again.');
      console.error('Error creating team:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Teams</h1>
          <p className="text-gray-400">Manage your teams and collaborate</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2 hover:scale-105 transform"
        >
          <Plus className="w-4 h-4" />
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <motion.div
            key={team._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{team.name}</h3>
                  <p className="text-gray-400 text-sm">{team.members?.length || 0} members</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">{team.description || 'No description'}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {team.members?.slice(0, 4).map((member, idx) => (
                  <div 
                    key={idx} 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-medium shadow-lg"
                    title={member.user?.name || 'Member'}
                  >
                    {member.user?.name?.charAt(0) || 'U'}
                  </div>
                ))}
                {team.members?.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-gray-900 flex items-center justify-center text-white text-xs">
                    +{team.members.length - 4}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                  title="Invite member"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
                <button 
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                  title="Send email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors hover:underline">
                  View
                </button>
              </div>
            </div>

            {/* Team Code Badge */}
            {team.inviteCode && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">Invite Code</span>
                  <span className="text-indigo-400 text-xs font-mono bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                    {team.inviteCode}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {teams.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">No teams yet</h3>
          <p className="text-gray-400 mb-6">Create your first team to start collaborating with your colleagues</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105 transform"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Create Your First Team
          </button>
        </motion.div>
      )}

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTeam}
      />
    </div>
  );
};

export default Teams;