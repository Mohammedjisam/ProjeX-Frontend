import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ProjectCard from './ProjectCard';
import OverallProgress from './OverallProgress';
import TestStatus from './TestStatus';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const projects = [
    {
      title: 'Visual Labs',
      subtitle: 'Translator Application',
      progress: 70,
      weeksRemaining: 2,
    },
    {
      title: 'Tech Labs',
      subtitle: 'Billing Application',
      progress: 40,
      weeksRemaining: 4,
    },
    {
      title: 'Somato',
      subtitle: 'Ecommerce Application',
      progress: 70,
      weeksRemaining: 1,
    },
  ];

  return (
    <div className="flex min-h-screen bg-dashboard-dark-blue">
      <Sidebar />
      <div className="flex-1 ml-[240px]">
        <div className="py-6 px-8 max-w-7xl mx-auto">
          <Header title="Projects" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                subtitle={project.subtitle}
                progress={project.progress}
                weeksRemaining={project.weeksRemaining}
                delay={index * 100}
              />
            ))}
           
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OverallProgress />
            <TestStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
