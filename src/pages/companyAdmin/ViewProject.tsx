// src/pages/companyadmin/projects/[projectId]/ViewProject.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/companyAdmin/Sidebar';
import { useProject } from '../../hooks/project/useProject';
import LoadingState from '../../components/companyAdmin/projects/LoadingState';
import ErrorState from '../../components/companyAdmin/projects/ErrorState';
import ProjectHeader from '../../components/companyAdmin/projects/ProjectHeader';
import ProjectDetails from '../../components/companyAdmin/projects/ProjectDetails';

const ViewProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, loading, error, verifying, handleToggleVerification } = useProject(projectId || '');

  return (
    <div className="flex h-screen bg-[#0f121b]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f121b] p-6">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : project ? (
            <div className="max-w-6xl mx-auto">
              <ProjectHeader 
                project={project} 
                verifying={verifying}
                onToggleVerification={handleToggleVerification}
              />
              <ProjectDetails project={project} />
            </div>
          ) : (
            <ErrorState error="Project not found" />
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewProject;