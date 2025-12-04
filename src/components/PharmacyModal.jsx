// src/components/PharmacyModal.jsx

import { useState, useEffect } from 'react';
import { pharmacyService } from '../services/pharmacyService';
import MapPicker from './MapPicker';
import WorkingHoursEditor from './WorkingHoursEditor';

const PharmacyModal = ({ pharmacy, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    location: {
      latitude: 33.8938,
      longitude: 35.5018,
      address: '',
    },
    ownerEmail: '',
    ownerPassword: '',
    ownerName: '',
    workingHours: [],
    status: 'active',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form with pharmacy data if editing
  useEffect(() => {
    if (pharmacy) {
      setFormData({
        title: pharmacy.title || '',
        description: pharmacy.description || '',
        imageUrl: pharmacy.imageUrl || '',
        location: pharmacy.location || { latitude: 33.8938, longitude: 35.5018, address: '' },
        ownerEmail: pharmacy.ownerEmail || pharmacy.owner?.email || '', // Show current email when editing
        ownerPassword: '', // Don't pre-fill for security
        ownerName: pharmacy.ownerName || pharmacy.owner?.name || '',
        workingHours: pharmacy.workingHours || [],
        status: pharmacy.status || 'active',
      });
      // Set existing image as preview
      if (pharmacy.imageUrl) {
        setImagePreview(pharmacy.imageUrl);
      }
    }
  }, [pharmacy]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(pharmacy?.imageUrl || null);
    // Reset file input
    const fileInput = document.getElementById('pharmacy-image-input');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = formData.imageUrl;

      // If new image is selected, upload it first
      if (selectedFile) {
        setUploadingImage(true);
        try {
          imageUrl = await pharmacyService.uploadImage(selectedFile);
        } catch (uploadError) {
          throw new Error('Failed to upload image: ' + uploadError.message);
        } finally {
          setUploadingImage(false);
        }
      }

      // Prepare data with uploaded image URL
      const dataToSubmit = {
        ...formData,
        imageUrl: imageUrl || formData.imageUrl,
      };

      // If updating, remove empty owner fields to avoid validation errors
      if (pharmacy) {
        if (!dataToSubmit.ownerEmail?.trim()) {
          delete dataToSubmit.ownerEmail;
        }
        if (!dataToSubmit.ownerPassword?.trim()) {
          delete dataToSubmit.ownerPassword;
        }
        if (!dataToSubmit.ownerName?.trim()) {
          delete dataToSubmit.ownerName;
        }
      }

      let result;
      if (pharmacy) {
        // Update existing pharmacy
        result = await pharmacyService.update(pharmacy.id, dataToSubmit);
      } else {
        // Create new pharmacy - imageUrl is now optional in backend
        if (!imageUrl) {
          throw new Error('Please select an image for the pharmacy');
        }
        result = await pharmacyService.create(dataToSubmit);
      }
      onSave(result);
    } catch (err) {
      setError(err.message || 'Failed to save pharmacy');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {pharmacy ? 'Edit Pharmacy' : 'Add New Pharmacy'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
            {/* Pharmacy Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pharmacy Name *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
                minLength={3}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={3}
                required
                minLength={10}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pharmacy Image * {pharmacy && '(leave empty to keep current)'}
              </label>
              
              {/* File Input */}
              <div className="mt-2">
                <label
                  htmlFor="pharmacy-image-input"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 transition-colors bg-gray-50 hover:bg-gray-100"
                >
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </label>
                <input
                  id="pharmacy-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required={!pharmacy && !imagePreview}
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {selectedFile && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Selected:</span> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Location Picker */}
            <MapPicker
              value={formData.location}
              onChange={(location) => handleChange('location', location)}
            />

            {/* Owner Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pharmacy Owner Information
              </h3>

              <div className="space-y-4">
                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="name"
                  />
                </div>

                {/* Owner Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Email * {pharmacy && '(leave empty to keep current)'}
                  </label>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleChange('ownerEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="owner@pharmacy.com"
                    required={!pharmacy}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Owner will use this email to login to their portal
                  </p>
                </div>

                {/* Owner Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Password * {pharmacy && '(leave empty to keep current)'}
                  </label>
                  <input
                    type="password"
                    value={formData.ownerPassword}
                    onChange={(e) => handleChange('ownerPassword', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="••••••••"
                    required={!pharmacy}
                    minLength={6}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 6 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="border-t border-gray-200 pt-6">
              <WorkingHoursEditor
                value={formData.workingHours}
                onChange={(hours) => handleChange('workingHours', hours)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || uploadingImage}
            >
              {uploadingImage ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Uploading Image...
                </span>
              ) : loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : pharmacy ? (
                'Update Pharmacy'
              ) : (
                'Create Pharmacy'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacyModal;