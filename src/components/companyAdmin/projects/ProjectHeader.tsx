// src/pages/companyadmin/projects/[projectId]/components/ProjectHeader.tsx
import React from 'react';
import { ProjectData } from '../../../types/CompanyAdmin/Project';
import { CheckCircle, XCircle } from 'lucide-react';

interface ProjectHeaderProps {
  project: ProjectData;
  verifying: boolean;
  onToggleVerification: () => Promise<void>;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  project, 
  verifying,
  onToggleVerification 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-t-lg shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {project.name}
          </h1>
          <div className="flex items-center space-x-2 text-blue-200">
            <span>Client: {project.clientName}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onToggleVerification}
            disabled={verifying}
            className={`flex items-center ${
              project.companyAdminIsVerified 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-green-600 hover:bg-green-700"
            } text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-md`}
          >
            {verifying ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full mr-2"></div>
                <span>Processing...</span>
              </div>
            ) : project.companyAdminIsVerified ? (
              <>
                <XCircle size={18} className="mr-2" />
                <span>Revoke Verification</span>
              </>
            ) : (
              <>
                <CheckCircle size={18} className="mr-2" />
                <span>Verify Project</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;