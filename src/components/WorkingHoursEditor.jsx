// src/components/WorkingHoursEditor.jsx

import { useState, useEffect } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WorkingHoursEditor = ({ value, onChange }) => {
  const [workingHours, setWorkingHours] = useState([]);

  useEffect(() => {
    // Initialize with provided value or default
    if (value && value.length > 0) {
      setWorkingHours(value);
    } else {
      // Default: all days open 8:00-20:00
      setWorkingHours(
        DAYS.map(day => ({
          day,
          isOpen: true,
          openTime: '08:00',
          closeTime: '20:00',
        }))
      );
    }
  }, [value]);

  const handleDayToggle = (index) => {
    const updated = [...workingHours];
    updated[index].isOpen = !updated[index].isOpen;
    setWorkingHours(updated);
    onChange(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    setWorkingHours(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Working Hours
      </label>

      {workingHours.map((day, index) => (
        <div
          key={day.day}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
        >
          {/* Day Toggle */}
          <div className="flex items-center space-x-2 w-32">
            <input
              type="checkbox"
              checked={day.isOpen}
              onChange={() => handleDayToggle(index)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {day.day.slice(0, 3)}
            </span>
          </div>

          {/* Time Inputs */}
          {day.isOpen ? (
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="time"
                value={day.openTime || ''}
                onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="time"
                value={day.closeTime || ''}
                onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          ) : (
            <span className="text-sm text-gray-500 italic flex-1">Closed</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkingHoursEditor;