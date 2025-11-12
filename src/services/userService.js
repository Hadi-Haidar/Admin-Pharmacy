// src/services/userService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const userService = {
  // Get all users
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/admin/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/admin/users/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Create user (for testing)
  async create(userData) {
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create user');
      }

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user status (ban/unban)
  async updateStatus(id, status) {
    try {
      const response = await fetch(`${API_URL}/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user status');
      }

      return data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  // Delete user
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }

      return data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Search users
  async search(query) {
    try {
      const response = await fetch(`${API_URL}/admin/users/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // Get users by status
  async getByStatus(status) {
    try {
      const response = await fetch(`${API_URL}/admin/users?status=${status}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users by status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users by status:', error);
      throw error;
    }
  },

  // Get statistics
  async getStatistics() {
    try {
      const response = await fetch(`${API_URL}/admin/users/statistics`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },
};