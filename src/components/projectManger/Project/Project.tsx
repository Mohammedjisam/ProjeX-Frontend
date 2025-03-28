import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ProjectHeaderProps {
  name: string;
  clientName: string;
  status: string;
  onBack: () => void;
}

export const ProjectHeader = ({ name, clientName, status, onBack }: ProjectHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planned": return "bg-yellow-500/10 text-yellow-500";
      case "in-progress": return "bg-blue-500/10 text-blue-500";
      case "completed": return "bg-green-500/10 text-green-500";
      case "on-hold": return "bg-orange-500/10 text-orange-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <p className="text-gray-400">Client: {clientName}</p>
        </div>
        <Badge className={`${getStatusColor(status)} px-3 py-1 text-xs uppercase`}>
          {status}
        </Badge>
      </div>
    </div>
  );
};