// src/components/MapPicker.jsx

import { useState, useEffect, useRef } from 'react';

const MapPicker = ({ value, onChange }) => {
  const [location, setLocation] = useState({
    latitude: value?.latitude || 33.8938,
    longitude: value?.longitude || 35.5018,
    address: value?.address || '',
  });

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize Leaflet map
  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Cleanup map on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker when location changes externally (from input fields)
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const newLatLng = window.L.latLng(location.latitude, location.longitude);
      markerRef.current.setLatLng(newLatLng);
      mapInstanceRef.current.setView(newLatLng, 15);
    }
  }, [location.latitude, location.longitude]);

  const initializeMap = () => {
    if (!window.L || !mapRef.current || mapInstanceRef.current) return;

    // Create map
    const map = window.L.map(mapRef.current).setView(
      [location.latitude, location.longitude],
      15
    );

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom marker icon
    const customIcon = window.L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add draggable marker
    const marker = window.L.marker(
      [location.latitude, location.longitude],
      {
        draggable: true,
        icon: customIcon,
      }
    ).addTo(map);

    // Update location when marker is dragged
    marker.on('dragend', function (e) {
      const position = e.target.getLatLng();
      updateLocation(position.lat, position.lng);
    });

    // Add click handler to map
    map.on('click', function (e) {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      updateLocation(lat, lng);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;
  };

  const updateLocation = (lat, lng) => {
    const updated = {
      latitude: parseFloat(lat.toFixed(6)),
      longitude: parseFloat(lng.toFixed(6)),
      address: location.address,
    };
    setLocation(updated);
    onChange(updated);
  };

  const handleLatLngChange = (field, value) => {
    const floatValue = parseFloat(value) || 0;
    const updated = {
      ...location,
      [field]: floatValue,
    };
    setLocation(updated);
    onChange(updated);
  };

  const handleAddressChange = (value) => {
    const updated = {
      ...location,
      address: value,
    };
    setLocation(updated);
    onChange(updated);
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          const updated = {
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lng.toFixed(6)),
            address: location.address,
          };
          
          setLocation(updated);
          onChange(updated);

          // Update map and marker
          if (mapInstanceRef.current && markerRef.current) {
            const newLatLng = window.L.latLng(lat, lng);
            markerRef.current.setLatLng(newLatLng);
            mapInstanceRef.current.setView(newLatLng, 15);
          }
        },
        (error) => {
          alert('Unable to get your location. Please enter manually.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Location *
      </label>

      {/* Interactive Map */}
      <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Current Location Button */}
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors font-medium border border-blue-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Use My Current Location</span>
      </button>

      {/* Coordinates Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude *
          </label>
          <input
            type="number"
            step="0.000001"
            value={location.latitude}
            onChange={(e) => handleLatLngChange('latitude', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="33.8938"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude *
          </label>
          <input
            type="number"
            step="0.000001"
            value={location.longitude}
            onChange={(e) => handleLatLngChange('longitude', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="35.5018"
            required
          />
        </div>
      </div>

      {/* Address Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address (Optional)
        </label>
        <input
          type="text"
          value={location.address}
          onChange={(e) => handleAddressChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Main Street, Beirut, Lebanon"
        />
      </div>
    </div>
  );
};

export default MapPicker;