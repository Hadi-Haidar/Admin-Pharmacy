// src/services/dashboardService.js

// Mock data for design/development
const mockStats = {
  totalPharmacies: 45,
  totalMedicines: 230,
  totalUsers: 520,
  activeReports: 18,
};

const mockActivities = [
  { id: 1, action: 'New pharmacy added', timestamp: '2 hours ago' },
  { id: 2, action: 'Medicine updated', timestamp: '5 hours ago' },
  { id: 3, action: 'User registered', timestamp: '1 day ago' },
];

export const dashboardService = {
  // Get dashboard statistics
  async getStats() {
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockStats;
  },

  // Get recent activities
  async getRecentActivities(limit = 10) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockActivities.slice(0, limit);
  },
};