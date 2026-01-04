import React, { useState, useEffect } from 'react';
import { Bell, Search, User, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Topbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [account, setAccount] = useState({ name: 'Admin User', email: 'admin@movie.com' });

  useEffect(() => {
    const saved = localStorage.getItem('account');
    if (saved) setAccount(JSON.parse(saved));
  }, []);

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies, users, tickets..."
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all duration-200"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="relative p-2 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
        </button>
        <button className="p-2 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-medium text-white">{account.name}</span>
            <p className="text-xs text-gray-400">{account.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;