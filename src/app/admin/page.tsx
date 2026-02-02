// src/app/admin/page.tsx
'use client';

import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/Admin/AdminLayout';
import UserManagement from '../components/Admin/UserManagement';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminLayout title="User Management">
        <UserManagement />
      </AdminLayout>
    </ProtectedRoute>
  );
}