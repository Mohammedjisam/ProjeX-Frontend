// src/pages/companyadmin/projects/components/ProjectTableRow.tsx
import React from 'react';
import { Project } from '../../../types/CompanyAdmin/Project';
import { format } from 'date-fns';

interface ProjectTableRowProps {
  project: Project;
  getStatusColor: (status: string) => string;
  onViewDetails: (id: string) => void;
}

const ProjectTableRow: React.FC<ProjectTableRowProps> = ({ 
  project, 
  getStatusColor,
  onViewDetails
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <tr className="hover:bg-gray-800/50 transition-colors">
      <td className="py-4 px-4">{project.name}</td>
      <td className="py-4 px-4">{project.clientName}</td>
      <td className="py-4 px-4">
        <span className={`capitalize ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </td>
      <td className="py-4 px-4">{formatDate(project.startDate)}</td>
      <td className="py-4 px-4">{formatDate(project.endDate)}</td>
      <td className="py-4 px-4">
        {project.companyAdminIsVerified ? (
          <span className="text-green-400">Verified</span>
        ) : (
          <span className="text-yellow-400">Pending</span>
        )}
      </td>
      <td className="py-4 px-4 text-center">
        <button
          onClick={() => onViewDetails(project._id)}
          className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default ProjectTableRow;