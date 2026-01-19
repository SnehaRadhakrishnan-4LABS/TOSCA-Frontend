'use client';

import React from 'react';
import { ExecutionHistory, TestCoverage } from '@/types';

interface ProjectChartsProps {
  executionHistory: ExecutionHistory[];
  testCoverage: TestCoverage;
  testCases: number;
  successRate: number;
}

const ProjectCharts: React.FC<ProjectChartsProps> = ({
  executionHistory,
  testCoverage,
  testCases,
  successRate
}) => {
  const successCount = Math.round((successRate / 100) * testCases);
  const failureCount = testCases - successCount;
  const executionTrendData = executionHistory.slice(0, 5).reverse();

  return (
    <div className="space-y-6">
      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Test Success Rate
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 border-r-green-500"
              style={{
                transform: `rotate(${45 + (successRate * 1.8)}deg)`,
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-gray-800 dark:text-white">
                {successRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {successCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Passed Tests</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {failureCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Failed Tests</div>
          </div>
        </div>
      </div>

      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Execution Trend
        </h3>
        <div className="space-y-4">
          {executionTrendData.map((execution, index) => {
            const passedPercentage = (execution.passed / execution.totalTests) * 100;
            
            return (
              <div key={execution.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{execution.date}</span>
                  <span className={`font-medium ${
                    execution.status === 'passed' ? 'text-green-600 dark:text-green-400' :
                    execution.status === 'failed' ? 'text-red-600 dark:text-red-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {execution.passed}/{execution.totalTests} ({passedPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${passedPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Duration: {execution.duration} min</span>
                  <span className={`px-2 py-1 rounded-full ${
                    execution.status === 'passed' ? 'bg-green-500/20 text-green-600' :
                    execution.status === 'failed' ? 'bg-red-500/20 text-red-600' :
                    'bg-yellow-500/20 text-yellow-600'
                  }`}>
                    {execution.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Test Coverage by Module
        </h3>
        <div className="space-y-4">
          {testCoverage.byModule.map((module, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {module.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {module.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    module.percentage >= 90 ? 'bg-green-500' :
                    module.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${module.percentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {module.covered}/{module.total} requirements covered
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Coverage
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Requirements covered by tests
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {testCoverage.coveragePercentage}%
            </div>
          </div>
        </div>
      </div>

      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Test Status Distribution
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(testCases * 0.7)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Passed</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {Math.round(testCases * 0.2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {Math.round(testCases * 0.1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCharts;