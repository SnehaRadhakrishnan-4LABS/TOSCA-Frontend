'use client';

import { useState } from 'react';
import { UserRole, User } from '@/types/users';
import { Plus, Edit2, Trash2, User as UserIcon, Mail, Shield, Building } from 'lucide-react';

// Mock data - in production, this will come from backend
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'developer@example.com',
    name: 'John Developer',
    role: 'developer',
    companyId: 'company-1',
    createdAt: new Date('2024-01-15'),
    isActive: true,
  },
  {
    id: 'user-2',
    email: 'tester@example.com',
    name: 'Jane Tester',
    role: 'tester',
    companyId: 'company-1',
    createdAt: new Date('2024-01-20'),
    isActive: true,
  },
];

export default function AdminPanel() {
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'developer' as UserRole,
  });

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return;

    const newUser: User = {
      id: `user-${Date.now()}`,
      ...formData,
      companyId: 'company-1',
      createdAt: new Date(),
      isActive: true,
    };

    setUsers([...users, newUser]);
    setFormData({ name: '', email: '', role: 'developer' });
    setShowAddModal(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowAddModal(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    setUsers(users.map(u => 
      u.id === editingUser.id 
        ? { ...u, ...formData }
        : u
    ));
    
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'developer' });
    setShowAddModal(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, isActive: !u.isActive }
        : u
    ));
  };

  return (
    <div className="space-y-6">
      <div className="glassmorphism rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              User Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage users, roles, and permissions for your company
            </p>
          </div>
          
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: '', email: '', role: 'developer' });
              setShowAddModal(true);
            }}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors hover-glow"
          >
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glassmorphism-dark rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <UserIcon className="text-blue-400" size={24} />
            </div>
          </div>
          
          <div className="glassmorphism-dark rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Developers</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'developer').length}
                </p>
              </div>
              <Shield className="text-green-400" size={24} />
            </div>
          </div>
          
          <div className="glassmorphism-dark rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Testers</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'tester').length}
                </p>
              </div>
              <UserIcon className="text-purple-400" size={24} />
            </div>
          </div>
          
          <div className="glassmorphism-dark rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.isActive).length}
                </p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Name</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Role</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <UserIcon size={16} className="text-blue-500" />
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : user.role === 'developer'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                      }
                    `}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${user.isActive
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }
                      `}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glassmorphism rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="user@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="developer">Developer</option>
                    <option value="tester">Tester</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Company Settings */}
      <div className="glassmorphism rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Building className="text-blue-500" size={24} />
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Company Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your company information
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="Demo Corporation"
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors hover-glow">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}