import { ProjectDetails, Activity, TestCoverage, ExecutionHistory, Requirement } from '@/types';

export const projectDetails: Record<string, ProjectDetails> = {
  '1': {
    id: '1',
    name: 'E-Commerce Platform Testing',
    description: 'End-to-end testing for online shopping platform with comprehensive test coverage',
    lastModified: '2024-01-15T14:30:00Z',
    createdDate: '2023-11-01T09:00:00Z',
    testCases: 245,
    testSuites: 15,
    executionRuns: 1248,
    successRate: 96.5,
    owner: 'Alex Johnson',
    status: 'active',
    teamMembers: ['Alex Johnson', 'Sarah Chen', 'Michael Rodriguez', 'Emma Thompson'],
    technologies: ['TOSCA 14.2', 'SAP', 'Salesforce', 'Java', 'SQL Server'],
    dependencies: ['Payment Gateway API', 'Inventory Management System', 'CRM System'],
    
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
              { id: '1-1-1-4', name: 'Order Confirmation', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
              { id: '1-1-1-5', name: 'Shipping Calculation', type: 'testcase', status: 'failed', lastModified: '2024-01-12' },
            ]
          },
          {
            id: '1-1-2',
            name: 'Product Management',
            type: 'folder',
            children: [
              { id: '1-1-2-1', name: 'Add Product', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
              { id: '1-1-2-2', name: 'Update Product', type: 'testcase', status: 'passed', lastModified: '2024-01-13' },
              { id: '1-1-2-3', name: 'Delete Product', type: 'testcase', status: 'passed', lastModified: '2024-01-12' },
              { id: '1-1-2-4', name: 'Product Search', type: 'testcase', status: 'passed', lastModified: '2024-01-14' },
            ]
          },
          {
            id: '1-1-3',
            name: 'User Management',
            type: 'folder',
            children: [
              { id: '1-1-3-1', name: 'User Registration', type: 'testcase', status: 'passed', lastModified: '2024-01-10' },
              { id: '1-1-3-2', name: 'Login/Logout', type: 'testcase', status: 'passed', lastModified: '2024-01-11' },
              { id: '1-1-3-3', name: 'Profile Update', type: 'testcase', status: 'in_progress', lastModified: '2024-01-15' },
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
          { id: '1-2-3', name: 'Integration Suite', type: 'testsuite', status: 'passed', lastModified: '2024-01-14' },
          { id: '1-2-4', name: 'Performance Suite', type: 'testsuite', status: 'not_run', lastModified: '2024-01-10' },
        ]
      },
      {
        id: '1-3',
        name: 'Modules',
        type: 'folder',
        children: [
          { id: '1-3-1', name: 'Login Module', type: 'module', lastModified: '2024-01-12' },
          { id: '1-3-2', name: 'Payment Module', type: 'module', lastModified: '2024-01-13' },
          { id: '1-3-3', name: 'Cart Module', type: 'module', lastModified: '2024-01-11' },
          { id: '1-3-4', name: 'Inventory Module', type: 'module', lastModified: '2024-01-10' },
        ]
      },
      {
        id: '1-4',
        name: 'Requirements',
        type: 'folder',
        children: [
          { id: '1-4-1', name: 'BRD-001: User Authentication', type: 'requirement', lastModified: '2024-01-08' },
          { id: '1-4-2', name: 'BRD-002: Checkout Process', type: 'requirement', lastModified: '2024-01-08' },
          { id: '1-4-3', name: 'BRD-003: Payment Integration', type: 'requirement', lastModified: '2024-01-09' },
        ]
      }
    ],
    
    recentActivity: [
      { id: 'a1', user: 'Alex Johnson', action: 'Updated Payment Processing test case', timestamp: '2024-01-15T14:30:00Z', icon: 'edit' },
      { id: 'a2', user: 'Sarah Chen', action: 'Executed Smoke Test Suite', timestamp: '2024-01-15T11:20:00Z', icon: 'play' },
      { id: 'a3', user: 'Michael Rodriguez', action: 'Added new test case for User Registration', timestamp: '2024-01-14T16:45:00Z', icon: 'add' },
      { id: 'a4', user: 'Emma Thompson', action: 'Fixed failing Order Confirmation test', timestamp: '2024-01-14T10:15:00Z', icon: 'check' },
      { id: 'a5', user: 'Alex Johnson', action: 'Updated project documentation', timestamp: '2024-01-13T15:30:00Z', icon: 'document' },
    ],
    
    testCoverage: {
      totalRequirements: 156,
      coveredRequirements: 148,
      coveragePercentage: 94.9,
      byModule: [
        { name: 'Checkout Flow', covered: 45, total: 48, percentage: 93.8 },
        { name: 'Product Management', covered: 38, total: 40, percentage: 95.0 },
        { name: 'User Management', covered: 32, total: 35, percentage: 91.4 },
        { name: 'Payment Processing', covered: 33, total: 33, percentage: 100.0 },
      ]
    },
    
    executionHistory: [
      { id: 'e1', date: '2024-01-15', totalTests: 245, passed: 240, failed: 5, duration: 45, status: 'passed' },
      { id: 'e2', date: '2024-01-14', totalTests: 245, passed: 242, failed: 3, duration: 42, status: 'passed' },
      { id: 'e3', date: '2024-01-13', totalTests: 245, passed: 238, failed: 7, duration: 48, status: 'passed' },
      { id: 'e4', date: '2024-01-12', totalTests: 245, passed: 230, failed: 15, duration: 52, status: 'partial' },
      { id: 'e5', date: '2024-01-11', totalTests: 240, passed: 235, failed: 5, duration: 41, status: 'passed' },
    ],
    
    requirements: [
      { id: 'r1', name: 'User Authentication', description: 'Secure login and registration system', priority: 'high', status: 'implemented', testCases: ['1-1-3-1', '1-1-3-2'] },
      { id: 'r2', name: 'Checkout Process', description: 'Complete online purchase flow', priority: 'high', status: 'implemented', testCases: ['1-1-1-1', '1-1-1-2', '1-1-1-3'] },
      { id: 'r3', name: 'Payment Integration', description: 'Multiple payment methods support', priority: 'high', status: 'in_progress', testCases: ['1-1-1-3'] },
      { id: 'r4', name: 'Product Catalog', description: 'Browse and search products', priority: 'medium', status: 'implemented', testCases: ['1-1-2-4'] },
      { id: 'r5', name: 'Order Management', description: 'Track and manage orders', priority: 'medium', status: 'pending', testCases: [] },
    ]
  },
  '2': {
    id: '2',
    name: 'Banking Application RTB',
    description: 'Risk-based testing for core banking transactions with compliance validation',
    lastModified: '2024-01-14T09:15:00Z',
    createdDate: '2023-12-01T10:00:00Z',
    testCases: 156,
    testSuites: 8,
    executionRuns: 856,
    successRate: 98.2,
    owner: 'Sarah Chen',
    status: 'active',
    teamMembers: ['Sarah Chen', 'David Wilson', 'Robert Kim'],
    technologies: ['TOSCA 14.2', 'Mainframe', 'DB2', 'COBOL'],
    dependencies: ['Core Banking System', 'AML Database', 'Transaction Monitor'],
    
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
    ],
    
    recentActivity: [
      { id: 'b1', user: 'Sarah Chen', action: 'Updated AML compliance tests', timestamp: '2024-01-14T09:15:00Z', icon: 'edit' },
      { id: 'b2', user: 'David Wilson', action: 'Executed High Risk Transactions suite', timestamp: '2024-01-14T08:30:00Z', icon: 'play' },
      { id: 'b3', user: 'Robert Kim', action: 'Added new KYC validation test case', timestamp: '2024-01-12T14:20:00Z', icon: 'add' },
    ],
    
    testCoverage: {
      totalRequirements: 89,
      coveredRequirements: 85,
      coveragePercentage: 95.5,
      byModule: [
        { name: 'Risk Assessments', covered: 45, total: 48, percentage: 93.8 },
        { name: 'Compliance Tests', covered: 40, total: 41, percentage: 97.6 },
      ]
    },
    
    executionHistory: [
      { id: 'be1', date: '2024-01-14', totalTests: 156, passed: 154, failed: 2, duration: 28, status: 'passed' },
      { id: 'be2', date: '2024-01-13', totalTests: 156, passed: 152, failed: 4, duration: 30, status: 'passed' },
      { id: 'be3', date: '2024-01-12', totalTests: 156, passed: 155, failed: 1, duration: 25, status: 'passed' },
    ],
    
    requirements: [
      { id: 'br1', name: 'Risk Management', description: 'Identify and assess transaction risks', priority: 'high', status: 'implemented', testCases: ['2-1-1-1', '2-1-1-2'] },
      { id: 'br2', name: 'Compliance Validation', description: 'Ensure regulatory compliance', priority: 'high', status: 'implemented', testCases: ['2-2-1-1', '2-2-2-1'] },
      { id: 'br3', name: 'Transaction Security', description: 'Secure financial transactions', priority: 'high', status: 'in_progress', testCases: ['2-1-1-3'] },
    ]
  }
};