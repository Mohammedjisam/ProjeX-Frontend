// src/pages/companyadmin/projects/ProjectTable.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/companyAdmin/Sidebar';
import { useProjects } from '../../hooks/project/useProjects';
import LoadingState from '../../components/companyAdmin/projects/LoadingState';
import ErrorState from '../../components/companyAdmin/projects/ErrorState';
import ProjectTableRow from '../../components/companyAdmin/projects/ProjectTableRow';

const ProjectTable: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const navigate = useNavigate();

  const handleViewDetails = (projectId: string) => {
    navigate(`/companyadmin/projects/${projectId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "text-blue-400";
      case "completed": return "text-green-400";
      case "on-hold": return "text-yellow-400";
      case "planned": return "text-purple-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className="ml-[240px] flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Projects</h1>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
        ) : (
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="py-3 px-4 text-left">Project Name</th>
                    <th className="py-3 px-4 text-left">Client Name</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Start Date</th>
                    <th className="py-3 px-4 text-left">End Date</th>
                    <th className="py-3 px-4 text-left">Verification</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-400">
                        No projects found
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <ProjectTableRow 
                        key={project._id}
                        project={project}
                        getStatusColor={getStatusColor}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTable;