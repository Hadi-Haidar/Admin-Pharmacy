// src/pages/Pharmacies.jsx

import { useState, useEffect } from 'react';

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch pharmacies from API
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pharmacies Management</h1>
        <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">
          Add Pharmacy
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading pharmacies...</p>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-lg font-semibold">No pharmacies found</p>
            <p className="text-sm mt-2">Start by adding your first pharmacy</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacies;