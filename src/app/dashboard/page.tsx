'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../components/MainLayout';
import MainDashboard from '../components/MainDashboard';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <MainDashboard />
      </MainLayout>
    </ProtectedRoute>
  );
}