// app/e2e/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  RefreshCw, 
  Download, 
  Filter, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Users,
  Cpu
} from 'lucide-react';

// Dummy data for E2E tests
const e2eTestSuites = [
  {
    id: '1',
    name: 'User Registration Flow',
    description: 'Complete user registration with email verification',
    status: 'passed' as const,
    lastRun: '2024-01-15T10:30:00',
    duration: '2m 45s',
    successRate: 98,
    totalTests: 12,
    passedTests: 12,
    failedTests: 0,
    coverage: 'High',
    priority: 'Critical',
    environment: 'Production',
    lastPassed: '2024-01-15T10:30:00',
    team: 'Authentication Team'
  },
  {
    id: '2',
    name: 'Checkout Process',
    description: 'End-to-end e-commerce checkout validation',
    status: 'running' as const,
    lastRun: '2024-01-15T11:45:00',
    duration: '5m 20s',
    successRate: 95,
    totalTests: 18,
    passedTests: 17,
    failedTests: 1,
    coverage: 'High',
    priority: 'Critical',
    environment: 'Staging',
    lastPassed: '2024-01-14T09:20:00',
    team: 'E-commerce Team'
  },
  {
    id: '3',
    name: 'Payment Gateway Integration',
    description: 'Validate all payment methods and transactions',
    status: 'failed' as const,
    lastRun: '2024-01-15T09:15:00',
    duration: '3m 10s',
    successRate: 87,
    totalTests: 15,
    passedTests: 13,
    failedTests: 2,
    coverage: 'Medium',
    priority: 'High',
    environment: 'Production',
    lastPassed: '2024-01-14T14:30:00',
    team: 'Payment Team'
  },
  {
    id: '4',
    name: 'Inventory Management',
    description: 'Stock updates and inventory tracking',
    status: 'passed' as const,
    lastRun: '2024-01-15T08:00:00',
    duration: '1m 50s',
    successRate: 100,
    totalTests: 8,
    passedTests: 8,
    failedTests: 0,
    coverage: 'Medium',
    priority: 'Medium',
    environment: 'Production',
    lastPassed: '2024-01-15T08:00:00',
    team: 'Inventory Team'
  },
  {
    id: '5',
    name: 'Mobile App Sync',
    description: 'Mobile app data synchronization tests',
    status: 'pending' as const,
    lastRun: '2024-01-14T16:45:00',
    duration: '4m 30s',
    successRate: 92,
    totalTests: 10,
    passedTests: 9,
    failedTests: 1,
    coverage: 'High',
    priority: 'High',
    environment: 'Development',
    lastPassed: '2024-01-13T11:20:00',
    team: 'Mobile Team'
  },
  {
    id: '6',
    name: 'API Gateway Tests',
    description: 'API routing and load balancing validation',
    status: 'passed' as const,
    lastRun: '2024-01-15T07:30:00',
    duration: '2m 15s',
    successRate: 99,
    totalTests: 14,
    passedTests: 14,
    failedTests: 0,
    coverage: 'High',
    priority: 'Critical',
    environment: 'Production',
    lastPassed: '2024-01-15T07:30:00',
    team: 'API Team'
  },
];

const recentExecutions = [
  { id: 'e1', testSuite: 'User Registration Flow', time: '10:30 AM', duration: '2m 45s', status: 'passed', user: 'Admin' },
  { id: 'e2', testSuite: 'Checkout Process', time: '11:45 AM', duration: '5m 20s', status: 'running', user: 'QA Engineer' },
  { id: 'e3', testSuite: 'Payment Gateway Integration', time: '9:15 AM', duration: '3m 10s', status: 'failed', user: 'Automation Lead' },
  { id: 'e4', testSuite: 'Inventory Management', time: '8:00 AM', duration: '1m 50s', status: 'passed', user: 'System Admin' },
];

const e2eMetrics = {
  totalTestSuites: 24,
  totalTestCases: 456,
  averageExecutionTime: '3m 15s',
  overallSuccessRate: 94.5,
  todayExecutions: 18,
  failedToday: 2,
  inProgress: 3,
  coveragePercentage: 87
};

export default function E2EPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [isRunningAll, setIsRunningAll] = useState(false);

  const filteredSuites = e2eTestSuites.filter(suite => {
    const matchesStatus = selectedStatus === 'all' || suite.status === selectedStatus;
    const matchesSearch = suite.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         suite.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || suite.team === selectedTeam;
    return matchesStatus && matchesSearch && matchesTeam;
  });

  const teams = Array.from(new Set(e2eTestSuites.map(suite => suite.team)));

  const statusConfig = {
    passed: { color: 'bg-green-500/20 text-green-600 dark:text-green-400', icon: CheckCircle, badge: 'bg-green-500/20 text-green-600 dark:text-green-400' },
    failed: { color: 'bg-red-500/20 text-red-600 dark:text-red-400', icon: XCircle, badge: 'bg-red-500/20 text-red-600 dark:text-red-400' },
    running: { color: 'bg-blue-500/20 text-blue-600 dark:text-blue-400', icon: RefreshCw, badge: 'bg-blue-500/20 text-blue-600 dark:text-blue-400' },
    pending: { color: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400', icon: Clock, badge: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' },
  };

  const handleRunTest = (testId: string) => {
    alert(`Starting test suite: ${testId}`);
    // In real app, trigger test execution API
  };

  const handleRunAllTests = () => {
    setIsRunningAll(true);
    alert('Starting all E2E test suites...');
    setTimeout(() => setIsRunningAll(false), 3000);
  };

  const handleViewDetails = (testId: string) => {
    alert(`Navigating to details for test: ${testId}`);
    // In real app: router.push(`/e2e/${testId}`);
  };

  const handleExportReport = () => {
    alert('Exporting E2E test report...');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Zap size={28} className="text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                End-to-End Testing
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive business process validation with automated UI flows
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRunAllTests}
            disabled={isRunningAll}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
          >
            {isRunningAll ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <Play size={20} />
            )}
            <span>{isRunningAll ? 'Running...' : 'Run All Tests'}</span>
          </button>
          
          <button
            onClick={handleExportReport}
            className="px-6 py-3 glassmorphism rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Test Suites</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {e2eMetrics.totalTestSuites}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Zap className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {e2eMetrics.totalTestCases} individual test cases
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {e2eMetrics.overallSuccessRate}%
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <span>+1.2% from last week</span>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Execution</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {e2eMetrics.averageExecutionTime}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Clock className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Across all test suites
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test Coverage</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {e2eMetrics.coveragePercentage}%
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <BarChart3 className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Business process coverage
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glassmorphism rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search test suites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="running">Running</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Test Suites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuites.map((suite) => {
            const StatusIcon = statusConfig[suite.status].icon;
            return (
              <div
                key={suite.id}
                className="glassmorphism-dark rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-blue-500/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {suite.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[suite.status].badge}`}>
                        {suite.status.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {suite.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${suite.successRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {suite.successRate}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {suite.duration}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Tests</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {suite.totalTests}
                      </span>
                      <div className="flex space-x-1">
                        <span className="text-xs text-green-500">{suite.passedTests}✓</span>
                        <span className="text-xs text-red-500">{suite.failedTests}✗</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Priority</p>
                    <p className={`text-sm font-medium ${
                      suite.priority === 'Critical' ? 'text-red-500' :
                      suite.priority === 'High' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      {suite.priority}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{suite.team}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Cpu size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{suite.environment}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRunTest(suite.id)}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      {suite.status === 'running' ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Play size={14} />
                      )}
                      <span>{suite.status === 'running' ? 'Running...' : 'Run'}</span>
                    </button>
                    
                    <button
                      onClick={() => handleViewDetails(suite.id)}
                      className="px-3 py-1.5 glassmorphism rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Executions */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Executions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Test Suite</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Executed By</th>
                </tr>
              </thead>
              <tbody>
                {recentExecutions.map((exec) => (
                  <tr key={exec.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 text-gray-800 dark:text-white">{exec.testSuite}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{exec.time}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{exec.duration}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        exec.status === 'passed' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                        exec.status === 'failed' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                        'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      }`}>
                        {exec.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{exec.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}