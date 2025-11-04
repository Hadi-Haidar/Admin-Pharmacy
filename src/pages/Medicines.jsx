// src/pages/Medicines.jsx

import { useState, useEffect } from 'react';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch medicines from API
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Medicines Management</h1>
        <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">
          Add Medicine
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading medicines...</p>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-semibold">No medicines found</p>
            <p className="text-sm mt-2">Start by adding your first medicine</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;