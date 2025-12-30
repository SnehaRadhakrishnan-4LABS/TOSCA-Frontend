import React from 'react';
import { Heart, Code, Shield, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glassmorphism border-t border-white/10 mt-8">
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Shield size={18} className="text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Secured by Tricentis TOSCA
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              API Reference
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Support
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                v14.2.1
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Global
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear} Tricentis TOSCA Dashboard. All rights reserved.</span>
            <Heart size={14} className="text-red-500 fill-current" />
            <span>Made with passion for test automation</span>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            This dashboard displays demo data for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
