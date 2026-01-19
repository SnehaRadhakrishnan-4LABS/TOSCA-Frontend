export interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  testCases: number;
  testSuites: number;
  executionRuns: number;
  successRate: number;
  owner: string;
  status: 'active' | 'archived' | 'maintenance';
  folderStructure: FolderItem[];
}

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'testcase' | 'testsuite' | 'module' | 'requirement';
  children?: FolderItem[];
  lastModified?: string;
  status?: 'passed' | 'failed' | 'not_run' | 'in_progress';
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform Testing',
    description: 'End-to-end testing for online shopping platform',
    lastModified: '2024-01-15T14:30:00Z',
    testCases: 245,
    testSuites: 15,
    executionRuns: 1248,
    successRate: 96.5,
    owner: 'Alex Johnson',
    status: 'active',
    folderStructure: [
      {
        id: '1-1',
        name: 'Test Cases',
        type: 'folder',
        children: [
          {
            id: '1-1-1',
            name: 'Checkout Flow',
            type: 'folder',
            children: [
              { id: '1-1-1-1', name: 'Guest Checkout', type: 'testcase', status: 'passed', lastModified: '2024-01-14' },
              { id: '1-1-1-2', name: 'Registered User Checkout', type: 'testcase', status: 'passed', lastModified: '2024-01-14' },
              { id: '1-1-1-3', name: 'Payment Processing', type: 'testcase', status: 'in_progress', lastModified: '2024-01-15' },
            ]
          },
          {
            id: '1-1-2',
            name: 'Product Management',
            type: 'folder',
            children: [
              { id: '1-1-2-1', name: 'Add Product', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
              { id: '1-1-2-2', name: 'Update Product', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
            ]
          }
        ]
      },
      {
        id: '1-2',
        name: 'Test Suites',
        type: 'folder',
        children: [
          { id: '1-2-1', name: 'Smoke Test Suite', type: 'testsuite', status: 'passed', lastModified: '2024-01-15' },
          { id: '1-2-2', name: 'Regression Suite', type: 'testsuite', status: 'in_progress', lastModified: '2024-01-15' },
        ]
      },
      {
        id: '1-3',
        name: 'Modules',
        type: 'folder',
        children: [
          { id: '1-3-1', name: 'Login Module', type: 'module', lastModified: '2024-01-12' },
          { id: '1-3-2', name: 'Payment Module', type: 'module', lastModified: '2024-01-13' },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Banking Application RTB',
    description: 'Risk-based testing for core banking transactions',
    lastModified: '2024-01-14T09:15:00Z',
    testCases: 156,
    testSuites: 8,
    executionRuns: 856,
    successRate: 98.2,
    owner: 'Sarah Chen',
    status: 'active',
    folderStructure: [
      {
        id: '2-1',
        name: 'Risk Assessments',
        type: 'folder',
        children: [
          { 
            id: '2-1-1', 
            name: 'High Risk Transactions', 
            type: 'testsuite', 
            status: 'passed', 
            lastModified: '2024-01-14',
            children: [
              { id: '2-1-1-1', name: 'Large Wire Transfer', type: 'testcase', status: 'passed', lastModified: '2024-01-14' },
              { id: '2-1-1-2', name: 'International Payment', type: 'testcase', status: 'passed', lastModified: '2024-01-14' },
              { id: '2-1-1-3', name: 'Account Closure', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
            ]
          },
          { 
            id: '2-1-2', 
            name: 'Medium Risk Transactions', 
            type: 'testsuite', 
            status: 'not_run', 
            lastModified: '2024-01-13',
            children: [
              { id: '2-1-2-1', name: 'Balance Inquiry', type: 'testcase', status: 'not_run', lastModified: '2024-01-13' },
              { id: '2-1-2-2', name: 'Bill Payment', type: 'testcase', status: 'not_run', lastModified: '2024-01-13' },
            ]
          },
          { 
            id: '2-1-3', 
            name: 'Low Risk Transactions', 
            type: 'testsuite', 
            status: 'in_progress', 
            lastModified: '2024-01-15',
            children: [
              { id: '2-1-3-1', name: 'Statement Download', type: 'testcase', status: 'passed', lastModified: '2024-01-14' },
              { id: '2-1-3-2', name: 'Address Update', type: 'testcase', status: 'in_progress', lastModified: '2024-01-15' },
            ]
          }
        ]
      },
      {
        id: '2-2',
        name: 'Compliance Tests',
        type: 'folder',
        children: [
          { 
            id: '2-2-1', 
            name: 'KYC Validation', 
            type: 'testsuite', 
            status: 'passed', 
            lastModified: '2024-01-12',
            children: [
              { id: '2-2-1-1', name: 'Customer Verification', type: 'testcase', status: 'passed', lastModified: '2024-01-12' },
              { id: '2-2-1-2', name: 'Document Upload', type: 'testcase', status: 'passed', lastModified: '2024-01-12' },
            ]
          },
          { 
            id: '2-2-2', 
            name: 'AML Checks', 
            type: 'testsuite', 
            status: 'passed', 
            lastModified: '2024-01-13',
            children: [
              { id: '2-2-2-1', name: 'Transaction Monitoring', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
              { id: '2-2-2-2', name: 'Suspicious Activity', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
            ]
          }
        ]
      },
      {
        id: '2-3',
        name: 'Banking Modules',
        type: 'folder',
        children: [
          { id: '2-3-1', name: 'Account Management', type: 'module', lastModified: '2024-01-10' },
          { id: '2-3-2', name: 'Transaction Processing', type: 'module', lastModified: '2024-01-11' },
          { id: '2-3-3', name: 'Reporting Engine', type: 'module', lastModified: '2024-01-09' },
        ]
      },
      {
        id: '2-4',
        name: 'Requirements',
        type: 'folder',
        children: [
          { id: '2-4-1', name: 'BRD-001: Core Banking', type: 'requirement', lastModified: '2024-01-08' },
          { id: '2-4-2', name: 'BRD-002: Risk Management', type: 'requirement', lastModified: '2024-01-08' },
          { id: '2-4-3', name: 'BRD-003: Compliance', type: 'requirement', lastModified: '2024-01-09' },
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Healthcare Portal Testing',
    description: 'Patient management and appointment scheduling',
    lastModified: '2024-01-12T16:45:00Z',
    testCases: 189,
    testSuites: 12,
    executionRuns: 945,
    successRate: 94.8,
    owner: 'Michael Rodriguez',
    status: 'active',
    folderStructure: [
      {
        id: '3-1',
        name: 'Patient Modules',
        type: 'folder',
        children: [
          { id: '3-1-1', name: 'Registration Flow', type: 'testcase', status: 'passed', lastModified: '2024-01-12' },
          { id: '3-1-2', name: 'Appointment Booking', type: 'testcase', status: 'failed', lastModified: '2024-01-12' },
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Legacy Migration Project',
    description: 'Testing for mainframe to cloud migration',
    lastModified: '2024-01-10T11:20:00Z',
    testCases: 312,
    testSuites: 18,
    executionRuns: 567,
    successRate: 91.3,
    owner: 'David Wilson',
    status: 'maintenance',
    folderStructure: []
  },
  {
    id: '5',
    name: 'Mobile App Automation',
    description: 'Cross-platform mobile application testing',
    lastModified: '2024-01-08T13:10:00Z',
    testCases: 178,
    testSuites: 10,
    executionRuns: 723,
    successRate: 97.1,
    owner: 'Emma Thompson',
    status: 'active',
    folderStructure: []
  },
  {
    id: '6',
    name: 'API Integration Suite',
    description: 'REST API validation and integration testing',
    lastModified: '2024-01-05T15:40:00Z',
    testCases: 267,
    testSuites: 14,
    executionRuns: 1124,
    successRate: 99.2,
    owner: 'Robert Kim',
    status: 'archived',
    folderStructure: []
  },
];