'use client';

import React, { useState } from 'react';
import { Zap, Cpu, Play, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import GlassCard from './GlassCard';
import DashboardCard from './DashboardCard';
import { demoTestData, e2eMetrics, rtbMetrics } from '@/data/demoData';

const MainDashboard = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'e2e' | 'rtb'>('all');

  const handleCardClick = (type: 'e2e' | 'rtb') => {
    alert(`Navigating to ${type === 'e2e' ? 'End-to-End Testing' : 'RTB Testing'} dashboard...`);
    // In a real application, you would use router.push() here
  };

  const handleTestCardClick = (testId: string) => {
    alert(`Opening details for test ${testId}`);
    // In a real application, navigate to test details page
  };

  const filteredTests = demoTestData.filter(
    test => activeFilter === 'all' || test.type === activeFilter
  );

  const e2eTests = demoTestData.filter(test => test.type === 'e2e');
  const rtbTests = demoTestData.filter(test => test.type === 'rtb');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tests</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {demoTestData.length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Play className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span>+12% from last week</span>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                97.2%
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span>+2.1% improvement</span>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Execution</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                2m 15s
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Clock className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-500">
            <TrendingUp size={16} className="mr-1 transform rotate-180" />
            <span>-15s optimization</span>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Tests</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                3
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Zap className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            2 E2E, 1 RTB running
          </div>
        </div>
      </div>

      {/* Main Interactive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard
          title="End-to-End Testing"
          description="Comprehensive business process validation with automated UI flows"
          icon={<Zap size={28} className="text-blue-500" />}
          type="e2e"
          metrics={[
            { label: 'Total Executions', value: e2eMetrics.totalExecutions },
            { label: 'Avg. Execution Time', value: e2eMetrics.averageExecutionTime },
            { label: 'Success Rate', value: `${e2eMetrics.successRate}%` },
            { label: 'Last 24h', value: e2eMetrics.last24Hours, change: 2.3 },
          ]}
          onClick={() => handleCardClick('e2e')}
        />

        <GlassCard
          title="RTB Testing"
          description="Risk-based testing focusing on critical business requirements"
          icon={<Cpu size={28} className="text-purple-500" />}
          type="rtb"
          metrics={[
            { label: 'Total Executions', value: rtbMetrics.totalExecutions },
            { label: 'Avg. Execution Time', value: rtbMetrics.averageExecutionTime },
            { label: 'Success Rate', value: `${rtbMetrics.successRate}%` },
            { label: 'Last 24h', value: rtbMetrics.last24Hours, change: 1.8 },
          ]}
          onClick={() => handleCardClick('rtb')}
        />
      </div>

      {/* Test Results Section */}
      <div className="glassmorphism rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Test Execution Results
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time test execution status and performance metrics
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Tests
            </button>
            <button
              onClick={() => setActiveFilter('e2e')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'e2e'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              E2E Only
            </button>
            <button
              onClick={() => setActiveFilter('rtb')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'rtb'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              RTB Only
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <DashboardCard
              key={test.id}
              testData={test}
              onClick={() => handleTestCardClick(test.id)}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 dark:text-white">
                {e2eTests.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                E2E Tests
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 dark:text-white">
                {rtbTests.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                RTB Tests
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 dark:text-white">
                {demoTestData.filter(t => t.status === 'passed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tests Passed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 dark:text-white">
                {demoTestData.filter(t => t.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tests Failed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;