'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Cpu, 
  Settings, 
  BarChart3,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  Folder
} from 'lucide-react';
import { SidebarItem } from '@/types';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter();

  const handleNavigation = (id: string) => {
    setActiveItem(id);
    
    switch(id) {
      case 'dashboard':
        router.push('/');
        break;
      case 'projects':
        router.push('/projects');
        break;
      case 'e2e':
        alert('Navigating to E2E Testing page... (Page will be implemented separately)');
        break;
      case 'rtb':
        alert('Navigating to RTB Testing page... (Page will be implemented separately)');
        break;
      case 'analytics':
        alert('Navigating to Analytics page...');
        break;
      case 'reports':
        alert('Navigating to Reports page...');
        break;
      case 'team':
        alert('Navigating to Team page...');
        break;
      case 'settings':
        alert('Navigating to Settings page...');
        break;
      default:
        router.push('/');
    }
  };

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Folder size={20} /> },
    { id: 'e2e', label: 'E2E Testing', icon: <Zap size={20} /> },
    { id: 'rtb', label: 'RTB Testing', icon: <Cpu size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
    { id: 'team', label: 'Team', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`
      flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black border-r border-gray-800
      transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} sticky top-0
    `}>
      <div className="p-6 border-b border-gray-800">
        <button 
          onClick={() => handleNavigation('dashboard')}
          className="flex items-center space-x-3 w-full hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-blue-500 rounded-lg">
            <Home size={24} className="text-white" />
          </div>
          {!collapsed && (
            <div className="text-left">
              <h1 className="text-xl font-bold text-white">Tricentis</h1>
              <p className="text-sm text-gray-400">TOSCA Dashboard</p>
            </div>
          )}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${activeItem === item.id 
                    ? 'bg-blue-500/20 text-blue-400 border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="ml-2">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;