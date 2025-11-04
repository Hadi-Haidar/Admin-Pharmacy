// src/pages/Register.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      
      // Success notification
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-sm sm:text-base';
      successDiv.textContent = 'Account created successfully! Redirecting...';
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        navigate('/dashboard');
        document.body.removeChild(successDiv);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100 px-4 py-6 sm:py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Join Pharmacy Finder Admin Dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg mb-4 sm:mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                placeholder="admin@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1 sm:mt-1.5">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm sm:text-base"
                placeholder="Re-enter your password"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-1 sm:pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-0.5 sm:mt-1 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 flex-shrink-0"
              />
              <label htmlFor="terms" className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base shadow-lg transform hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating your account...
                </span>
              ) : (
                'Create Free Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link to="/login" className="text-teal-600 hover:text-teal-700 font-bold hover:underline text-xs sm:text-sm">
              Sign in instead
            </Link>
          </div>
        </div>

        {/* Bottom Security Note */}
        <div className="mt-4 sm:mt-6 text-center">
          <div className="inline-flex items-center text-xs sm:text-sm text-gray-600 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Your data is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;