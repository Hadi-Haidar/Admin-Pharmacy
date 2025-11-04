// src/pages/Settings.jsx

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { admin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-4 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={admin?.name || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={admin?.email || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              <p className="text-gray-600">Change your password and manage security preferences.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" defaultChecked />
                  <span className="ml-3 text-gray-700">Email notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" defaultChecked />
                  <span className="ml-3 text-gray-700">New pharmacy registrations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                  <span className="ml-3 text-gray-700">Weekly reports</span>
                </label>
              </div>
              <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;