// src/services/exportService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const exportService = {
  // Export data based on type
  async exportData(type) {
    try {
      let endpoint;
      switch (type) {
        case 'pharmacies':
          endpoint = '/admin/export/pharmacies';
          break;
        case 'medicines':
          endpoint = '/admin/export/medicines';
          break;
        case 'owners':
          endpoint = '/admin/export/pharmacy-owners';
          break;
        default:
          throw new Error('Invalid export type');
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      // Get the blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return true;
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  },
};