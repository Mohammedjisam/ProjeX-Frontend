import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useDashboardData } from '../../hooks/manager/useDashboardData';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';
import { ProjectCard } from '../../components/manager/Dashboard/ProjectCard';
import { RecentProjectItem } from '../../components/manager/Dashboard/RecentProjectItem';
import LoadingState from '../../components/companyAdmin/manager/LoadingState';
import ErrorState from '../../components/companyAdmin/manager/ErrorState';
import { Project } from '../../types/manager/Dashboard';

const Dashboard = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { projects, recentProjects, loading, error, refetch } = useDashboardData();

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState 
              message={error} 
              onRetry={refetch} 
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: mounted ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Projects Section */}
              <section className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between mb-8"
                >
                  <h2 className="text-2xl font-bold">My Projects</h2>
                  <div className="bg-white/5 backdrop-blur-lg rounded-lg px-4 py-2 text-sm">
                    <span className="text-gray-400">Total: </span>
                    <span className="font-medium">{projects.length} Projects</span>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.length > 0 ? (
                    projects.map((project: Project, index: number) => (
                      <ProjectCard 
                        key={project._id} 
                        title={project.name}
                        progress={project.completionPercentage || 0}
                        delay={index}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-gray-400">
                      No projects assigned yet
                    </div>
                  )}
                </div>
              </section>

              {/* Recent Projects Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-between mb-6"
                >
                  <h2 className="text-2xl font-bold">Recent Activity</h2>
                  <button 
                    className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => window.location.href = "/projects"}
                  >
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </motion.div>

                <div className="space-y-4">
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project: Project, index: number) => (
                      <RecentProjectItem 
                        key={project._id} 
                        title={project.name} 
                        date={formatDate(project.startDate)}
                        delay={index}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No recent activity
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;