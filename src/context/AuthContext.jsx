// src/services/authService.js

// Use environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authService = {
  // Register new admin
  async register(name, email, password) {
    try {
      const response = await fetch(`${API_URL}/admin/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login admin
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store admin data in localStorage
      localStorage.setItem('admin', JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout admin
  async logout() {
    try {
      await fetch(`${API_URL}/admin/auth/logout`, {
        method: 'POST',
      });

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