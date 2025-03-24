import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosConfig';
import ProjectCard from './ProjectCard';
import ManagerCard from './ManagerCard';
import Sidebar from './Sidebar';
import companyadminAxiosInstance from '../../utils/CompanyAdminAxiosInstance';

interface Manager {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  location?: string;
}

interface Project {
  _id: string;
  name: string;
  clientName: string;
  status: string;
  startDate: string;
  endDate: string;
  projectManager: {
    _id: string;
    name: string;
    email: string;
  };
}

const Dashboard: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch managers data
      const managersResponse = await companyadminAxiosInstance.get('/getallmanager');
      // Fetch projects data with populated project manager
      const projectsResponse = await companyadminAxiosInstance.get('/project/getallprojects');
      
      if (managersResponse.data && managersResponse.data.success) {
        const managersData = managersResponse.data.data;
        
        // Process managers data
        const transformedManagers = managersData.map((manager: Manager, index: number) => ({
          ...manager,
          avatar: `/placeholder.svg?height=60&width=60`,
          location: manager.location || "Unknown",
          isHighlighted: index === 0
        }));
        
        setManagers(transformedManagers);
      }
      
      if (projectsResponse.data && projectsResponse.data.success) {
        const projectsData = projectsResponse.data.data;
        
        // Process projects data
        const transformedProjects = projectsData.map((project: Project) => {
          // Generate a color based on status
          let color;
          switch (project.status) {
            case 'in-progress':
              color = 'bg-indigo-500';
              break;
            case 'completed':
              color = 'bg-teal-500';
              break;
            case 'on-hold':
              color = 'bg-purple-500';
              break;
            default: // planned
              color = 'bg-blue-500';
          }
          
          // Calculate timeAgo
          const startDate = new Date(project.startDate);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let timeAgo;
          if (diffDays < 7) {
            timeAgo = `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
          } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            timeAgo = `${weeks} week${weeks === 1 ? '' : 's'} ago`;
          } else {
            const months = Math.floor(diffDays / 30);
            timeAgo = `${months} month${months === 1 ? '' : 's'} ago`;
          }
          
          // Ensure we handle the projectManager data properly
          let managerName = 'Unassigned';
          let managerId = '';
          
          // Check if projectManager exists and has expected properties
          if (project.projectManager) {
            // If projectManager is already populated as an object with name
            if (typeof project.projectManager === 'object' && project.projectManager.name) {
              managerName = project.projectManager.name;
              managerId = project.projectManager._id;
            } 
            // If projectManager is just an ID string, find the manager by ID
            else if (typeof project.projectManager === 'string') {
              const manager = managers.find(m => m._id === project.projectManager);
              if (manager) {
                managerName = manager.name;
                managerId = manager._id;
              }
            }
          }
          
          return {
            id: project._id,
            title: project.name,
            color,
            managerId,
            user: {
              name: managerName,
              avatar: `/placeholder.svg?height=60&width=60`,
              timeAgo,
            },
          };
        });
        
        setProjects(transformedProjects);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch dashboard data';
      
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate project count for each manager
  const getProjectCountForManager = (managerId: string) => {
    if (!projects.length) return "0";
    
    const count = projects.filter(project => 
      project.user.name === managers.find(m => m._id === managerId)?.name
    ).length;
    
    return `${count}/${projects.length}`;
  };

  const renderManagerSection = () => {
    if (loading && !managers.length) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-pulse h-48">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={fetchDashboardData} 
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {managers.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            No managers found
          </div>
        ) : (
          managers.map((manager, index) => (
            <ManagerCard 
              key={manager._id} 
              manager={{
                id: parseInt(manager._id.slice(-4), 16) || index + 1,
                name: manager.name,
                avatar: manager.avatar || `/placeholder.svg?height=60&width=60`,
                projectCount: getProjectCountForManager(manager._id),
                phone: manager.phoneNumber || "Not provided",
                isHighlighted: index === 0 
              }} 
              delay={index} 
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0A101F] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <main className="flex-1 overflow-y-auto p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <section className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-8"
              >
                <h2 className="text-3xl font-bold">Projects</h2>
                <div className="bg-white/5 backdrop-blur-lg rounded-lg px-4 py-2 text-sm">
                  <span className="text-gray-400">Total: </span>
                  <span className="font-medium">{projects.length} Projects</span>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {loading && !projects.length ? (
                  // Project loading skeletons
                  Array(4).fill(null).map((_, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-pulse h-48">
                      <div className="h-6 bg-gray-600 rounded w-40 mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center space-x-3 mt-6">
                        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-24"></div>
                      </div>
                    </div>
                  ))
                ) : projects.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-400">
                    No projects found
                  </div>
                ) : (
                  projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} delay={index} />
                  ))
                )}
              </div>
            </section>

            <section>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between mb-8"
              >
                <h2 className="text-3xl font-bold">Managers</h2>
                <div className="bg-white/5 backdrop-blur-lg rounded-lg px-4 py-2 text-sm">
                  <span className="text-gray-400">Total: </span>
                  <span className="font-medium">{managers.length} Managers</span>
                </div>
              </motion.div>
              
              {renderManagerSection()}
            </section>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;