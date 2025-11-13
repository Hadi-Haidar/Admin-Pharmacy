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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Pharmacy Image - SMALL SQUARE */}
      <div className="relative w-full aspect-square max-h-32 sm:max-h-36 md:max-h-44 lg:max-h-48 overflow-hidden bg-gray-100">
        {pharmacy.imageUrl ? (
          <>
            {/* Background Layer */}
            <div 
              className="absolute inset-0 blur-sm brightness-95 scale-105"
              style={{
                backgroundImage: `url(${pharmacy.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Main Image */}
            <img
              src={pharmacy.imageUrl}
              alt={pharmacy.title}
              className="relative w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector('.fallback-icon')?.classList.remove('hidden');
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none" />
            
            {/* Fallback Icon */}
            <div className="fallback-icon hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20">
          <span className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold shadow-md backdrop-blur-md bg-white/95 border ${
            pharmacy.status === 'active' ? 'border-green-200/50' : 'border-gray-200/50'
          }`}>
            <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${getStatusDot(pharmacy.status)} rounded-full mr-1 sm:mr-1.5 ${pharmacy.status === 'active' ? 'animate-pulse' : ''}`}></span>
            <span className={pharmacy.status === 'active' ? 'text-green-700' : 'text-gray-700'}>
              {pharmacy.status.charAt(0).toUpperCase() + pharmacy.status.slice(1)}
            </span>
          </span>
        </div>
      </div>

      {/* Pharmacy Info */}
      <div className="p-3 sm:p-3.5 bg-white">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1 truncate">
          {pharmacy.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2 sm:mb-2.5 line-clamp-2 leading-relaxed">
          {pharmacy.description}
        </p>

        {/* Info Section */}
        <div className="space-y-1.5 mb-2 sm:mb-2.5">
          {/* Location */}
          <div className="flex items-start space-x-1.5 text-xs text-gray-500">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 flex-shrink-0 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1 flex-1">
              {pharmacy.location?.address || `${pharmacy.location?.latitude.toFixed(4)}, ${pharmacy.location?.longitude.toFixed(4)}`}
            </span>
          </div>

          {/* Working Hours */}
          <div className="flex items-center space-x-1.5 text-xs text-gray-500">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{pharmacy.workingHours?.filter(wh => wh.isOpen).length || 0} days open</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-1.5 sm:space-x-2 pt-2 sm:pt-2.5 border-t border-gray-100">
          <button
            onClick={() => onEdit(pharmacy)}
            className="flex-1 flex items-center justify-center space-x-1 bg-teal-50 hover:bg-teal-100 text-teal-700 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors font-medium text-xs sm:text-sm"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(pharmacy)}
            className="flex-1 flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-700 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors font-medium text-xs sm:text-sm"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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