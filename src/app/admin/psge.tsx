'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import AdminPanel from '../components/AdminPanel';
import MainLayout from '../components/MainLayout';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <MainLayout>
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Shield className="text-purple-500" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage users and company settings
              </p>
            </div>
          </div>
        </div>
        
        <AdminPanel />
      </MainLayout>
    </ProtectedRoute>
  );
}