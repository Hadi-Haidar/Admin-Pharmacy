// src/pages/Pharmacies.jsx

import { useState, useEffect } from 'react';
import { pharmacyService } from '../services/pharmacyService';
import PharmacyModal from '../components/PharmacyModal';
import PharmacyCard from '../components/PharmacyCard';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [pharmacyToDelete, setPharmacyToDelete] = useState(null);
  const [error, setError] = useState(null);

  // Fetch pharmacies on component mount
  useEffect(() => {
    fetchPharmacies();
  }, []);

  // Filter pharmacies when search or filter changes
  useEffect(() => {
    filterPharmacies();
  }, [pharmacies, searchQuery, statusFilter]);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pharmacyService.getAll();
      setPharmacies(data);
    } catch (err) {
      setError('Failed to load pharmacies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterPharmacies = () => {
    let filtered = [...pharmacies];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(pharmacy =>
        pharmacy.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(pharmacy => pharmacy.status === statusFilter);
    }

    setFilteredPharmacies(filtered);
  };

  const handleAddPharmacy = () => {
    setSelectedPharmacy(null);
    setIsModalOpen(true);
  };

  const handleEditPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (pharmacy) => {
    setPharmacyToDelete(pharmacy);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await pharmacyService.delete(pharmacyToDelete.id);
      setPharmacies(pharmacies.filter(p => p.id !== pharmacyToDelete.id));
      setIsDeleteModalOpen(false);
      setPharmacyToDelete(null);
    } catch (err) {
      alert('Failed to delete pharmacy. Please try again.');
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPharmacy(null);
  };

  const handlePharmacySaved = (savedPharmacy) => {
    if (selectedPharmacy) {
      // Update existing
      setPharmacies(pharmacies.map(p => 
        p.id === savedPharmacy.id ? savedPharmacy : p
      ));
    } else {
      // Add new
      setPharmacies([savedPharmacy.pharmacy, ...pharmacies]);
    }
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '-0.02em' }}>
            Pharmacies Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage pharmacy locations and their owners
          </p>
        </div>
        <button
          onClick={handleAddPharmacy}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Pharmacy</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pharmacies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Pharmacies List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading pharmacies...</p>
          </div>
        ) : filteredPharmacies.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <p className="text-lg font-semibold">
              {searchQuery || statusFilter !== 'all'
                ? 'No pharmacies match your search'
                : 'No pharmacies found'}
            </p>
            <p className="text-sm mt-2">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first pharmacy'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                onEdit={handleEditPharmacy}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <PharmacyModal
          pharmacy={selectedPharmacy}
          onClose={handleModalClose}
          onSave={handlePharmacySaved}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          title="Delete Pharmacy"
          message={`Are you sure you want to delete "${pharmacyToDelete?.title}"? This will also delete the owner account and cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setPharmacyToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Pharmacies;