'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { UserRole } from '../../types/users';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push('/login');
  //   }
    
  //   if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.role)) {
  //     router.push('/dashboard');
  //   }
  // }, [user, isLoading, isAuthenticated, router, allowedRoles]);
  useEffect(() => {
  if (!isLoading && !isAuthenticated) {
    router.push('/login');
  }
  
  if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect non-admin users trying to access admin panel to dashboard
    if (window.location.pathname.startsWith('/admin')) {
      router.push('/dashboard');
    }
  }
}, [user, isLoading, isAuthenticated, router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}