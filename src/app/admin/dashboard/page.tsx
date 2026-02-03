'use client';

import React from 'react';
import AdminRoute from '@/app/components/AdminRoute';
import AdminLayout from '@/app/components/Admin/AdminLayout';
import UserManagement from '@/app/components/Admin/UserManagement';

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <AdminLayout title="User Management">
        <UserManagement />
      </AdminLayout>
    </AdminRoute>
  );
}