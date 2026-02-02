// 'use client';

// import React, { useState } from 'react';
// import { Bell, Search, User, LogOut, Shield, Home } from 'lucide-react';
// import { useAuth } from './AuthProvider';
// import { useRouter } from 'next/navigation';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   const handleAdminClick = () => {
//     router.push('/admin');
//     setShowUserMenu(false);
//   };

//   const handleNavigation = (path: string) => {
//     router.push(path);
//     setShowUserMenu(false);
//   };

//   return (
//     <header className="sticky top-0 z-10 glassmorphism border-b border-gray-200 dark:border-gray-800">
//       <div className="flex items-center justify-between p-4">
//         {/* Search Bar */}
//         <div className="flex-1 max-w-xl">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search tests, projects, or users..."
//               className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//             />
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center space-x-4">
//           {/* Notifications */}
//           <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
//             <Bell size={22} />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* User Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center space-x-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
//             >
//               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                 <User size={20} className="text-white" />
//               </div>
//               <div className="text-left hidden md:block">
//                 <p className="font-medium text-gray-800 dark:text-white">
//                   {user?.name || 'Guest'}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Role'}
//                 </p>
//               </div>
//             </button>

//             {showUserMenu && user && (
//               <div className="absolute right-0 mt-2 w-48 glassmorphism rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
//                 <div className="p-4 border-b border-gray-200 dark:border-gray-800">
//                   <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
//                   <span className={`
//                     inline-block mt-2 px-2 py-1 text-xs rounded-full
//                     ${user.role === 'admin' 
//                       ? 'bg-purple-500/20 text-purple-400' 
//                       : user.role === 'developer'
//                       ? 'bg-blue-500/20 text-blue-400'
//                       : 'bg-green-500/20 text-green-400'
//                     }
//                   `}>
//                     {user.role}
//                   </span>
//                 </div>
                
//                 {/* Dashboard Button */}
//                 <button
//                   onClick={() => handleNavigation('/dashboard')}
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <Home size={18} />
//                   <span>Dashboard</span>
//                 </button>
                
//                 {/* Admin Panel Button (only for admin users) */}
//                 {user.role === 'admin' && (
//                 <button
//                   onClick={() => router.push('/admin')}
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <Shield size={18} />
//                   <span>Admin Panel</span>
//                 </button>
//               )}
                
//                 {/* Logout Button */}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                 >
//                   <LogOut size={18} />
//                   <span>Sign Out</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

'use client';

import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Shield, Home } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAdminClick = () => {
    router.push('/admin');
    setShowUserMenu(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-10 glassmorphism border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between p-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tests, projects, or users..."
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user?.name || 'Guest'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Role'}
                </p>
              </div>
            </button>

            {showUserMenu && user && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-lg bg-white/95 dark:bg-gray-900/95">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80">
                  <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  <span className={`
                    inline-block mt-2 px-2 py-1 text-xs rounded-full
                    ${user.role === 'admin' 
                      ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' 
                      : user.role === 'developer'
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      : 'bg-green-500/20 text-green-600 dark:text-green-400'
                    }
                  `}>
                    {user.role}
                  </span>
                </div>
                
                {/* Dashboard Button */}
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 transition-colors"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </button>
                
                {/* Admin Panel Button (only for admin users) */}
                {user.role === 'admin' && (
                  <button
                    onClick={handleAdminClick}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 transition-colors"
                  >
                    <Shield size={18} />
                    <span>Admin Panel</span>
                  </button>
                )}
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 bg-white/80 dark:bg-gray-800/80 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;