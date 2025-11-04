// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const currentAdmin = authService.getCurrentAdmin();
    setAdmin(currentAdmin);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const adminData = await authService.login(email, password);
    setAdmin(adminData);
    return adminData;
  };

  const register = async (name, email, password) => {
    const adminData = await authService.register(name, email, password);
    setAdmin(adminData);
    return adminData;
  };

  const logout = async () => {
    await authService.logout();
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    register,
    logout,
    isAuthenticated: !!admin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};