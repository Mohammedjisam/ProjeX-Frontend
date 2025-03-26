// src/components/manager/ProjectView/ProjectManagerSection.tsx
import { Users, Clock } from "lucide-react";
import { ProjectDetails } from "../../../../types/Manager/Project";

export const ProjectManagerSection = ({ project }: { project: ProjectDetails }) => (
  <div className="space-y-6">
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
        <Users size={18} className="mr-2 text-blue-400" />
        Project Manager
      </h2>
      <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-md">
        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
          {project.projectManager.name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-medium">
            {project.projectManager.name}
          </div>
          <div className="text-gray-400 text-sm">
            {project.projectManager.email}
          </div>
          <div className="text-blue-400 text-xs mt-1 capitalize">
            {project.projectManager.role}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
        <Clock size={18} className="mr-2 text-blue-400" />
        Timeline
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
          <span className="text-gray-300">Created</span>
          <span className="text-gray-300">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
          <span className="text-gray-300">Last Updated</span>
          <span className="text-gray-300">
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
          <span className="text-gray-300">Duration</span>
          <span className="text-gray-300">
            {Math.ceil(
              (new Date(project.endDate).getTime() -
                new Date(project.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days
          </span>
        </div>
      </div>
    </div>
  </div>
);