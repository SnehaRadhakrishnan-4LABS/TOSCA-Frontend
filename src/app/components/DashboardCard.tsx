'use client';

import React, { useState } from 'react';
import { ChevronRight, Play, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { TestData } from '@/types';

interface DashboardCardProps {
  testData: TestData;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ testData, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Consistent date formatting for hydration
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const statusConfig = {
    passed: { color: 'bg-green-500/20 text-green-600 dark:text-green-400', icon: CheckCircle },
    failed: { color: 'bg-red-500/20 text-red-600 dark:text-red-400', icon: AlertCircle },
    running: { color: 'bg-blue-500/20 text-blue-600 dark:text-blue-400', icon: Play },
    pending: { color: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400', icon: Clock },
  };

  const StatusIcon = statusConfig[testData.status].icon;

  return (
    <div
      className={`glassmorphism-dark rounded-xl p-5 cursor-pointer transition-all duration-300 ${
        isHovered ? 'scale-[1.02] shadow-xl' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${statusConfig[testData.status].color}`}>
            <StatusIcon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {testData.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {testData.type === 'e2e' ? 'End-to-End Testing' : 'RTB Testing'}
            </p>
          </div>
        </div>
        <ChevronRight 
          size={20} 
          className={`text-gray-500 transition-transform duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${testData.successRate}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {testData.successRate}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Execution Time</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {testData.executionTime}s
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Tests</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {testData.totalTests}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Last Run</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatDate(testData.lastRun)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-green-600 dark:text-green-400 font-bold">
              {testData.passedTests}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-red-600 dark:text-red-400 font-bold">
              {testData.failedTests}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Failed</div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          testData.status === 'passed' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
          testData.status === 'failed' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
          testData.status === 'running' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
          'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
        }`}>
          {testData.status.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;