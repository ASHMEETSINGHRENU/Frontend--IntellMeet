import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Building2, 
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Zap,
  Shield,
  Star
} from "lucide-react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    role: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check password strength
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(Math.min(strength, 5));
  }, [formData.password]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      x: [0, 10, -10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants2 = {
    animate: {
      y: [0, 25, 0],
      x: [0, -10, 10, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const getPasswordStrengthLabel = () => {
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    return labels[passwordStrength] || '';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];
    return colors[passwordStrength] || '';
  };

  // Calculate glow position based on mouse
  const glowStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.15) 0%, transparent 50%)`
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          variants={floatingVariants2}
          animate="animate"
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        </div>

      {/* Mouse Glow Effect */}
      <div className="absolute inset-0 pointer-events-none" style={glowStyle} />

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Glass Card */}
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-purple-500/5 hover:border-white/20 transition-all duration-500 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
          
          {/* Animated Border Gradient */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-3xl opacity-20 blur-sm animate-pulse" />
          
          {/* Logo Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-6"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30 relative"
            >
              <span className="text-white text-3xl font-bold">I</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-50 -z-10"
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              IntellMeet
            </motion.h1>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              Create your account and get started
            </p>
          </motion.div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 text-sm font-medium">Account created successfully!</p>
                <p className="text-green-400/70 text-xs">Redirecting to login...</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 text-sm font-medium">Registration Error</p>
                <p className="text-red-400/70 text-xs">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <label className="text-gray-300 text-sm font-medium block mb-1.5 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" />
                Full Name *
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'name' ? 'scale-[1.02]' : ''
              }`}>
                <User className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  focusedField === 'name' ? 'text-indigo-400' : 'text-gray-500'
                }`} />
                <input
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-gray-500 transition-all duration-300 outline-none ${
                    focusedField === 'name' 
                      ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="text-gray-300 text-sm font-medium block mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                Email Address *
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'email' ? 'scale-[1.02]' : ''
              }`}>
                <Mail className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  focusedField === 'email' ? 'text-indigo-400' : 'text-gray-500'
                }`} />
                <input
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-gray-500 transition-all duration-300 outline-none ${
                    focusedField === 'email' 
                      ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="you@example.com"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="text-gray-300 text-sm font-medium block mb-1.5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                Password *
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'password' ? 'scale-[1.02]' : ''
              }`}>
                <Lock className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  focusedField === 'password' ? 'text-indigo-400' : 'text-gray-500'
                }`} />
                <input
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-12 py-2.5 text-white placeholder-gray-500 transition-all duration-300 outline-none ${
                    focusedField === 'password' 
                      ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength ? getPasswordStrengthColor() : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs ml-2 ${
                      passwordStrength <= 1 ? 'text-red-400' :
                      passwordStrength <= 2 ? 'text-orange-400' :
                      passwordStrength <= 3 ? 'text-yellow-400' :
                      passwordStrength <= 4 ? 'text-green-400' :
                      'text-emerald-400'
                    }`}>
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Use 8+ chars with uppercase, lowercase, number & special char
                  </p>
                </div>
              )}
            </motion.div>

            {/* Company Name Field */}
            <motion.div variants={itemVariants}>
              <label className="text-gray-300 text-sm font-medium block mb-1.5 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                Company Name *
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'companyName' ? 'scale-[1.02]' : ''
              }`}>
                <Building2 className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  focusedField === 'companyName' ? 'text-indigo-400' : 'text-gray-500'
                }`} />
                <input
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-gray-500 transition-all duration-300 outline-none ${
                    focusedField === 'companyName' 
                      ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Your Company"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('companyName')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </motion.div>

            {/* Role Field */}
            <motion.div variants={itemVariants}>
              <label className="text-gray-300 text-sm font-medium block mb-1.5 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Role
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'role' ? 'scale-[1.02]' : ''
              }`}>
                <Briefcase className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  focusedField === 'role' ? 'text-indigo-400' : 'text-gray-500'
                }`} />
                <select
                  className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-gray-500 transition-all duration-300 outline-none appearance-none ${
                    focusedField === 'role' 
                      ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="" className="bg-gray-900">Select your role</option>
                  <option value="user" className="bg-gray-900">User</option>
                  <option value="team_lead" className="bg-gray-900">Team Lead</option>
                  <option value="admin" className="bg-gray-900">Admin</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="relative w-full px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div 
            variants={itemVariants}
            className="mt-5 text-center"
          >
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 inline-flex items-center gap-1 group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500"
          >
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-green-400" />
              Secure
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              Free Trial
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-purple-400" />
              AI Powered
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-center"
      >
        <p className="text-gray-500 text-xs flex items-center gap-2">
          <Zap className="w-3 h-3 text-purple-400" />
          © 2024 IntellMeet. All rights reserved.
          <Zap className="w-3 h-3 text-pink-400" />
        </p>
      </motion.div>
    </div>
  );
};

export default Register;