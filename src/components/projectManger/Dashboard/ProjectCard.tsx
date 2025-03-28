import React, { useEffect, useRef } from 'react';
import { getStatusColor } from '../../../services/projectManager/dashboard.services';
import { ProjectCardProps } from '../../../types/projectManager/Dashboard';

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  subtitle, 
  progress, 
  weeksRemaining,
  delay = 0,
  status = "in-progress"
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const color = getStatusColor(status);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (circleRef.current) {
        const circumference = 251.2; 
        const offset = circumference - (progress / 100) * circumference;
        circleRef.current.style.strokeDashoffset = String(offset);
      }
    }, 300 + delay);
    
    return () => clearTimeout(timer);
  }, [progress, delay]);

  return (
    <div className="card-glass p-6 flex flex-col h-[200px] animate-fade-in rounded-xl bg-gray-800" 
         style={{ animationDelay: `${delay}ms` }}>
       <div className="flex flex-col mb-auto">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="text-dashboard-text-gray text-sm mt-1">{subtitle}</p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="relative w-20 h-20">
          <svg className="progress-ring w-20 h-20" viewBox="0 0 100 100">
            <circle 
              className="text-dashboard-progress-bg" 
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              ref={circleRef}
              className="progress-ring-circle animate-progress-fill"
              strokeWidth="8"
              strokeLinecap="round"
              stroke={progress >= 60 ? "#34D399" : progress >= 40 ? "#0096FF" : "#FF5353"}
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-medium">{progress}%</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-dashboard-text-gray text-sm">{weeksRemaining} {weeksRemaining === 1 ? 'week' : 'weeks'} remaining</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;