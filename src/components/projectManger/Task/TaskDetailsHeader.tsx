// TaskDetailsHeader.tsx
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface TaskDetailsHeaderProps {
  title: string;
  project: {
    _id: string;
    name: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  onBack: () => void;
}

export const TaskDetailsHeader = ({ 
  title, 
  project, 
  priority, 
  status, 
  onBack 
}: TaskDetailsHeaderProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "low": return "bg-blue-500/10 text-blue-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500";
      case "high": return "bg-orange-500/10 text-orange-500";
      case "urgent": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-500/10 text-yellow-500";
      case "in-progress": return "bg-blue-500/10 text-blue-500";
      case "completed": return "bg-green-500/10 text-green-500";
      case "on-hold": return "bg-orange-500/10 text-orange-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-gray-400">
          Project: <Link to={`/projectmanager/projects/${project._id}`} className="hover:text-blue-400">
            {project.name}
          </Link>
        </p>
      </div>
      <div className="flex space-x-3">
        <Badge className={`${getPriorityColor(priority)} px-3 py-1 text-xs uppercase`}>
          {priority}
        </Badge>
        <Badge className={`${getStatusColor(status)} px-3 py-1 text-xs uppercase`}>
          {status}
        </Badge>
      </div>
    </div>
  );
};