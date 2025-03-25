// src/pages/companyadmin/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardData } from '../../hooks/companyAdmin/useDashboard';
import ProjectCard from '../../components/companyAdmin/Dashboard/ProjectCard';
import ManagerCard from '../../components/companyAdmin/Dashboard/ManagerCard';
import Sidebar from '../../components/companyAdmin/Sidebar';
import { LoadingSkeleton } from '../../components/companyAdmin/Dashboard/LoadingSkeleton';
import { ErrorSection } from '../../components/companyAdmin/Dashboard/ErrorSection';
import { EmptyState } from '../../components/companyAdmin/Dashboard/EmptyState';

const Dashboard: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { managers, projects, isLoading, error } = useDashboardData();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getProjectCountForManager = (managerId: string): string => {
    if (!projects.length) return "0";
    const count = projects.filter(project => 
      project.user.name === managers.find(m => m._id === managerId)?.name
    ).length;
    return `${count}/${projects.length}`;
  };

  const renderManagerSection = () => {
    if (isLoading && !managers.length) {
      return <LoadingSkeleton count={4} type="manager" />;
    }

    if (error) {
      return <ErrorSection 
        message={error.message} 
        onRetry={() => window.location.reload()} 
      />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {managers.length === 0 ? (
          <EmptyState message="No managers found" />
        ) : (
          managers.map((manager, index) => (
            <ManagerCard 
              key={manager._id} 
              manager={{
                id: parseInt(manager._id.slice(-4), 16) || index + 1,
                name: manager.name,
                avatar: '/placeholder.svg?height=60&width=60',
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

  const renderProjectSection = () => {
    if (isLoading && !projects.length) {
      return <LoadingSkeleton count={4} type="project" />;
    }

    if (error) {
      return <ErrorSection 
        message={error.message} 
        onRetry={() => window.location.reload()} 
      />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.length === 0 ? (
          <EmptyState message="No projects found" />
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index} />
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
              {renderProjectSection()}
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