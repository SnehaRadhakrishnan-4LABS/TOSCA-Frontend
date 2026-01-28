'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../../types/users'; // Changed from '@/types/user'

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, companyName: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial admin user for demo (in production, this will come from backend)
const initialUsers = [
  {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'System Admin',
    role: 'admin' as UserRole,
    password: 'admin123', // In production, this should be hashed
    companyId: 'company-1',
    createdAt: new Date(),
    isActive: true,
  }
];

const initialCompanies = [
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
  const [users, setUsers] = useState<any[]>(initialUsers);
  const [companies, setCompanies] = useState<any[]>(initialCompanies);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

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
    const newCompany = {
      id: `company-${Date.now()}`,
      name: companyName,
      adminId: `user-${Date.now()}`,
      createdAt: new Date(),
      isActive: true,
    };
    
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'admin' as UserRole,
      password, // In production, hash this
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

  // Expose user management functions for admin
  const addUser = (userData: any) => {
    setUsers([...users, userData]);
  };

  const updateUser = (userId: string, updates: Partial<any>) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId && u.id !== 'admin-1')); // Protect initial admin
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading,
    isAuthenticated: !!user,
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