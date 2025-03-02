
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosConfig';
import ProjectCard from './ProjectCard';
import ManagerCard from './ManagerCard';
import Header from './Header';
import Sidebar from './Sidebar';

interface Project {
  id: number;
  title: string;
  color: string;
  user: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
}

interface Manager {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  location?: string;
  projectCount?: string;
  isHighlighted?: boolean;
}

const Dashboard: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/companyadmin/getallmanager');

      if (response.data && response.data.data) {
        // Transform the data to match our component's expected format
        const transformedManagers = response.data.data.map((manager: any) => ({
          _id: manager._id,
          name: manager.name,
          email: manager.email,
          phoneNumber: manager.phoneNumber || 'N/A',
          avatar: `/placeholder.svg?height=60&width=60`,
          location: manager.location || 'Unknown',
          projectCount: '0/0', // Default value since we don't have this in the API
          isHighlighted: false
        }));
        
        setManagers(transformedManagers);
      } else {
        setManagers([]);
        console.warn('Unexpected response format:', response.data);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch managers';
      
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching managers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Projects data (still hardcoded for now, you can update this similarly)
  const projects: Project[] = [
    {
      id: 1,
      title: "Billing Application",
      color: "bg-teal-500",
      user: {
        name: "Thomas Hope",
        avatar: "/placeholder.svg?height=60&width=60",
        timeAgo: "2 weeks ago",
      },
    },
    {
      id: 2,
      title: "Ecommerce Project",
      color: "bg-indigo-500",
      user: {
        name: "Tony Andrew",
        avatar: "/placeholder.svg?height=60&width=60",
        timeAgo: "2 weeks ago",
      },
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      color: "bg-purple-500",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=60&width=60",
        timeAgo: "3 weeks ago",
      },
    },
    {
      id: 4,
      title: "Mobile Application",
      color: "bg-blue-500",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=60&width=60",
        timeAgo: "1 month ago",
      },
    },
  ];

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
            onClick={fetchManagers} 
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
                projectCount: manager.projectCount || "0/0",
                phone: manager.phoneNumber,
                location: manager.location || "Unknown",
                isHighlighted: index === 0 // Highlight the first one
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
        <Header />
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
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} delay={index} />
                ))}
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
