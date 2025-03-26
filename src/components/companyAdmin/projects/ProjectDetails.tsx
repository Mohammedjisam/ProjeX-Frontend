// src/pages/companyadmin/projects/[projectId]/components/ProjectDetails.tsx
import React from 'react';
import { ProjectData } from '../../../types/CompanyAdmin/Project';
import ProjectManagerCard from './ProjectManagerCard';
import ProjectTimeline from './ProjectTimeline';

const ProjectDetails: React.FC<{ project: ProjectData }> = ({ project }) => {
  return (
    <div className="bg-gray-900 p-6 shadow-lg rounded-b-lg mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Description
            </h2>
            <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">
              {project.description}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Project Goal
            </h2>
            <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">
              {project.goal}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ProjectManagerCard projectManager={project.projectManager} />
          <ProjectTimeline 
            createdAt={project.createdAt}
            updatedAt={project.updatedAt}
            startDate={project.startDate}
            endDate={project.endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;