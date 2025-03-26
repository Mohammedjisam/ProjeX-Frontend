// src/components/manager/ProjectView/ProjectDescriptionSection.tsx
import { FileText, Target } from "lucide-react";
import { ProjectDetails } from "../../../../types/Manager/Project";

export const ProjectDescriptionSection = ({ project }: { project: ProjectDetails }) => (
  <div className="lg:col-span-2 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
        <FileText size={18} className="mr-2 text-blue-400" />
        Description
      </h2>
      <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">
        {project.description}
      </div>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
        <Target size={18} className="mr-2 text-blue-400" />
        Project Goal
      </h2>
      <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">
        {project.goal}
      </div>
    </div>
  </div>
);