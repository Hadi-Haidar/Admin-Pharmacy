// src/pages/Medicines.jsx

import { useState, useEffect } from 'react';
import { medicineService } from '../services/medicineService';
import MedicineModal from '../components/MedicineModal';
import MedicineCard from '../components/MedicineCard';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [error, setError] = useState(null);

  // Fetch medicines on component mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  // Filter medicines when search or filter changes
  useEffect(() => {
    filterMedicines();
  }, [medicines, searchQuery, statusFilter]);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await medicineService.getAll();
      setMedicines(data);
    } catch (err) {
      setError('Failed to load medicines. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterMedicines = () => {
    let filtered = [...medicines];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(medicine =>
        medicine.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(medicine => medicine.status === statusFilter);
    }

    setFilteredMedicines(filtered);
  };

  const handleAddMedicine = () => {
    setSelectedMedicine(null);
    setIsModalOpen(true);
  };

  const handleEditMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (medicine) => {
    setMedicineToDelete(medicine);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await medicineService.delete(medicineToDelete.id);
      setMedicines(medicines.filter(m => m.id !== medicineToDelete.id));
      setIsDeleteModalOpen(false);
      setMedicineToDelete(null);
    } catch (err) {
      alert('Failed to delete medicine. Please try again.');
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const handleMedicineSaved = (savedMedicine) => {
    if (selectedMedicine) {
      // Update existing
      setMedicines(medicines.map(m => 
        m.id === savedMedicine.id ? savedMedicine : m
      ));
    } else {
      // Add new
      setMedicines([savedMedicine, ...medicines]);
    }
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Medicines Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage medicine catalog with images
          </p>
        </div>
        <button
          onClick={handleAddMedicine}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Medicine</span>
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
                placeholder="Search medicines..."
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
            <option value="available">Available</option>
            <option value="unavailable">Not Available</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Medicines List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading medicines...</p>
          </div>
        ) : filteredMedicines.length === 0 ? (
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <p className="text-lg font-semibold">
              {searchQuery || statusFilter !== 'all'
                ? 'No medicines match your search'
                : 'No medicines found'}
            </p>
            <p className="text-sm mt-2">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first medicine'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onEdit={handleEditMedicine}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <MedicineModal
          medicine={selectedMedicine}
          onClose={handleModalClose}
          onSave={handleMedicineSaved}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          title="Delete Medicine"
          message={`Are you sure you want to delete "${medicineToDelete?.title}"? This action cannot be undone and will delete both images.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setMedicineToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Medicines;