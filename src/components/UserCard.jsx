// src/components/UserCard.jsx

const UserCard = ({ user, onBan, onDelete }) => {
    const getStatusColor = (status) => {
      return status === 'active'
        ? 'bg-emerald-500'
        : 'bg-red-500';
    };
  
    const getStatusText = (status) => {
      return status === 'active' ? 'Active' : 'Banned';
    };
  
    return (
      <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        {/* Header with Avatar and Status */}
        <div className="relative bg-gradient-to-br from-teal-50 to-blue-50 p-8">
          {/* Status Dot */}
          <div className="absolute top-6 right-6">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(user.status)} shadow-lg ring-4 ${
              user.status === 'active' ? 'ring-emerald-100' : 'ring-red-100'
            }`}></div>
          </div>
  
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
  
        {/* User Info */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-1 text-center truncate">
            {user.name}
          </h3>
  
          {/* Email */}
          <p className="text-sm text-gray-500 mb-4 text-center truncate">
            {user.email}
          </p>
  
          {/* Status Badge */}
          <div className="flex justify-center mb-4">
            {user.status === 'active' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                {getStatusText(user.status)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {getStatusText(user.status)}
              </span>
            )}
          </div>
  
          {/* Location Info */}
          {user.location && (
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-start space-x-2 text-xs text-gray-600">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex-1">
                  {user.location.address ? (
                    <p className="line-clamp-2">{user.location.address}</p>
                  ) : (
                    <p>{user.location.latitude.toFixed(4)}, {user.location.longitude.toFixed(4)}</p>
                  )}
                </div>
              </div>
            </div>
          )}
  
          {/* Divider */}
          <div className="border-t border-gray-100 mb-4"></div>
  
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onBan(user)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                user.status === 'active'
                  ? 'bg-red-50 hover:bg-red-100 text-red-600 border-2 border-red-200'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-2 border-emerald-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {user.status === 'active' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              {user.status === 'active' ? 'Ban' : 'Unban'}
            </button>
  
            <button
              onClick={() => onDelete(user)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all font-semibold text-sm border-2 border-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserCard;