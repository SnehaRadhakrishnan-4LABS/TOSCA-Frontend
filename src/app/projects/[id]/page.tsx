'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import MainLayout from '../../components/MainLayout';
import ProjectDetailsPage from '@/app/components/ProjectDetailsPage';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetails({ params }: PageProps) {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ProjectDetailsPage projectId={params.id} />
      </MainLayout>
    </ProtectedRoute>
  );
}