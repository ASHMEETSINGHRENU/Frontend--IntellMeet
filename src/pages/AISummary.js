import React, { useState, useEffect } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import { 
  Sparkles, 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  Brain, 
  Calendar, 
  Loader2,
  AlertCircle,
  Zap,
  ClipboardList,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const AISummary = () => {
  const { summaries, meetings, loading, loadData, createSummary } = useLocalData();
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const getCompletedMeetings = () => {
    return meetings.filter(m => m.status === 'completed' && !m.hasSummary);
  };

  const getMeetingTitle = (meetingId) => {
    if (!meetingId) return 'Unknown Meeting';
    const meeting = meetings.find(m => m._id === meetingId);
    return meeting ? meeting.title : 'Unknown Meeting';
  };

  const getMeetingDate = (meetingId) => {
    if (!meetingId) return 'Unknown Date';
    const meeting = meetings.find(m => m._id === meetingId);
    return meeting ? new Date(meeting.startTime).toLocaleDateString() : 'Unknown Date';
  };

  const getMeetingDuration = (meetingId) => {
    if (!meetingId) return 30;
    const meeting = meetings.find(m => m._id === meetingId);
    return meeting ? meeting.duration || 30 : 30;
  };

  // Move loadData function inside useEffect dependencies
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (summaries.length > 0 && !selectedSummary) {
      setSelectedSummary(summaries[0]);
    }
  }, [summaries, selectedSummary]);

  const handleGenerateSummary = async () => {
    if (!selectedMeetingId) {
      toast.error('Please select a meeting to generate summary');
      return;
    }

    setIsGenerating(true);
    try {
      const meeting = meetings.find(m => m._id === selectedMeetingId);
      
      // Generate a sample summary based on meeting data
      const newSummary = {
        meeting: { 
          _id: meeting._id, 
          title: meeting.title 
        },
        summary: `The team meeting "${meeting.title}" was productive with key discussions on project milestones and deliverables. 
                  Team members actively participated in the discussion and provided valuable insights. 
                  The meeting concluded with clear action items and next steps.`,
        keyPoints: [
          'Project timeline reviewed and updated',
          'Resource allocation discussed',
          'Risk mitigation strategies identified',
          'Client feedback incorporated into plan',
          'Team capacity planning completed'
        ],
        decisions: [
          'Move forward with the proposed timeline',
          'Allocate additional resources to critical tasks',
          'Schedule follow-up meeting next week',
          'Approve the budget for Q2'
        ],
        actionItems: [
          {
            task: 'Update project documentation with new timeline',
            assignedTo: { name: 'Sarah Smith', _id: 'user2' },
            priority: 'high',
            status: 'pending',
            dueDate: new Date(Date.now() + 86400000 * 2).toISOString()
          },
          {
            task: 'Prepare client presentation for next meeting',
            assignedTo: { name: 'Mike Johnson', _id: 'user3' },
            priority: 'medium',
            status: 'in_progress',
            dueDate: new Date(Date.now() + 86400000 * 3).toISOString()
          },
          {
            task: 'Review team capacity and adjust assignments',
            assignedTo: { name: 'Emily Davis', _id: 'user4' },
            priority: 'medium',
            status: 'pending',
            dueDate: new Date(Date.now() + 86400000).toISOString()
          },
          {
            task: 'Schedule follow-up meeting with stakeholders',
            assignedTo: { name: 'John Doe', _id: 'user1' },
            priority: 'low',
            status: 'completed',
            dueDate: new Date(Date.now() - 86400000).toISOString()
          }
        ],
        participants: [
          { name: 'John Doe', speakingTime: 12, engagement: 85 },
          { name: 'Sarah Smith', speakingTime: 18, engagement: 92 },
          { name: 'Mike Johnson', speakingTime: 8, engagement: 70 },
          { name: 'Emily Davis', speakingTime: 10, engagement: 78 }
        ],
        meetingDuration: getMeetingDuration(selectedMeetingId),
        generatedAt: new Date().toISOString()
      };

      const createdSummary = createSummary(newSummary);
      setSelectedSummary(createdSummary);
      setShowGenerateModal(false);
      setSelectedMeetingId('');
      toast.success('AI Summary generated successfully! 🎉');
      
      // Refresh data
      await loadData();
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border border-green-500/20';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border border-blue-500/20';
      default: return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border border-red-500/20';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20';
      default: return 'bg-green-500/20 text-green-400 border border-green-500/20';
    }
  };

  const availableMeetings = getCompletedMeetings();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            AI Meeting Summaries
          </h1>
          <p className="text-gray-400">Intelligent summaries and action items from your meetings</p>
        </div>
        <button 
          onClick={() => {
            if (availableMeetings.length === 0) {
              toast.error('No completed meetings available. Complete a meeting first!');
              return;
            }
            setShowGenerateModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2 hover:scale-105 transform"
        >
          <Brain className="w-4 h-4" />
          Generate New Summary
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{summaries.length}</p>
              <p className="text-gray-400 text-sm">Total Summaries</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {summaries.reduce((acc, s) => acc + (s.actionItems?.filter(a => a.status === 'completed').length || 0), 0)}
              </p>
              <p className="text-gray-400 text-sm">Actions Done</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {summaries.reduce((acc, s) => acc + (s.actionItems?.filter(a => a.status === 'pending').length || 0), 0)}
              </p>
              <p className="text-gray-400 text-sm">Pending Actions</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {summaries.reduce((acc, s) => acc + (s.participants?.length || 0), 0)}
              </p>
              <p className="text-gray-400 text-sm">Participants</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Recent Summaries
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {summaries.length > 0 ? (
              summaries.map((summary) => (
                <motion.div
                  key={summary._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedSummary(summary)}
                  className={`p-4 bg-white/5 backdrop-blur-xl rounded-xl border cursor-pointer transition-all ${
                    selectedSummary?._id === summary._id 
                      ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10' 
                      : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <h4 className="text-white font-medium text-sm truncate">
                    {getMeetingTitle(summary.meeting?._id)}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {summary.meetingDuration || 30}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {summary.participants?.length || 0}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {getMeetingDate(summary.meeting?._id)}
                    </span>
                  </div>
                  {summary.actionItems && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      {summary.actionItems.filter(a => a.status === 'completed').length}/{summary.actionItems.length} done
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400 bg-white/5 rounded-xl border border-white/10">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No summaries yet</p>
                <p className="text-sm">Complete a meeting to generate AI summary</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Detail */}
        <div className="lg:col-span-2">
          {selectedSummary ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {getMeetingTitle(selectedSummary.meeting?._id)}
                  </h2>
                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3" />
                    {getMeetingDate(selectedSummary.meeting?._id)}
                    <span className="text-gray-600">•</span>
                    <Clock className="w-3 h-3" />
                    {selectedSummary.meetingDuration || 30} minutes
                    <span className="text-gray-600">•</span>
                    <Users className="w-3 h-3" />
                    {selectedSummary.participants?.length || 0} participants
                  </p>
                </div>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </span>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Summary
                </h3>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedSummary.summary}</p>
                </div>
              </div>

              {/* Key Points */}
              {selectedSummary.keyPoints && selectedSummary.keyPoints.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Key Points
                  </h3>
                  <div className="space-y-2">
                    {selectedSummary.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                        <span className="text-indigo-400 font-medium text-sm">{index + 1}.</span>
                        <span className="text-gray-300 text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Decisions */}
              {selectedSummary.decisions && selectedSummary.decisions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-green-400" />
                    Decisions Made
                  </h3>
                  <div className="space-y-2">
                    {selectedSummary.decisions.map((decision, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                        <span className="text-green-400 text-sm font-bold">✓</span>
                        <span className="text-gray-300 text-sm">{decision}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Items */}
              {selectedSummary.actionItems && selectedSummary.actionItems.length > 0 && (
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    Action Items
                  </h3>
                  <div className="space-y-2">
                    {selectedSummary.actionItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{item.task}</p>
                          <p className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                            <Users className="w-3 h-3" />
                            Assigned to: {item.assignedTo?.name || 'Unassigned'}
                            {item.dueDate && (
                              <>
                                <span className="text-gray-600">•</span>
                                <Clock className="w-3 h-3" />
                                {new Date(item.dueDate).toLocaleDateString()}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-white text-lg font-medium mb-2">Select a summary</h3>
              <p className="text-gray-400">Choose a meeting from the list to view its AI summary</p>
              {summaries.length === 0 && (
                <button
                  onClick={() => {
                    if (availableMeetings.length === 0) {
                      toast.error('No completed meetings available. Complete a meeting first!');
                      return;
                    }
                    setShowGenerateModal(true);
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Brain className="w-4 h-4 inline mr-2" />
                  Generate Your First Summary
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generate Summary Modal */}
      <AnimatePresence>
        {showGenerateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Generate AI Summary
                </h2>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Select a completed meeting to generate an AI-powered summary with action items.
                </p>

                <div>
                  <label className="text-gray-400 text-sm block mb-1">
                    Select Meeting *
                  </label>
                  <select
                    value={selectedMeetingId}
                    onChange={(e) => setSelectedMeetingId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  >
                    <option value="">Choose a meeting...</option>
                    {availableMeetings.map((meeting) => (
                      <option key={meeting._id} value={meeting._id}>
                        {meeting.title} - {new Date(meeting.startTime).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                {availableMeetings.length === 0 && (
                  <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 text-sm font-medium">No meetings available</p>
                      <p className="text-gray-400 text-xs">Complete a meeting first to generate a summary</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGenerateSummary}
                  disabled={isGenerating || !selectedMeetingId}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Summary
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139,92,246,0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139,92,246,0.8);
        }
      `}</style>
    </div>
  );
};

export default AISummary;