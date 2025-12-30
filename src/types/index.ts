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