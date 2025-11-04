// src/services/authService.js
import api from './api';

const AUTH_URL = '/admin/auth';

export const authService = {
  // Register new admin
  async register(name, email, password) {
    try {
      const response = await api.post(`${AUTH_URL}/register`, {
        name,
        email,
        password,
      });

      const data = response.data;
      
      // Store admin data in localStorage
      localStorage.setItem('admin', JSON.stringify(data));
      
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Login admin
  async login(email, password) {
    try {
      const response = await api.post(`${AUTH_URL}/login`, {
        email,
        password,
      });

      const data = response.data;

      // Store admin data in localStorage
      localStorage.setItem('admin', JSON.stringify(data));
      
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Logout admin
  async logout() {
    try {
      await api.post(`${AUTH_URL}/logout`);
      // Remove admin data from localStorage
      localStorage.removeItem('admin');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove from localStorage even if API call fails
      localStorage.removeItem('admin');
    }
  },

  // Get current admin from localStorage
  getCurrentAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  },

  // Check if admin is logged in
  isAuthenticated() {
    return this.getCurrentAdmin() !== null;
  },
};