'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check for admin session
    const isAdminAuthenticated = sessionStorage.getItem('adminAuthenticated');
    
    if (!isAdminAuthenticated) {
      // Redirect to admin login
      router.push('/admin/login?redirect=/admin/dashboard');
    }
  }, [router]);

  // Check on render as well (for SSR/initial load)
  if (typeof window !== 'undefined') {
    const isAdminAuthenticated = sessionStorage.getItem('adminAuthenticated');
    
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      );
    }
  }

  return <>{children}</>;
}