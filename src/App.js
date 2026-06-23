import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // Your main dashboard page
import Dashboard from './pages/Dashboard';
import Meetings from './pages/Meetings';
import Teams from './pages/Teams';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import AISummary from './pages/AISummary';
import Settings from './pages/Settings';
import MeetingRoom from './pages/MeetingRoom';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Protected Route Component - Only accessible when authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }
  
  return children;
};

// Public Route Component - Only accessible when NOT authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (isAuthenticated) {
    // Redirect to home if already authenticated
    return <Navigate to="/home" />;
  }
  
  return children;
};

// App Routes
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes - Only accessible when NOT logged in */}
      <Route path="/" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected Routes - Only accessible when logged in */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/meetings" element={
        <ProtectedRoute>
          <Layout>
            <Meetings />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/meeting/:id" element={
        <ProtectedRoute>
          <MeetingRoom />
        </ProtectedRoute>
      } />
      
      <Route path="/teams" element={
        <ProtectedRoute>
          <Layout>
            <Teams />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/tasks" element={
        <ProtectedRoute>
          <Layout>
            <Tasks />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/analytics" element={
        <ProtectedRoute>
          <Layout>
            <Analytics />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/ai-summary" element={
        <ProtectedRoute>
          <Layout>
            <AISummary />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Default route - redirect based on auth status */}
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
      } />
      
      {/* Catch all - redirect to home or login */}
      <Route path="*" element={
        <Navigate to={isAuthenticated ? "/home" : "/login"} />
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
            success: {
              icon: '✅',
            },
            error: {
              icon: '❌',
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;