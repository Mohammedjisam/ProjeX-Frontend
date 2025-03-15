import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/AxiosConfig';
import Header from './Header';
import Sidebar from './Sidebar';
import ProjectCard from './ProjectCard';
import OverallProgress from './OverallProgress';
import TestStatus from './TestStatus';

interface Project {
  _id: string;
  name?: string;
  description?: string;
  clientName: string;
  budget?: number;
  startDate?: Date;
  endDate?: Date | string;
  projectManager?: string | object;
  goal?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  completionPercentage?: number;
  progress?: number;
  title?: string;
  subtitle?: string;
  weeksRemaining?: number;
}

interface PaginationData {
  current: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface RootState {
  projectManager: {
    projectManagerData: {
      id: string;
      // other project manager fields
    };
  };
}

const Dashboard: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9); // Show up to 9 projects (3x3 grid)
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({ 
    current: 1, 
    pages: 1, 
    hasNext: false, 
    hasPrev: false 
  });
  
  // Get project manager ID from Redux store
  const projectManagerData = useSelector((state: RootState) => state.projectManager?.projectManagerData);
  const projectManagerId = projectManagerData?.id;
  
  // Define the calculateWeeksRemaining function before using it
  const calculateWeeksRemaining = (deadline?: string | Date): number => {
    if (!deadline) return 0;
    
    try {
      const deadlineDate = new Date(deadline);
      const today = new Date();
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(Math.ceil(diffDays / 7), 0); // Ensure we don't return negative weeks
    } catch (error) {
      console.error("Error calculating weeks remaining:", error);
      return 0;
    }
  };
  
  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      if (!projectManagerId) {
        setError("No project manager ID found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Explicitly adding limit parameter to ensure we get more data
        const response = await axiosInstance.get(
          `/project/projectmanager/${projectManagerId}?limit=${limit}&page=${page}`
        );
        
        const projectsData = response.data.data || [];
        console.log("Fetched projects:", projectsData.length, projectsData);
        
        setProjects(projectsData);
        
        // Safely set pagination data
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch projects");
        setLoading(false);
      }
    };

    if (projectManagerId) {
      fetchProjects();
    }
  }, [projectManagerId, page, limit]);

  // Process projects to calculate weeks remaining
  const processedProjects = projects.map(project => {
    return {
      _id: project._id,
      title: project.name || project.title || '',
      clientName: project.clientName || '',
      status: project.status || 'in-progress',
      progress: project.completionPercentage || project.progress || 0,
      deadline: project.endDate,
      subtitle: project.status || 'In Progress',
      weeksRemaining: calculateWeeksRemaining(project.endDate)
    };
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen bg-dashboard-dark-blue">
      <Sidebar />
      <div className="flex-1 ml-[240px]">
        <div className="py-6 px-8 max-w-7xl mx-auto">
          <Header title="Projects" />
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
              <p className="font-medium">Error loading projects</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {processedProjects.length > 0 ? (
                  processedProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      title={project.title || project.clientName}
                      subtitle={project.subtitle || ''}
                      progress={project.progress || 0}
                      weeksRemaining={project.weeksRemaining || 0}
                      delay={index * 100}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-400 py-12 bg-gray-800/50 rounded-xl">
                    <p className="text-lg">No projects found</p>
                    <p className="text-sm mt-2">Create a new project to get started</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OverallProgress projects={processedProjects} />
                <TestStatus projects={processedProjects} />
              </div>
              
              {processedProjects.length > 0 && pagination.pages > 1 && (
                <div className="flex justify-center mt-8">
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 mr-2"
                    disabled={!pagination.hasPrev}
                    onClick={() => handlePageChange(pagination.current - 1)}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-white">
                    Page {pagination.current} of {pagination.pages}
                  </span>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 ml-2"
                    disabled={!pagination.hasNext}
                    onClick={() => handlePageChange(pagination.current + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;