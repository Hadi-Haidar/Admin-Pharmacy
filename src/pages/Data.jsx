// src/pages/Data.jsx

import { useState, useEffect } from 'react';
import { Database, Download, Loader2, Store, Pill, Users } from 'lucide-react';
import { exportService } from '../services/exportService';
import { pharmacyService } from '../services/pharmacyService';
import { medicineService } from '../services/medicineService';
import { userService } from '../services/userService';

const Data = () => {
  const [activeTab, setActiveTab] = useState('pharmacies');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data when tab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (activeTab) {
        case 'pharmacies':
          result = await pharmacyService.getAll();
          break;
        case 'medicines':
          result = await medicineService.getAll();
          break;
        case 'owners':
          result = await userService.getAllPharmacyOwners();
          break;
        default:
          result = [];
      }
      setData(result);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportService.exportData(activeTab);
    } catch (err) {
      alert('Failed to export data: ' + err.message);
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const tabs = [
    { id: 'pharmacies', label: 'Pharmacies', icon: Store },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'owners', label: 'Owners', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Data Export
          </h1>
          <p className="text-gray-600 mt-1">
            View and export your data
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={exporting || loading || data.length === 0}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {exporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Export to Excel</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-6 py-4 text-sm font-medium transition-colors duration-200 relative
                    ${isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? 'text-emerald-600' : 'text-gray-500'
                    }`} />
                    <span>{tab.label}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium transition-opacity duration-200 ${
                      isActive && !loading
                        ? 'bg-emerald-100 text-emerald-700 opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}>
                      {data.length}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
              <p className="text-gray-600 mt-4">Loading data...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <Database className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold">No data available</p>
              <p className="text-sm mt-2">Start by adding some {activeTab}!</p>
            </div>
          ) : (
            <DataTable data={data} type={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format Firestore dates
const formatDate = (date) => {
  if (!date) return 'N/A';

  try {
    let dateObj;

    // Handle Firestore Timestamp object
    if (date._seconds !== undefined) {
      dateObj = new Date(date._seconds * 1000);
    } else if (date.seconds !== undefined) {
      dateObj = new Date(date.seconds * 1000);
    } else if (date.toDate && typeof date.toDate === 'function') {
      // Firestore Timestamp instance
      dateObj = date.toDate();
    } else if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      return 'N/A';
    }

    // Check if valid date
    if (isNaN(dateObj.getTime())) {
      return 'N/A';
    }

    // Format: MM/DD/YYYY
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (error) {
    console.error('Date formatting error:', error, date);
    return 'N/A';
  }
};

// Data Table Component
const DataTable = ({ data, type }) => {
  const getColumns = () => {
    switch (type) {
      case 'pharmacies':
        return [
          { key: 'title', label: 'Pharmacy Name' },
          { key: 'location', label: 'Location', render: (item) => 
            item.location?.address || `${item.location?.latitude?.toFixed(4)}, ${item.location?.longitude?.toFixed(4)}` 
          },
          { key: 'status', label: 'Status', render: (item) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {item.status}
            </span>
          )},
          { key: 'createdAt', label: 'Created', render: (item) => formatDate(item.createdAt) },
        ];
      case 'medicines':
        return [
          { key: 'title', label: 'Medicine Name' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status', render: (item) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'active' || item.status === 'available' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {item.status}
            </span>
          )},
          { key: 'createdAt', label: 'Created', render: (item) => formatDate(item.createdAt) },
        ];
      case 'owners':
        return [
          { key: 'name', label: 'Name', render: (item) => 
            item.name && item.name.trim() ? item.name : <span className="text-gray-400 italic">N/A</span>
          },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status', render: (item) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {item.status}
            </span>
          )},
          { key: 'createdAt', label: 'Created', render: (item) => formatDate(item.createdAt) },
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 text-sm text-gray-600">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;