'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Filter, ChevronRight, ChevronDown, Folder, 
  FolderOpen, FileText, Play, CheckCircle, XCircle, 
  Clock, Archive, Wrench, Activity, Users, Calendar,
  Download, Share2, Star, MoreVertical, Trash2, Copy,
  Eye, PlayCircle
} from 'lucide-react';
import { projects, Project, FolderItem } from '@/data/projectsData';

const ToastNotification = ({ message, type = 'info', onClose }: {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  }[type];

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [notification, setNotification] = useState<{message: string; type: 'info' | 'success' | 'error' | 'warning'} | null>(null);
  const [testProgress, setTestProgress] = useState<number | null>(null);

  const showNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setNotification({ message, type });
  };

  const navigateToProjectDetails = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolderItem = (item: FolderItem, depth = 0) => {
    const isExpanded = expandedFolders.has(item.id);
    
    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer ${
            depth > 0 ? `ml-${depth * 4}` : ''
          }`}
          onClick={() => item.children && toggleFolder(item.id)}
          style={{ marginLeft: `${depth * 20}px` }}
        >
          <div className="flex items-center flex-1 min-w-0">
            {item.children ? (
              <div className="mr-2">
                {isExpanded ? 
                  <ChevronDown size={16} className="text-gray-500" /> : 
                  <ChevronRight size={16} className="text-gray-500" />
                }
              </div>
            ) : (
              <div className="w-6 mr-2" />
            )}
            
            <div className="mr-3">
              {item.type === 'folder' ? (
                isExpanded ? 
                  <FolderOpen size={18} className="text-blue-500" /> : 
                  <Folder size={18} className="text-blue-400" />
              ) : item.type === 'testcase' ? (
                <FileText size={18} className="text-green-500" />
              ) : item.type === 'testsuite' ? (
                <Play size={18} className="text-purple-500" />
              ) : item.type === 'module' ? (
                <Wrench size={18} className="text-yellow-500" />
              ) : (
                <Activity size={18} className="text-orange-500" />
              )}
            </div>
            
            <span className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
              {item.name}
            </span>
            
            {item.status && (
              <div className="ml-3">
                {item.status === 'passed' && (
                  <CheckCircle size={14} className="text-green-500" />
                )}
                {item.status === 'failed' && (
                  <XCircle size={14} className="text-red-500" />
                )}
                {item.status === 'in_progress' && (
                  <Clock size={14} className="text-blue-500" />
                )}
                {item.status === 'not_run' && (
                  <div className="w-3 h-3 rounded-full border border-gray-400" />
                )}
              </div>
            )}
          </div>
          
          {item.lastModified && (
            <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
              {item.lastModified}
            </span>
          )}
        </div>
        
        {isExpanded && item.children && (
          <div>
            {item.children.map(child => renderFolderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    const newExpanded = new Set(['root']);
    project.folderStructure.forEach(folder => {
      newExpanded.add(folder.id);
    });
    setExpandedFolders(newExpanded);
  };

  const getStatusIcon = (status: Project['status']) => {
    switch(status) {
      case 'active': return <Activity size={16} className="text-green-500" />;
      case 'archived': return <Archive size={16} className="text-gray-500" />;
      case 'maintenance': return <Wrench size={16} className="text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
      default: return '';
    }
  };

  const handleDownload = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    const projectData = JSON.stringify(selectedProject, null, 2);
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedProject.name.replace(/\s+/g, '_')}_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification(`Project "${selectedProject.name}" downloaded successfully!`, 'success');
  };

  const handleExport = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    const exportData = {
      projectName: selectedProject.name,
      exportDate: new Date().toISOString(),
      testCases: selectedProject.testCases,
      testSuites: selectedProject.testSuites,
      executionRuns: selectedProject.executionRuns,
      successRate: selectedProject.successRate,
      summary: `Export of ${selectedProject.name} completed on ${new Date().toLocaleDateString()}`
    };
    
    const csvContent = [
      ['Project Name', selectedProject.name],
      ['Export Date', new Date().toLocaleString()],
      ['Test Cases', selectedProject.testCases],
      ['Test Suites', selectedProject.testSuites],
      ['Execution Runs', selectedProject.executionRuns],
      ['Success Rate', `${selectedProject.successRate}%`],
      ['Owner', selectedProject.owner],
      ['Status', selectedProject.status],
      ['', ''],
      ['Folder Structure Summary:', ''],
    ];
    
    const addToCSV = (items: any[], depth = 0) => {
      items.forEach(item => {
        const indent = '  '.repeat(depth);
        csvContent.push([
          `${indent}${item.name}`,
          `${item.type} ${item.status ? `(${item.status})` : ''}`
        ]);
        if (item.children) {
          addToCSV(item.children, depth + 1);
        }
      });
    };
    
    addToCSV(selectedProject.folderStructure);
    
    const csv = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedProject.name.replace(/\s+/g, '_')}_export_${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification(`Export for "${selectedProject.name}" completed!`, 'success');
  };

  const handleShare = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    const shareData = {
      title: selectedProject.name,
      text: `Check out this TOSCA project: ${selectedProject.name}\n\nDescription: ${selectedProject.description}\n\nTest Cases: ${selectedProject.testCases}\nSuccess Rate: ${selectedProject.successRate}%`,
      url: window.location.href,
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => showNotification('Project shared successfully!', 'success'))
        .catch(error => showNotification('Error sharing project', 'error'));
    } else {
      const shareText = `${selectedProject.name}\n\nDescription: ${selectedProject.description}\n\nTest Cases: ${selectedProject.testCases}\nTest Suites: ${selectedProject.testSuites}\nExecution Runs: ${selectedProject.executionRuns}\nSuccess Rate: ${selectedProject.successRate}%\nOwner: ${selectedProject.owner}`;
      navigator.clipboard.writeText(shareText)
        .then(() => {
          showNotification('Project details copied to clipboard!', 'success');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          alert(`Share this project: ${selectedProject.name}\n\n${shareText}`);
        });
    }
  };

  const handleRunTests = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    showNotification(`Starting test execution for "${selectedProject.name}"...`, 'info');
    
    setTestProgress(0);
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          if (prev === 100) {
            showNotification(`Test execution completed! Success Rate: ${selectedProject.successRate}%`, 'success');
          }
          return null;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCloneProject = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    const newProjectName = prompt('Enter name for cloned project:', `${selectedProject.name} - Copy`);
    
    if (newProjectName) {
      const clonedProject = {
        ...selectedProject,
        id: Date.now().toString(),
        name: newProjectName,
        lastModified: new Date().toISOString(),
        owner: 'Current User',
        status: 'active' as const,
      };
      
      showNotification(`Project cloned successfully as "${newProjectName}"!`, 'success');
    }
  };

  const handleArchiveProject = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    const action = selectedProject.status === 'archived' ? 'unarchive' : 'archive';
    const confirmMessage = `Are you sure you want to ${action} "${selectedProject.name}"?`;
    
    if (confirm(confirmMessage)) {
      const newStatus = selectedProject.status === 'archived' ? 'active' : 'archived';
      showNotification(`Project "${selectedProject.name}" has been ${action}d!`, 'success');
    }
  };

  const handleDeleteProject = () => {
    if (!selectedProject) {
      showNotification('Please select a project first', 'warning');
      return;
    }
    
    if (confirm(`Are you sure you want to delete "${selectedProject.name}"? This action cannot be undone.`)) {
      showNotification(`Project "${selectedProject.name}" has been deleted!`, 'success');
      setSelectedProject(null);
    }
  };

  const renderToscaCommanderStructure = () => {
    if (!selectedProject) return null;

    return (
      <div className="bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-300 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-800 dark:text-white">
            TOSCA Commander View
          </h4>
          <div className="text-xs text-gray-500">Click folders to expand/collapse</div>
        </div>
        
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <FolderOpen size={18} className="text-blue-500 mr-2" />
            <span className="font-medium text-gray-800 dark:text-white">TOSCA Workspace</span>
          </div>
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          {selectedProject.folderStructure.length > 0 ? (
            selectedProject.folderStructure.map(item => renderFolderItem(item))
          ) : (
            <div className="text-center py-8">
              <Folder size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                No folder structure available for this project
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {notification && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="glassmorphism rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              TOSCA Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and browse all Tricentis TOSCA projects with folder structure view
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
              <FolderOpen size={18} className="mr-2" />
              New Project
            </button>
            <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by name, description, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-3 rounded-xl border transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-3 rounded-xl border transition-colors flex items-center ${
                filterStatus === 'active'
                  ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30'
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700'
              }`}
            >
              <Activity size={16} className="mr-2" />
              Active
            </button>
            <button
              onClick={() => setFilterStatus('archived')}
              className={`px-4 py-3 rounded-xl border transition-colors flex items-center ${
                filterStatus === 'archived'
                  ? 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30'
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700'
              }`}
            >
              <Archive size={16} className="mr-2" />
              Archived
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                All Projects ({filteredProjects.length})
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sorted by Last Modified
              </div>
            </div>

            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    selectedProject?.id === project.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                      : 'bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FolderOpen size={24} className="text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-gray-800 dark:text-white">
                            {project.name}
                          </h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            <div className="flex items-center">
                              {getStatusIcon(project.status)}
                              <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center text-sm">
                            <Users size={14} className="mr-1 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{project.owner}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar size={14} className="mr-1 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {new Date(project.lastModified).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToProjectDetails(project.id);
                        }}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="View Project Details"
                      >
                        <Eye size={18} className="text-blue-500" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Star size={18} className="text-gray-500" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                        {project.executionRuns}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Executions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800 dark:text-white">
                        {project.successRate}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glassmorphism rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {selectedProject ? `${selectedProject.name} Structure` : 'Project Structure'}
              </h2>
              {selectedProject && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => navigateToProjectDetails(selectedProject.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
                    title="View Full Details"
                  >
                    <Eye size={18} className="text-gray-600 dark:text-gray-400 mr-1" />
                    <span className="text-sm">Details</span>
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Download Project"
                  >
                    <Download size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>

            {selectedProject ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FolderOpen size={20} className="text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">Selected Project</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>

                {renderToscaCommanderStructure()}

                <button 
                  onClick={() => navigateToProjectDetails(selectedProject.id)}
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center font-medium"
                >
                  <Eye size={18} className="mr-2" />
                  View Full Project Details
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleRunTests}
                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center flex items-center justify-center"
                  >
                    <PlayCircle size={18} className="mr-2" />
                    Run Tests
                  </button>
                  <button 
                    onClick={handleExport}
                    className="p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-center flex items-center justify-center"
                  >
                    <Download size={18} className="mr-2" />
                    Export Results
                  </button>
                </div>
                
                {testProgress !== null && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Test Execution Progress</span>
                      <span>{testProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${testProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <button 
                    onClick={handleCloneProject}
                    className="p-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm flex items-center justify-center"
                  >
                    <Copy size={14} className="mr-1" />
                    Clone
                  </button>
                  <button 
                    onClick={handleArchiveProject}
                    className="p-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm flex items-center justify-center"
                  >
                    <Archive size={14} className="mr-1" />
                    {selectedProject.status === 'archived' ? 'Unarchive' : 'Archive'}
                  </button>
                  <button 
                    onClick={handleDeleteProject}
                    className="p-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Folder size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  Select a Project
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click on a project from the list to view its TOSCA Commander folder structure
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Click the <Eye className="inline w-4 h-4 mx-1" /> icon to view detailed project analytics
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;