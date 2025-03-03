import React, { useEffect, useRef } from 'react';

const OverallProgress: React.FC = () => {
  const progressRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
        progressRef.current.style.strokeDashoffset = '125'; // Around 50% completion
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="card-glass animate-fade-in rounded-xl bg-gradient-to-br from-dashboard-card-blue to-dashboard-dark-blue/80" style={{ animationDelay: '200ms' }}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-medium">Overall Progress</h3>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="relative w-full h-40">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 20 80 A 60 60 0 0 1 180 80"
              fill="none"
              stroke="#151C2E"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              ref={progressRef}
              d="M 20 80 A 60 60 0 0 1 180 80"
              fill="none"
              stroke="#0096FF"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="251.2"
            />
            <path
              d="M 20 80 A 60 60 0 0 1 180 80"
              fill="none"
              stroke="#FF5353"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="125"
              style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
            />
          </svg>
        </div>
        
        <div className="flex gap-8 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-blue"></span>
            <span className="text-sm text-dashboard-text-gray">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-red"></span>
            <span className="text-sm text-dashboard-text-gray">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallProgress;