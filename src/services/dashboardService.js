// src/services/dashboardService.js

import api from './api';

export const dashboardService = {
  /**
   * Get comprehensive dashboard statistics
   */
  async getStats() {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard statistics');
    }
  },

  /**
   * Get user growth data for the last 12 months
   */
  async getUserGrowthData() {
    try {
      const response = await api.get('/admin/dashboard/user-growth');
      return response.data;
    } catch (error) {
      console.error('Error fetching user growth data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user growth data');
    }
  },

  /**
   * Get pharmacy registration trend for the last 12 months
   */
  async getPharmacyTrendData() {
    try {
      const response = await api.get('/admin/dashboard/pharmacy-trend');
      return response.data;
    } catch (error) {
      console.error('Error fetching pharmacy trend data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch pharmacy trend data');
    }
  },

  /**
   * Get user activity data for the last 7 days
   */
  async getUserActivityData() {
    try {
      const response = await api.get('/admin/dashboard/user-activity');
      return response.data;
    } catch (error) {
      console.error('Error fetching user activity data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user activity data');
    }
  },

  /**
   * Get pharmacy status distribution
   */
  async getPharmacyStatusData() {
    try {
      const response = await api.get('/admin/dashboard/pharmacy-status');
      return response.data;
    } catch (error) {
      console.error('Error fetching pharmacy status data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch pharmacy status data');
    }
  },

  /**
   * Get user status distribution
   */
  async getUserStatusData() {
    try {
      const response = await api.get('/admin/dashboard/user-status');
      return response.data;
    } catch (error) {
      console.error('Error fetching user status data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user status data');
    }
  },

  /**
   * Get most active pharmacies (top 6)
   */
  async getTopPharmacies() {
    try {
      const response = await api.get('/admin/dashboard/top-pharmacies');
      return response.data;
    } catch (error) {
      console.error('Error fetching top pharmacies:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch top pharmacies');
    }
  },

  /**
   * Get monthly comparison data
   */
  async getMonthlyComparison() {
    try {
      const response = await api.get('/admin/dashboard/monthly-comparison');
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly comparison:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch monthly comparison');
    }
  },
};