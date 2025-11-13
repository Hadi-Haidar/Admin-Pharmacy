// src/services/pharmacyService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const pharmacyService = {
  // Upload pharmacy image
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/admin/pharmacies/upload-image`, {
        method: 'POST',
        body: formData, // Don't set Content-Type header, browser will set it with boundary
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Get all pharmacies
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch pharmacies');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
      throw error;
    }
  },

  // Get pharmacy by ID
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch pharmacy');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching pharmacy:', error);
      throw error;
    }
  },

  // Create pharmacy
  async create(pharmacyData) {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pharmacyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create pharmacy');
      }

      return data;
    } catch (error) {
      console.error('Error creating pharmacy:', error);
      throw error;
    }
  },

  // Update pharmacy
  async update(id, pharmacyData) {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pharmacyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update pharmacy');
      }

      return data;
    } catch (error) {
      console.error('Error updating pharmacy:', error);
      throw error;
    }
  },

  // Delete pharmacy
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete pharmacy');
      }

      return data;
    } catch (error) {
      console.error('Error deleting pharmacy:', error);
      throw error;
    }
  },

  // Search pharmacies
  async search(query) {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search pharmacies');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching pharmacies:', error);
      throw error;
    }
  },

  // Get pharmacies by status
  async getByStatus(status) {
    try {
      const response = await fetch(`${API_URL}/admin/pharmacies?status=${status}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch pharmacies by status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching pharmacies by status:', error);
      throw error;
    }
  },
};