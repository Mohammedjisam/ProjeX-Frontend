import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    color: string;
    user: {
      name: string;
      avatar: string;
      timeAgo: string;
    };
  };
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * delay }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={project.user.avatar} alt={project.user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{project.user.name}</p>
              <p className="text-xs text-gray-400">{project.user.timeAgo}</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;