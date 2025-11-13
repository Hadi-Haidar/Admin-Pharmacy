// src/pages/Login.jsx

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  Eye,
  EyeOff,
  CheckCircle2,
  Pill,
  Activity,
  Heart
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1800);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-6">
      {/* Animated Background Elements - Pharmacy Theme */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-teal-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating Pills/Medicine Icons */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`pill-${i}`}
            className="absolute opacity-10"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Pill className={`w-${4 + Math.floor(Math.random() * 4)} h-${4 + Math.floor(Math.random() * 4)} text-teal-600 transform rotate-${Math.floor(Math.random() * 360)}`} />
          </div>
        ))}

        {/* Medical Cross Patterns */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`cross-${i}`}
            className="absolute text-teal-500 opacity-5"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              fontSize: `${20 + Math.random() * 30}px`,
              animation: `pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Activity className="w-8 h-8" />
          </div>
        ))}
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-emerald-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-10 text-center transform animate-scaleIn shadow-2xl">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto relative animate-checkmark" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-2">Welcome Admin!</h3>
            <p className="text-gray-600 text-lg">Taking you to your dashboard...</p>
            <div className="mt-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 transform ${
        mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
      }`}>
        {/* Pharmacy Logo Badge - Exact International Design */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-50 animate-pulse"></div>
            
            {/* Green Cross with White Bowl of Hygieia - Exact Match */}
            <div className="relative inline-flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <svg className="w-36 h-36 drop-shadow-2xl" viewBox="0 0 140 140" fill="none">
                {/* Green Cross Background */}
                <g>
                  {/* Horizontal bar of cross */}
                  <rect x="25" y="56" width="90" height="28" fill="#16a34a" rx="4">
                    <animate attributeName="fill" values="#16a34a;#059669;#16a34a" dur="3s" repeatCount="indefinite" />
                  </rect>
                  {/* Vertical bar of cross */}
                  <rect x="56" y="25" width="28" height="90" fill="#16a34a" rx="4">
                    <animate attributeName="fill" values="#16a34a;#059669;#16a34a" dur="3s" repeatCount="indefinite" />
                  </rect>
                </g>
                
                {/* White Bowl of Hygieia Symbol */}
                <g transform="translate(70, 70)">
                  {/* Bowl/Cup Base */}
                  <ellipse cx="0" cy="12" rx="16" ry="4" fill="white" opacity="0.95"/>
                  {/* Bowl Body */}
                  <path d="M -14 2 Q -15 9 -14 12 L 14 12 Q 15 9 14 2 Z" fill="white" stroke="white" strokeWidth="1"/>
                  {/* Bowl Rim */}
                  <ellipse cx="0" cy="2" rx="16" ry="4.5" fill="white"/>
                  
                  {/* Central Staff/Rod */}
                  <rect x="-1.5" y="-20" width="3" height="24" fill="white" rx="1.5"/>
                  
                  {/* Snake Coiled Around Staff */}
                  <g stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {/* Bottom coil - left side */}
                    <path d="M -12 10 Q -14 6 -12 2 Q -10 -1 -6 -2"/>
                    {/* Middle coil - crossing */}
                    <path d="M -6 -2 Q -2 -3 2 -4 Q 6 -5 10 -3"/>
                    {/* Top coil - right side */}
                    <path d="M 10 -3 Q 12 0 11 4 Q 10 7 6 9">
                      <animate attributeName="stroke-dasharray" values="0,100;50,50" dur="3s" repeatCount="indefinite" />
                    </path>
                    {/* Going up to head */}
                    <path d="M 6 9 Q 3 6 2 2 Q 1 -4 0 -12"/>
                  </g>
                  
                  {/* Snake Head */}
                  <g transform="translate(0, -14)">
                    {/* Head shape */}
                    <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="white"/>
                    <ellipse cx="0" cy="-1" rx="3" ry="4" fill="white"/>
                    {/* Eyes */}
                    <circle cx="-1.5" cy="-1.5" r="0.7" fill="#16a34a"/>
                    <circle cx="1.5" cy="-1.5" r="0.7" fill="#16a34a"/>
                    {/* Forked tongue */}
                    <g stroke="#16a34a" strokeWidth="0.7" fill="none">
                      <path d="M 0 2.5 L 0 5 M 0 5 L -1.2 6.5 M 0 5 L 1.2 6.5">
                        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                      </path>
                    </g>
                  </g>
                  
                  {/* Highlight on bowl for depth */}
                  <ellipse cx="-5" cy="5" rx="4" ry="6" fill="white" opacity="0.6"/>
                </g>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mt-6 mb-2" style={{ color: '#16a34a' }}>
            PHARMACY
          </h1>
          <p className="text-emerald-700 font-medium text-sm tracking-wide">
            Admin Portal
          </p>
          <p className="text-gray-600 font-medium flex items-center justify-center gap-2 text-xs mt-2">
            <Shield className="w-4 h-4" />
            Secure Access
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-white/50 transform hover:shadow-emerald-200/50 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-base">
              Sign in to manage your pharmacy network
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3.5 rounded-2xl mb-6 animate-shake shadow-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:scale-110">
                  <Mail className="w-5 h-5 text-teal-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                  placeholder="admin@pharmacy.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:scale-110">
                  <Lock className="w-5 h-5 text-teal-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 transition-all"
                />
                <span className="ml-2.5 text-gray-700 font-medium group-hover:text-emerald-600 transition-colors">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              {loading ? (
                <span className="flex items-center justify-center relative z-10">
                  <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Don't have an account?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 text-teal-600 hover:text-emerald-600 font-bold text-base hover:gap-3 transition-all duration-300 group"
            >
              Create new account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/50">
            <span className="font-medium">© 2025 Pharmacy Admin Portal. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s;
        }
        .animate-checkmark {
          animation: checkmark 0.6s;
        }
      `}</style>
    </div>
  );
};

export default Login;