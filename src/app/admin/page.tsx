// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../components/AuthProvider';
// import ProtectedRoute from '../components/ProtectedRoute';
// import AdminLayout from '../components/Admin/AdminLayout';
// import UserManagement from '../components/Admin/UserManagement';

// export default function AdminPage() {
//   const { user, isAuthenticated } = useAuth();
//   const router = useRouter();

//   // Check if user is already authenticated but not admin
//   useEffect(() => {
//     if (isAuthenticated && user && user.role !== 'admin') {
//       // Redirect non-admin users to admin login
//       router.push('/admin/login?redirect=/admin');
//     }
//   }, [user, isAuthenticated, router]);

//   // If not authenticated at all, redirect to admin login
//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/admin/login?redirect=/admin');
//     }
//   }, [isAuthenticated, router]);

//   // Show nothing while checking
//   if (!user || user.role !== 'admin') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={['admin']}>
//       <AdminLayout title="User Management">
//         <UserManagement />
//       </AdminLayout>
//     </ProtectedRoute>
//   );
// }


'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/Admin/AdminLayout';
import UserManagement from '../components/Admin/UserManagement';

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // ALWAYS redirect to admin login, regardless of current user role
  useEffect(() => {
    if (!isAuthenticated) {
      // Not logged in at all, go to admin login
      router.push('/admin/login?redirect=/admin');
    } else {
      // Even if logged in, force admin re-authentication
      router.push('/admin/login?redirect=/admin');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  );
}