// src/pages/Dashboard.jsx

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Users, 
  Building2, 
  UserCog, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Ban, 
  Pill 
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [userGrowthData, setUserGrowthData] = useState(null);
  const [pharmacyTrendData, setPharmacyTrendData] = useState(null);
  const [userActivityData, setUserActivityData] = useState(null);
  const [pharmacyStatusData, setPharmacyStatusData] = useState(null);
  const [userStatusData, setUserStatusData] = useState(null);
  const [topPharmacies, setTopPharmacies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        statsData,
        userGrowth,
        pharmacyTrend,
        userActivity,
        pharmacyStatus,
        userStatus,
        topPharmaciesData,
      ] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getUserGrowthData(),
        dashboardService.getPharmacyTrendData(),
        dashboardService.getUserActivityData(),
        dashboardService.getPharmacyStatusData(),
        dashboardService.getUserStatusData(),
        dashboardService.getTopPharmacies(),
      ]);

      setStats(statsData);
      setUserGrowthData(userGrowth);
      setPharmacyTrendData(pharmacyTrend);
      setUserActivityData(userActivity);
      setPharmacyStatusData(pharmacyStatus);
      setUserStatusData(userStatus);
      setTopPharmacies(topPharmaciesData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );

  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, gradient, trend, trendValue }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {value?.toLocaleString() || 0}
          </p>
          {trend && (
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );

  // Chart configurations
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      },
    },
    cutout: '65%',
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, {admin?.name || 'Admin'}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Activity className="w-4 h-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Users"
              value={stats?.totalUsers}
              icon={Users}
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              trend="up"
              trendValue="+20.3%"
            />
            <StatCard
              title="Total Pharmacies"
              value={stats?.totalPharmacies}
              icon={Building2}
              gradient="bg-gradient-to-br from-teal-500 to-teal-600"
              trend="up"
              trendValue="+2.8%"
            />
            <StatCard
              title="Pharmacy Owners"
              value={stats?.totalPharmacyOwners}
              icon={UserCog}
              gradient="bg-gradient-to-br from-purple-500 to-purple-600"
              trend="up"
              trendValue="+5.1%"
            />
            <StatCard
              title="Total Medicines"
              value={stats?.totalMedicines}
              icon={Pill}
              gradient="bg-gradient-to-br from-pink-500 to-pink-600"
              trend="up"
              trendValue="+11.7%"
            />
          </>
        )}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Active Pharmacies"
              value={stats?.activePharmacies}
              icon={Activity}
              gradient="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatCard
              title="Inactive Pharmacies"
              value={stats?.inactivePharmacies}
              icon={TrendingDown}
              gradient="bg-gradient-to-br from-orange-500 to-orange-600"
            />
            <StatCard
              title="Banned Users"
              value={stats?.bannedUsers}
              icon={Ban}
              gradient="bg-gradient-to-br from-red-500 to-red-600"
            />
            <StatCard
              title="New Users (Month)"
              value={stats?.newUsersThisMonth}
              icon={TrendingUp}
              gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Growth Trend</h3>
            <p className="text-sm text-gray-500">Monthly user registrations over the year</p>
          </div>
          <div className="h-64">
            {loading || !userGrowthData ? (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg"></div>
            ) : (
              <Line
                data={{
                  labels: userGrowthData.labels,
                  datasets: [
                    {
                      label: 'Users',
                      data: userGrowthData.data,
                      borderColor: 'rgb(59, 130, 246)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      fill: true,
                      tension: 0.4,
                      borderWidth: 3,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointBackgroundColor: 'rgb(59, 130, 246)',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                    },
                  ],
                }}
                options={lineChartOptions}
              />
            )}
          </div>
        </div>

        {/* Pharmacy Registration Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pharmacy Registration Trend</h3>
            <p className="text-sm text-gray-500">Monthly pharmacy additions over the year</p>
          </div>
          <div className="h-64">
            {loading || !pharmacyTrendData ? (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg"></div>
            ) : (
              <Line
                data={{
                  labels: pharmacyTrendData.labels,
                  datasets: [
                    {
                      label: 'Pharmacies',
                      data: pharmacyTrendData.data,
                      borderColor: 'rgb(20, 184, 166)',
                      backgroundColor: 'rgba(20, 184, 166, 0.1)',
                      fill: true,
                      tension: 0.4,
                      borderWidth: 3,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointBackgroundColor: 'rgb(20, 184, 166)',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                    },
                  ],
                }}
                options={lineChartOptions}
              />
            )}
          </div>
        </div>

        {/* User Activity Graph */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly User Activity</h3>
            <p className="text-sm text-gray-500">Active users over the last 7 days</p>
          </div>
          <div className="h-64">
            {loading || !userActivityData ? (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg"></div>
            ) : (
              <Bar
                data={{
                  labels: userActivityData.labels,
                  datasets: [
                    {
                      label: 'Active Users',
                      data: userActivityData.data,
                      backgroundColor: 'rgba(168, 85, 247, 0.8)',
                      borderColor: 'rgb(168, 85, 247)',
                      borderWidth: 2,
                      borderRadius: 8,
                      hoverBackgroundColor: 'rgba(168, 85, 247, 1)',
                    },
                  ],
                }}
                options={barChartOptions}
              />
            )}
          </div>
        </div>

        {/* Most Active Pharmacies */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Most Active Pharmacies</h3>
            <p className="text-sm text-gray-500">Top 6 pharmacies by activity</p>
          </div>
          <div className="h-64">
            {loading || !topPharmacies ? (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg"></div>
            ) : (
              <Bar
                data={{
                  labels: topPharmacies.labels,
                  datasets: [
                    {
                      label: 'Activities',
                      data: topPharmacies.data,
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(234, 179, 8, 0.8)',
                      ],
                      borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(251, 146, 60)',
                        'rgb(168, 85, 247)',
                        'rgb(236, 72, 153)',
                        'rgb(234, 179, 8)',
                      ],
                      borderWidth: 2,
                      borderRadius: 8,
                    },
                  ],
                }}
                options={{
                  ...barChartOptions,
                  indexAxis: 'y',
                }}
              />
            )}
          </div>
        </div>

        {/* Pharmacy Status Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pharmacy Status Distribution</h3>
            <p className="text-sm text-gray-500">Active vs Inactive pharmacies</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            {loading || !pharmacyStatusData ? (
              <div className="w-48 h-48 bg-gray-100 animate-pulse rounded-full"></div>
            ) : (
              <Doughnut
                data={{
                  labels: pharmacyStatusData.labels,
                  datasets: [
                    {
                      data: pharmacyStatusData.data,
                      backgroundColor: pharmacyStatusData.colors,
                      borderColor: '#fff',
                      borderWidth: 3,
                      hoverOffset: 10,
                    },
                  ],
                }}
                options={doughnutOptions}
              />
            )}
          </div>
        </div>

        {/* User Status Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Status Distribution</h3>
            <p className="text-sm text-gray-500">Active vs Banned users</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            {loading || !userStatusData ? (
              <div className="w-48 h-48 bg-gray-100 animate-pulse rounded-full"></div>
            ) : (
              <Doughnut
                data={{
                  labels: userStatusData.labels,
                  datasets: [
                    {
                      data: userStatusData.data,
                      backgroundColor: userStatusData.colors,
                      borderColor: '#fff',
                      borderWidth: 3,
                      hoverOffset: 10,
                    },
                  ],
                }}
                options={doughnutOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;