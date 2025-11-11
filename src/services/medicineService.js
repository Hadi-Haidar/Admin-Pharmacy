// src/services/medicineService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const medicineService = {
  // Get all medicines
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/admin/medicines`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  },

  // Get medicine by ID
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/admin/medicines/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch medicine');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching medicine:', error);
      throw error;
    }
  },

  // Create medicine (with images)
  async create(medicineData, frontImage, backImage) {
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', medicineData.title);
      formData.append('description', medicineData.description);
      if (medicineData.status) {
        formData.append('status', medicineData.status);
      }
      
      // Add image files
      formData.append('frontImage', frontImage);
      formData.append('backImage', backImage);

      const response = await fetch(`${API_URL}/admin/medicines`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create medicine');
      }

      return data;
    } catch (error) {
      console.error('Error creating medicine:', error);
      throw error;
    }
  },

  // Update medicine (with optional images)
  async update(id, medicineData, frontImage = null, backImage = null) {
    try {
      const formData = new FormData();
      
      // Add text fields (only if provided)
      if (medicineData.title) {
        formData.append('title', medicineData.title);
      }
      if (medicineData.description) {
        formData.append('description', medicineData.description);
      }
      if (medicineData.status) {
        formData.append('status', medicineData.status);
      }
      
      // Add image files (only if provided)
      if (frontImage) {
        formData.append('frontImage', frontImage);
      }
      if (backImage) {
        formData.append('backImage', backImage);
      }

      const response = await fetch(`${API_URL}/admin/medicines/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update medicine');
      }

      return data;
    } catch (error) {
      console.error('Error updating medicine:', error);
      throw error;
    }
  },

  // Delete medicine
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/admin/medicines/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete medicine');
      }

      return data;
    } catch (error) {
      console.error('Error deleting medicine:', error);
      throw error;
    }
  },

  // Search medicines
  async search(query) {
    try {
      const response = await fetch(`${API_URL}/admin/medicines/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search medicines');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching medicines:', error);
      throw error;
    }
  },

  // Get medicines by status
  async getByStatus(status) {
    try {
      const response = await fetch(`${API_URL}/admin/medicines?status=${status}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch medicines by status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching medicines by status:', error);
      throw error;
    }
  },
};