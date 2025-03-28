import React, { useEffect, useRef } from 'react';
import { ProcessedDashboardProject } from '../../../types/projectManager/Dashboard';
import { getStatusColor } from '../../../services/projectManager/dashboard.services';

interface TestStatusProps {
  projects: ProcessedDashboardProject[];
}

const TestStatus: React.FC<TestStatusProps> = ({ projects = [] }) => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Prepare test items from projects data - take up to 4 projects for display
  const testItems = projects.slice(0, 4).map(project => ({
    name: project.displayName || project.clientName,
    progress: project.progress || 0,
    color: getStatusColor(project.status)
  }));
  
  useEffect(() => {
    const timers = testItems.map((_, index) => {
      return setTimeout(() => {
        const progressBar = progressRefs.current[index];
        if (progressBar) {
          progressBar.style.width = `${testItems[index].progress}%`;
        }
      }, 500 + index * 150);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [testItems]);

  return (
    <div className="card-glass animate-fade-in rounded-xl bg-gradient-to-br from-dashboard-card-blue to-dashboard-dark-blue/80" style={{ animationDelay: '300ms' }}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-medium">Test Status</h3>
      </div>
      
      <div className="p-6">
        {testItems.length > 0 ? (
          <div className="space-y-6">
            {testItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white text-sm">{item.name}</span>
                  <span className="text-dashboard-text-gray text-sm">{item.progress}%</span>
                </div>
                <div className="status-bar h-2.5 rounded-full bg-gray-700">
                  <div 
                    ref={el => progressRefs.current[index] = el}
                    className="status-bar-progress h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ 
                      backgroundColor: item.color,
                      width: '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-dashboard-text-gray">
            No project data available
          </div>
        )}
      </div>
    </div>
  );
};

export default TestStatus;