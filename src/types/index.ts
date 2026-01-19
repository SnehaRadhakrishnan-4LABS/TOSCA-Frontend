export interface TestData {
  id: string;
  name: string;
  type: 'e2e' | 'rtb';
  status: 'passed' | 'failed' | 'running' | 'pending';
  executionTime: number;
  lastRun: string;
  successRate: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

export interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'e2e' | 'rtb';
  metrics: {
    label: string;
    value: string | number;
    change?: number;
  }[];
  onClick: () => void;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'testcase' | 'testsuite' | 'module' | 'requirement';
  children?: FolderItem[];
  lastModified?: string;
  status?: 'passed' | 'failed' | 'not_run' | 'in_progress';
}

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

// Add these to existing types

export interface ProjectDetails extends Project {
  createdDate: string;
  teamMembers: string[];
  technologies: string[];
  dependencies: string[];
  recentActivity: Activity[];
  testCoverage: TestCoverage;
  executionHistory: ExecutionHistory[];
  requirements: Requirement[];
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  icon: string;
}

export interface TestCoverage {
  totalRequirements: number;
  coveredRequirements: number;
  coveragePercentage: number;
  byModule: ModuleCoverage[];
}

export interface ModuleCoverage {
  name: string;
  covered: number;
  total: number;
  percentage: number;
}

export interface ExecutionHistory {
  id: string;
  date: string;
  totalTests: number;
  passed: number;
  failed: number;
  duration: number;
  status: 'passed' | 'failed' | 'partial';
}

export interface Requirement {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'implemented' | 'in_progress' | 'pending';
  testCases: string[];
}