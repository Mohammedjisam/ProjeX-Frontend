// src/pages/companyadmin/projects/[projectId]/components/ProjectManagerCard.tsx
import React from 'react';
import { ProjectManager } from '../../../types/Project';

const ProjectManagerCard: React.FC<{ projectManager: ProjectManager }> = ({ projectManager }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white mb-3">
        Project Manager
      </h2>
      <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-md">
        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
          {projectManager.name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-medium">
            {projectManager.name}
          </div>
          <div className="text-gray-400 text-sm">
            {projectManager.email}
          </div>
          <div className="text-blue-400 text-xs mt-1 capitalize">
            {projectManager.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerCard;