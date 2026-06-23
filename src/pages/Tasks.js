import React, { useState, useEffect } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import { Plus, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import CreateTaskModal from '../components/Tasks/CreateTaskModal';
import toast from 'react-hot-toast';

const Tasks = () => {
  const { tasks, teams, loading, loadData, updateTaskStatus, createTask } = useLocalData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadData]); // Added loadData as dependency

  const handleCreateTask = async (taskData) => {
    try {
      // Get all team members for assignment
      const allMembers = teams.flatMap(team => 
        team.members.map(member => ({
          _id: member.user._id,
          name: member.user.name,
          email: member.user.email,
          team: team.name
        }))
      );

      // Find assigned user
      const assignedUser = allMembers.find(m => m._id === taskData.assignedTo);
      
      const newTask = createTask({
        title: taskData.title,
        description: taskData.description,
        assignedTo: assignedUser ? {
          _id: assignedUser._id,
          name: assignedUser.name,
          email: assignedUser.email
        } : null,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        labels: taskData.labels,
        status: 'todo',
      });
      
      toast.success('Task created successfully! 🎉');
      setIsModalOpen(false);
      return newTask;
    } catch (error) {
      toast.error('Failed to create task. Please try again.');
      console.error('Error creating task:', error);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      await updateTaskStatus(taskId, newStatus);
      toast.success(`Task moved to ${newStatus.replace('_', ' ')}`);
    }
  };

  const columns = ['todo', 'in_progress', 'review', 'completed'];
  const columnLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'Review',
    completed: 'Completed'
  };
  
  const columnColors = {
    todo: 'border-blue-500/30',
    in_progress: 'border-yellow-500/30',
    review: 'border-purple-500/30',
    completed: 'border-green-500/30'
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'todo': return <XCircle className="w-4 h-4 text-blue-400" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'review': return <AlertCircle className="w-4 h-4 text-purple-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <p className="text-gray-400">Manage your tasks and track progress</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2 hover:scale-105 transform"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnTasks = tasks.filter(task => task.status === column);
          
          return (
            <motion.div
              key={column}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white/5 backdrop-blur-xl rounded-2xl p-4 border ${columnColors[column]} transition-all`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(column)}
                  <h3 className="text-white font-medium">{columnLabels[column]}</h3>
                </div>
                <span className="text-gray-400 text-sm bg-white/5 px-2 py-1 rounded-lg">
                  {columnTasks.length}
                </span>
              </div>

              <div className="space-y-3 min-h-[200px]">
                {columnTasks.map((task) => (
                  <motion.div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task._id)}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all cursor-move group"
                  >
                    <p className="text-white text-sm font-medium mb-2">{task.title}</p>
                    {task.description && (
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' :
                        'bg-green-500/20 text-green-400 border border-green-500/20'
                      }`}>
                        {task.priority}
                      </span>
                      {task.assignedTo && (
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {task.assignedTo.name}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {task.labels && task.labels.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {task.labels.map((label, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full border border-indigo-500/20">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Drag indicator */}
                    <div className="mt-2 pt-2 border-t border-white/5 flex justify-end">
                      <span className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        ↕ Drag to move
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    <div className="opacity-50">
                      <span className="block mb-2">📋</span>
                      Drop tasks here
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
        teams={teams}
        members={teams.flatMap(team => 
          team.members.map(member => ({
            _id: member.user._id,
            name: member.user.name,
            email: member.user.email,
            team: team.name
          }))
        )}
      />
    </div>
  );
};

export default Tasks;