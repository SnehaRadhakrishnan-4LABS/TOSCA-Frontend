export type UserRole = 'admin' | 'developer' | 'tester' | 'organization';

export interface User {
  // id: string;
  // email: string;
  // name: string;
  // role: UserRole;
  // companyId?: string;
  // createdAt: Date;
  // isActive: boolean;
   id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string; // Only for creation/update, not for display
  companyId: string;
  organization?: string;
  createdAt: Date | string;
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

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  organization?: string;
  isActive?: boolean;
}