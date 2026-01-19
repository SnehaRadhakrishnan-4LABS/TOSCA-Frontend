'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Folder, FolderOpen, FileText, Play, Wrench, Activity,
  Users, Calendar, Clock, CheckCircle, XCircle, AlertCircle,
  BarChart3, PieChart, TrendingUp, Download, Share2, Edit,
  Settings, MoreVertical, ChevronRight, ChevronDown, Star,
  Shield, Database, Cpu, Zap, Globe, Code
} from 'lucide-react';
import { projectDetails } from '@/data/projectDetailsData';
import ProjectCharts from '@/components/charts/ProjectCharts';

interface ProjectDetailsPageProps {
  projectId: string;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ projectId }) => {
  const router = useRouter();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1-1', '1-2', '1-3', '1-4']));
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'analytics' | 'team'>('overview');

  const project = projectDetails[projectId];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Project Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The project you're looking for doesn't exist.
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const toggleFolder = (folderId: string) => {
    console.log('Toggling folder:', folderId);
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolderItem = (item: any, depth = 0) => {
    const isExpanded = expandedFolders.has(item.id);
    
    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors ${
            depth > 0 ? `ml-${depth * 4}` : ''
          }`}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Clicked item:', item.id, 'has children:', !!item.children);
            if (item.children && item.children.length > 0) {
              toggleFolder(item.id);
            }
          }}
          style={{ marginLeft: `${depth * 24}px` }}
        >
          <div className="flex items-center flex-1 min-w-0">
            {item.children && item.children.length > 0 ? (
              <div className="mr-3">
                {isExpanded ? 
                  <ChevronDown size={18} className="text-gray-500" /> : 
                  <ChevronRight size={18} className="text-gray-500" />
                }
              </div>
            ) : (
              <div className="w-7 mr-3" />
            )}
            
            <div className="mr-3">
              {item.type === 'folder' ? (
                isExpanded ? 
                  <FolderOpen size={20} className="text-blue-500" /> : 
                  <Folder size={20} className="text-blue-400" />
              ) : item.type === 'testcase' ? (
                <FileText size={20} className="text-green-500" />
              ) : item.type === 'testsuite' ? (
                <Play size={20} className="text-purple-500" />
              ) : item.type === 'module' ? (
                <Wrench size={20} className="text-yellow-500" />
              ) : item.type === 'requirement' ? (
                <Shield size={20} className="text-orange-500" />
              ) : (
                <Activity size={20} className="text-orange-500" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <span className="truncate font-medium text-gray-800 dark:text-gray-200">
                  {item.name}
                </span>
                
                {item.status && (
                  <div className="ml-3">
                    {item.status === 'passed' && (
                      <CheckCircle size={16} className="text-green-500" />
                    )}
                    {item.status === 'failed' && (
                      <XCircle size={16} className="text-red-500" />
                    )}
                    {item.status === 'in_progress' && (
                      <Clock size={16} className="text-blue-500" />
                    )}
                    {item.status === 'not_run' && (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                    )}
                  </div>
                )}
              </div>
              
              {item.type !== 'folder' && (
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.type === 'testcase' ? 'bg-green-500/20 text-green-600' :
                    item.type === 'testsuite' ? 'bg-purple-500/20 text-purple-600' :
                    item.type === 'module' ? 'bg-yellow-500/20 text-yellow-600' :
                    item.type === 'requirement' ? 'bg-orange-500/20 text-orange-600' :
                    'bg-orange-500/20 text-orange-600'
                  }`}>
                    {item.type}
                  </span>
                  {item.lastModified && (
                    <span className="text-xs text-gray-500 ml-3">
                      Modified: {item.lastModified}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {isExpanded && item.children && item.children.length > 0 && (
          <div className="mt-1">
            {item.children.map((child: any) => renderFolderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'low': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-4">
      <div className="glassmorphism rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FolderOpen size={32} className="text-blue-500" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {project.name}
                  </h1>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{project.owner}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Created: {new Date(project.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Updated: {new Date(project.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Star size={20} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Edit size={20} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Share2 size={20} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <BarChart3 size={18} className="inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'structure'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Folder size={18} className="inline mr-2" />
            Structure
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <TrendingUp size={18} className="inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'team'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Users size={18} className="inline mr-2" />
            Team
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Project Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {project.testCases}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Test Cases</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {project.testSuites}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Test Suites</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {project.executionRuns}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Executions</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {project.successRate}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Recent Activity
                </h2>
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {project.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Activity size={18} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800 dark:text-white">
                          {activity.user}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Requirements Coverage
              </h2>
              <div className="space-y-4">
                {project.requirements.map((req) => (
                  <div key={req.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {req.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                        {req.priority.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {req.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        req.status === 'implemented' ? 'bg-green-500/20 text-green-600' :
                        req.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-600' :
                        'bg-gray-500/20 text-gray-600'
                      }`}>
                        {req.status.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {req.testCases.length} test cases
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProjectCharts
              executionHistory={project.executionHistory}
              testCoverage={project.testCoverage}
              testCases={project.testCases}
              successRate={project.successRate}
            />
          </div>
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="glassmorphism rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              TOSCA Project Structure
            </h2>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  const allIds = new Set<string>();
                  const collectIds = (items: any[]) => {
                    items.forEach(item => {
                      if (item.children && item.children.length > 0) {
                        allIds.add(item.id);
                        collectIds(item.children);
                      }
                    });
                  };
                  collectIds(project.folderStructure);
                  setExpandedFolders(allIds);
                }}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Expand All
              </button>
              <button 
                onClick={() => setExpandedFolders(new Set())}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-300 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <FolderOpen size={24} className="text-blue-500 mr-3" />
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete TOSCA Commander Structure
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto p-4">
              {project.folderStructure.map(item => renderFolderItem(item))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    {project.folderStructure.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Main Folders</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    {project.testCases}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Test Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    {project.testSuites}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Test Suites</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    4
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Module Types</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Detailed Execution History
              </h2>
              <div className="space-y-4">
                {project.executionHistory.map((exec) => (
                  <div key={exec.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Calendar size={20} className="text-gray-500" />
                        <span className="font-medium text-gray-800 dark:text-white">
                          {new Date(exec.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exec.status === 'passed' ? 'bg-green-500/20 text-green-600' :
                        exec.status === 'failed' ? 'bg-red-500/20 text-red-600' :
                        'bg-yellow-500/20 text-yellow-600'
                      }`}>
                        {exec.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {exec.passed}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Passed</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {exec.failed}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {exec.duration}m
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(exec.passed / exec.totalTests) * 100}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-2">
                      {((exec.passed / exec.totalTests) * 100).toFixed(1)}% Success Rate
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Comprehensive Test Coverage
              </h2>
              <div className="space-y-6">
                {project.testCoverage.byModule.map((module, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Folder size={20} className="text-blue-500" />
                        <span className="font-medium text-gray-800 dark:text-white">
                          {module.name}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-800 dark:text-white">
                        {module.percentage}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{module.covered} of {module.total} requirements covered</span>
                      <span>{module.total - module.covered} remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          module.percentage >= 90 ? 'bg-green-500' :
                          module.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${module.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">
                      Overall Test Coverage
                    </div>
                    <div className="text-blue-100 text-sm">
                      Requirements covered by automated tests
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white">
                    {project.testCoverage.coveragePercentage}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProjectCharts
              executionHistory={project.executionHistory}
              testCoverage={project.testCoverage}
              testCases={project.testCases}
              successRate={project.successRate}
            />
            
            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-4">
                Dependencies
              </h2>
              <div className="space-y-2">
                {project.dependencies.map((dep, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Database size={16} className="mr-3 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{dep}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Team Members
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.teamMembers.map((member, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          {member}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {index === 0 ? 'Project Owner' : 'QA Engineer'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Message
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm">
                        Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Team Activity Timeline
              </h2>
              <div className="space-y-4">
                {project.recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {index < project.recentActivity.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 mt-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800 dark:text-white">
                            {activity.user}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Team Statistics
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {project.teamMembers.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {project.recentActivity.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recent Activities</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {project.executionRuns}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Executions</div>
                </div>
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <Users size={18} className="mr-2" />
                  Invite Team Member
                </button>
                <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  Export Team Report
                </button>
                <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center">
                  <BarChart3 size={18} className="mr-2" />
                  Generate Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;