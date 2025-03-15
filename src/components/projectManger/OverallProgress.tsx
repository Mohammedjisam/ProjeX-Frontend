import React, { useEffect, useRef } from 'react';

interface Project {
  _id: string;
  progress: number;
  status: string;
}

interface OverallProgressProps {
  projects: Project[];
}

const OverallProgress: React.FC<OverallProgressProps> = ({ projects = [] }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Calculate overall progress from all projects
  const calculateOverallProgress = (): number => {
    if (projects.length === 0) return 0;
    
    const totalProgress = projects.reduce((sum, project) => sum + (project.progress || 0), 0);
    return Math.round(totalProgress / projects.length);
  };
  
  const overallProgress = calculateOverallProgress();

  // Calculate completed, in progress, and pending project counts
  const statusCounts = {
    completed: projects.filter(p => p.status === 'completed' || p.progress >= 90).length,
    inProgress: projects.filter(p => p.status === 'in-progress' || (p.progress > 0 && p.progress < 90)).length,
    pending: projects.filter(p => p.status === 'pending' || p.progress === 0).length
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${overallProgress}%`;
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [overallProgress]);

  return (
    <div className="card-glass animate-fade-in rounded-xl bg-gradient-to-br from-dashboard-card-blue to-dashboard-dark-blue/80" style={{ animationDelay: '200ms' }}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-medium">Overall Progress</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-white text-sm">Total Progress</span>
            <span className="text-dashboard-text-gray text-sm">{overallProgress}%</span>
          </div>
          <div className="status-bar h-2.5 rounded-full">
            <div 
              ref={progressBarRef}
              className="status-bar-progress h-full rounded-full" 
              style={{ 
                backgroundColor: overallProgress >= 60 ? "#34D399" : overallProgress >= 40 ? "#0096FF" : "#FF5353",
                width: '0%'
              }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-dashboard-dark-blue/50 rounded-lg p-3">
            <p className="text-green-400 text-sm mb-1">Completed</p>
            <p className="text-white text-xl font-medium">{statusCounts.completed}</p>
          </div>
          
          <div className="bg-dashboard-dark-blue/50 rounded-lg p-3">
            <p className="text-blue-400 text-sm mb-1">In Progress</p>
            <p className="text-white text-xl font-medium">{statusCounts.inProgress}</p>
          </div>
          
          <div className="bg-dashboard-dark-blue/50 rounded-lg p-3">
            <p className="text-yellow-400 text-sm mb-1">Pending</p>
            <p className="text-white text-xl font-medium">{statusCounts.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallProgress;