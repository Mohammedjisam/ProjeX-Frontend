import React, { useEffect, useRef } from 'react';

interface TestItem {
  name: string;
  progress: number;
  color: string;
}

const testItems: TestItem[] = [
  { name: 'Tech Labs', progress: 65, color: '#0096FF' },
  { name: 'Tcz labs', progress: 40, color: '#FF5353' },
  { name: 'Flipcart', progress: 95, color: '#34D399' },
  { name: 'Somato', progress: 75, color: '#0096FF' },
];

const TestStatus: React.FC = () => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
  }, []);

  return (
    <div className="card-glass animate-fade-in rounded-xl bg-gradient-to-br from-dashboard-card-blue to-dashboard-dark-blue/80" style={{ animationDelay: '300ms' }}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-medium">Test Status</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {testItems.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white text-sm">{item.name}</span>
                <span className="text-dashboard-text-gray text-sm">{item.progress}%</span>
              </div>
              <div className="status-bar h-2.5 rounded-full">
                <div 
                  ref={el => progressRefs.current[index] = el}
                  className="status-bar-progress h-full rounded-full" 
                  style={{ 
                    backgroundColor: item.color,
                    width: '0%'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestStatus;