'use client';

import ProjectDetailsPage from '@/app/components/ProjectDetailsPage';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetails({ params }: PageProps) {
  return <ProjectDetailsPage projectId={params.id} />;
}