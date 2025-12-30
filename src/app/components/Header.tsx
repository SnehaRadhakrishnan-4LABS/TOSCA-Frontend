'use client';

import React, { useState } from 'react';
import { Bell, Search, User, Menu, X, Cloud } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-white/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Cloud size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Tricentis TOSCA Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enterprise Test Automation Platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tests, reports, analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="hidden md:flex items-center space-x-3 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">TOSCA Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {showMobileMenu && (
          <div className="mt-4 md:hidden animate-slide-in">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;