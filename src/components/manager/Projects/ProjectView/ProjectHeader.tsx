// src/components/manager/ProjectView/ProjectHeader.tsx
import { Button } from "../../../ui/button";
import { Edit, Trash2, User } from "lucide-react";
import { ProjectDetails } from "../../../../types/Manager/Project";

interface ProjectHeaderProps {
  project: ProjectDetails;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectHeader = ({ project, onEdit, onDelete }: ProjectHeaderProps) => (
  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-t-lg shadow-lg p-6">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
        <div className="flex items-center space-x-2 text-blue-200">
          <User size={16} />
          <span>Client: {project.clientName}</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button onClick={onEdit} variant="secondary">
          <Edit size={16} className="mr-2" />
          Edit
        </Button>
        <Button onClick={onDelete} variant="destructive">
          <Trash2 size={16} className="mr-2" />
          Delete
        </Button>
      </div>
    </div>
  </div>
);