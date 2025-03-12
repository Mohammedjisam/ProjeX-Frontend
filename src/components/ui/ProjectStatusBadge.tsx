import React from 'react';
import { AlertCircle, Clock, PlayCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProjectStatusBadgeProps {
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  className?: string;
}

const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'planned':
        return {
          icon: Clock,
          label: 'Planned',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700'
        };
      case 'in-progress':
        return {
          icon: PlayCircle,
          label: 'In Progress',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Completed',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-700'
        };
      case 'on-hold':
        return {
          icon: AlertCircle,
          label: 'On Hold',
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700'
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700'
        };
    }
  };

  const { icon: Icon, label, bgColor, textColor } = getStatusConfig();

  return (
    <div className={cn('flex items-center px-2 py-1 rounded-full text-xs font-medium', bgColor, textColor, className)}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </div>
  );
};

export default ProjectStatusBadge;