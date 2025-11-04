// src/components/PharmacyCard.jsx

const PharmacyCard = ({ pharmacy, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const getStatusDot = (status) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-500';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Pharmacy Image */}
      <div className="relative h-48 bg-gradient-to-br from-teal-100 to-blue-100">
        {pharmacy.imageUrl ? (
          <img
            src={pharmacy.imageUrl}
            alt={pharmacy.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-20 h-20 text-teal-400"
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
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pharmacy.status)}`}>
            <span className={`w-2 h-2 ${getStatusDot(pharmacy.status)} rounded-full mr-2`}></span>
            {pharmacy.status.charAt(0).toUpperCase() + pharmacy.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Pharmacy Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {pharmacy.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {pharmacy.description}
        </p>

        {/* Location */}
        <div className="flex items-start space-x-2 text-sm text-gray-500 mb-4">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="line-clamp-2">
            {pharmacy.location?.address || `${pharmacy.location?.latitude.toFixed(4)}, ${pharmacy.location?.longitude.toFixed(4)}`}
          </span>
        </div>

        {/* Working Hours Summary */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {pharmacy.workingHours?.filter(wh => wh.isOpen).length || 0} days open
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onEdit(pharmacy)}
            className="flex-1 flex items-center justify-center space-x-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(pharmacy)}
            className="flex-1 flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;