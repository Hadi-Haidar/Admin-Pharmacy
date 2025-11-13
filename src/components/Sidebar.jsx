// src/components/Sidebar.jsx

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Store,
  Pill,
  Users,
  Database,
  FileBarChart,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsCollapsed]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Pharmacies',
      path: '/pharmacies',
      icon: Store,
    },
    {
      name: 'Medicines',
      path: '/medicines',
      icon: Pill,
    },
    {
      name: 'Users',
      path: '/users',
      icon: Users,
    },
    {
      name: 'Data',
      path: '/data',
      icon: Database,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: FileBarChart,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 
          transform transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64`}
      >
        {/* Header with Integrated Toggle */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {/* Logo Area with Toggle - Desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center gap-3 flex-1 group hover:bg-gray-50 rounded-lg p-2 -ml-2 transition-all duration-200"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {/* Medicine Emoji Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
              <span className="text-2xl">💊</span>
            </div>
            
            <h1 className={`font-semibold text-gray-900 text-sm transition-all duration-300 flex-1 text-left
              ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              Pharmacy Admin
            </h1>
            
            <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              )}
            </div>
          </button>

          {/* Logo Area - Mobile (no toggle) */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-2xl">💊</span>
            </div>
            <h1 className="font-semibold text-gray-900 text-sm">
              Pharmacy Admin
            </h1>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative
                      ${active 
                        ? 'bg-emerald-50 text-emerald-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                      ${isCollapsed ? 'lg:justify-center' : ''}`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors
                      ${active ? 'text-emerald-600' : 'text-gray-500 group-hover:text-gray-700'}`} 
                    />
                    
                    <span className={`text-sm transition-all duration-300 whitespace-nowrap
                      ${isCollapsed ? 'lg:hidden' : 'block'}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Logout Only */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
              bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200 text-sm font-medium
              ${isCollapsed ? 'lg:justify-center' : ''}`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-all duration-300 ${isCollapsed ? 'lg:hidden' : 'block'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;