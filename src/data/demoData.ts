import { TestData } from '@/types';

export const demoTestData: TestData[] = [
  {
    id: '1',
    name: 'E-Commerce Checkout Flow',
    type: 'e2e',
    status: 'passed',
    executionTime: 245,
    lastRun: '2024-01-15T10:30:00Z',
    successRate: 98.5,
    totalTests: 156,
    passedTests: 154,
    failedTests: 2,
  },
  {
    id: '2',
    name: 'Payment Gateway Integration',
    type: 'e2e',
    status: 'running',
    executionTime: 180,
    lastRun: '2024-01-15T09:15:00Z',
    successRate: 95.2,
    totalTests: 84,
    passedTests: 80,
    failedTests: 4,
  },
  {
    id: '3',
    name: 'API Response Validation',
    type: 'rtb',
    status: 'passed',
    executionTime: 45,
    lastRun: '2024-01-15T11:45:00Z',
    successRate: 99.8,
    totalTests: 245,
    passedTests: 245,
    failedTests: 0,
  },
  {
    id: '4',
    name: 'Database Migration Tests',
    type: 'rtb',
    status: 'failed',
    executionTime: 120,
    lastRun: '2024-01-15T08:20:00Z',
    successRate: 87.3,
    totalTests: 110,
    passedTests: 96,
    failedTests: 14,
  },
];

export const e2eMetrics = {
  totalExecutions: 1248,
  averageExecutionTime: '3m 45s',
  successRate: 96.7,
  last24Hours: '+2.3%',
};

export const rtbMetrics = {
  totalExecutions: 8567,
  averageExecutionTime: '45s',
  successRate: 98.2,
  last24Hours: '+1.8%',
};