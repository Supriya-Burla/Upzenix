import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Kanban, BarChart3, Table, Moon, Sun, Menu, X, Settings, Film } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/kanban', icon: Kanban, label: 'Kanban' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/tables', icon: Table, label: 'Tables' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
        >
          {isOpen ? <X className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className="bg-gray-800 shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Movie Admin</h1>
              <p className="text-xs text-gray-400">Management Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-4 py-3 mb-1 rounded-xl text-gray-300 hover:bg-gray-700 transition-all duration-200 group ${
                location.pathname === item.path 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'hover:translate-x-1'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                location.pathname === item.path 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-blue-500'
              }`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-700 p-4 rounded-xl border border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <p className="text-xs text-gray-400">Toggle theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDark ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;