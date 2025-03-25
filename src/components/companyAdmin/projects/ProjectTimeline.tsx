// src/pages/companyadmin/projects/[projectId]/components/ProjectTimeline.tsx
import React from 'react';

interface ProjectTimelineProps {
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  createdAt, 
  updatedAt,
  startDate,
  endDate
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateDuration = () => {
    return Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white mb-3">
        Timeline
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
          <span className="text-gray-300">Created</span>
          <span className="text-gray-300">
            {formatDate(createdAt)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
          <span className="text-gray-300">Last Updated</span>
          <span className="text-gray-300">
            {formatDate(updatedAt)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
          <span className="text-gray-300">Duration</span>
          <span className="text-gray-300">
            {calculateDuration()} days
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;