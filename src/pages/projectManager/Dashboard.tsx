import { useState } from "react";
import { useDashboard } from "../../hooks/projectManager/useDashboard";
import Header from "../../components/projectManger/Header";
import Sidebar from "../../components/projectManger/Sidebar";
import ProjectCard from "../../components/projectManger/Dashboard/ProjectCard";
import OverallProgress from "../../components/projectManger/Dashboard/OverallProgress";
import TestStatus from "../../components/projectManger/Dashboard/TestStatus";

const DashboardPage = () => {
  const [page, setPage] = useState<number>(1);
  const { projects, stats, pagination, isLoading, error, refetch } = useDashboard(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Fixed Sidebar */}
      <div className="fixed h-full w-[230px] z-10">
        <Sidebar />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="ml-[200px] flex-1 overflow-y-auto">
        <div className="  max-w-7xl mx-auto">
          {/* Header - Only showing title and keeping right-side notifications/profile */}
          <div className="sticky top-0 z-10  pb-8">
            <Header title="Projects Dashboard"  />
          </div>

          {/* Dashboard Content */}
          <div className="mt-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                <h3 className="text-slate-300 text-sm font-medium mb-2">Total Projects</h3>
                <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
                <div className="mt-2 text-blue-300 text-sm">
                  {pagination?.pages > 1 ? `Showing 9 of ${pagination.pages * 9}` : "All projects"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/20 shadow-lg">
                <h3 className="text-slate-300 text-sm font-medium mb-2">Completed</h3>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
                <div className="mt-2 text-emerald-300 text-sm">
                  {Math.round((stats.completed / stats.totalProjects) * 100) || 0}% completion rate
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 p-6 rounded-xl border border-amber-500/20 shadow-lg">
                <h3 className="text-slate-300 text-sm font-medium mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
                <div className="mt-2 text-amber-300 text-sm">
                  {Math.round((stats.inProgress / stats.totalProjects) * 100) || 0}% of total projects
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <h3 className="text-slate-300 text-sm font-medium mb-2">Average Progress</h3>
                <p className="text-3xl font-bold text-white">{stats.averageProgress}%</p>
                <div className="mt-2 text-purple-300 text-sm">Across all active projects</div>
              </div>
            </div>

            {/* Loading/Error/Content States */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-5 rounded-xl shadow-lg">
                <p className="font-medium text-lg">Error loading projects</p>
                <p className="text-sm mt-1">{error.message}</p>
                <button
                  className="mt-3 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 text-red-200 rounded-lg text-sm transition-colors"
                  onClick={() => refetch()}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Project Overview */}
                <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <ProjectCard
                        key={project._id}
                        title={project.displayName}
                        subtitle={project.displayStatus}
                        progress={project.progress}
                        weeksRemaining={project.weeksRemaining}
                        delay={index * 100}
                        status={project.status}
                      />
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-slate-400 py-16 bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg">
                      <p className="text-lg font-medium">No projects found</p>
                    </div>
                  )}
                </div>

                {/* Progress Visualizations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Overall Progress</h2>
                    <OverallProgress projects={projects} />
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Test Status</h2>
                    <TestStatus projects={projects} />
                  </div>
                </div>

                {/* Pagination */}
                {projects.length > 0 && pagination?.pages > 1 && (
                  <div className="flex justify-center mt-8 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <button
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-slate-700 mr-2 transition-colors"
                      disabled={!pagination.hasPrev}
                      onClick={() => handlePageChange(pagination.current - 1)}
                    >
                      Previous
                    </button>
                    <div className="flex items-center px-4">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          className={`w-8 h-8 mx-1 rounded-md flex items-center justify-center transition-colors ${
                            pageNum === pagination.current
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    <button
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-slate-700 ml-2 transition-colors"
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
    </div>
  );
};

export default DashboardPage;