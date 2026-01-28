export type UserRole = 'admin' | 'developer' | 'tester';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Company {
  id: string;
  name: string;
  adminId: string;
  createdAt: Date;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  companyName: string;
}