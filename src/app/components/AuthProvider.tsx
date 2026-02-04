// app/components/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, CreateUserData, UpdateUserData, Company } from '../../types/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, companyName: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  // Admin functions
  getUsers: () => User[];
  createUser: (userData: CreateUserData) => Promise<{ success: boolean; message: string }>;
  updateUser: (userId: string, updates: UpdateUserData) => Promise<{ success: boolean; message: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; message: string }>;
  toggleUserStatus: (userId: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial users for demo
const initialUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'System Admin',
    role: 'admin',
    password: 'admin123',
    companyId: 'company-1',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: 'dev-1',
    email: 'john@example.com',
    name: 'John Developer',
    role: 'developer',
    password: 'password123',
    companyId: 'company-1',
    createdAt: new Date('2024-01-15'),
    isActive: true,
  },
  {
    id: 'tester-1',
    email: 'jane@example.com',
    name: 'Jane Tester',
    role: 'tester',
    password: 'password123',
    companyId: 'company-1',
    createdAt: new Date('2024-02-01'),
    isActive: true,
  },
  {
    id: 'org-1',
    email: 'contact@acme.com',
    name: 'Acme Corporation',
    role: 'organization',
    password: 'password123',
    companyId: 'company-1',
    organization: 'Acme Corporation',
    createdAt: new Date('2024-02-15'),
    isActive: true,
  }
];

const initialCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'Demo Corporation',
    adminId: 'admin-1',
    createdAt: new Date(),
    isActive: true,
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const isAdmin = user?.role === 'admin';

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = users.find(u => 
      u.email === email && 
      u.password === password && 
      u.isActive
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true, message: 'Login successful' };
    }
    
    setIsLoading(false);
    return { success: false, message: 'Invalid credentials or user inactive' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string, companyName: string) => {
    setIsLoading(true);
    
    // Check if this is the first registration (should be admin)
    const userCount = users.length;
    
    if (userCount > 1) { // More than initial admin exists
      setIsLoading(false);
      return { 
        success: false, 
        message: 'Only initial admin registration is allowed. Please contact your company admin for access.' 
      };
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      setIsLoading(false);
      return { success: false, message: 'Email already exists' };
    }
    
    // Create new admin user and company
    const newCompany: Company = {
      id: `company-${Date.now()}`,
      name: companyName,
      adminId: `user-${Date.now()}`,
      createdAt: new Date(),
      isActive: true,
    };
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'admin',
      password,
      companyId: newCompany.id,
      createdAt: new Date(),
      isActive: true,
    };
    
    setCompanies([...companies, newCompany]);
    setUsers([...users, newUser]);
    
    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    return { success: true, message: 'Registration successful! Welcome admin.' };
  };

  // Admin functions
 const getUsers = (): User[] => {
  // Return all users including their passwords for admin editing
  return users.map(user => ({
    ...user,
    // Ensure password is included
    password: user.password || ""
  }));
};

  const createUser = async (userData: CreateUserData): Promise<{ success: boolean; message: string }> => {
    if (!isAdmin) {
      return { success: false, message: 'Unauthorized' };
    }

    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: userData.password,
      companyId: user?.companyId || 'company-1',
      organization: userData.organization,
      createdAt: new Date(),
      isActive: true,
    };

    setUsers([...users, newUser]);
    return { success: true, message: 'User created successfully' };
  };

  const updateUser = async (userId: string, updates: UpdateUserData): Promise<{ success: boolean; message: string }> => {
    if (!isAdmin) {
      return { success: false, message: 'Unauthorized' };
    }

    // Prevent updating the current admin's role or status
    if (userId === user?.id && (updates.role !== undefined || updates.isActive !== undefined)) {
      return { success: false, message: 'Cannot modify your own role or status' };
    }

    setUsers(users.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    ));
    
    return { success: true, message: 'User updated successfully' };
  };

  const deleteUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
    if (!isAdmin) {
      return { success: false, message: 'Unauthorized' };
    }

    // Prevent deleting self or initial admin
    if (userId === user?.id) {
      return { success: false, message: 'Cannot delete your own account' };
    }

    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete?.role === 'admin') {
      return { success: false, message: 'Cannot delete admin users' };
    }

    setUsers(users.filter(u => u.id !== userId));
    return { success: true, message: 'User deleted successfully' };
  };

  const toggleUserStatus = async (userId: string): Promise<{ success: boolean; message: string }> => {
    if (!isAdmin) {
      return { success: false, message: 'Unauthorized' };
    }

    // Prevent toggling own status
    if (userId === user?.id) {
      return { success: false, message: 'Cannot change your own status' };
    }

    const userToToggle = users.find(u => u.id === userId);
    if (!userToToggle) {
      return { success: false, message: 'User not found' };
    }

    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    );
    
    setUsers(updatedUsers);
    return { 
      success: true, 
      message: `User ${userToToggle.isActive ? 'deactivated' : 'activated'} successfully` 
    };
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isLoading,
    isAuthenticated: !!user,
    isAdmin,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}