
import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  color: string;
  user: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glassmorphism hover-scale rounded-xl overflow-hidden h-full flex flex-col"
    >
      <div className={`h-2 ${project.color}`}></div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-8 flex-grow">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay * 0.1 + 0.2 }}
            className="text-2xl font-medium mb-4 text-white"
          >
            {project.title}
          </motion.h3>
          <div className="w-16 h-1 bg-white/20 rounded-full mb-6"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
          className="flex items-center mt-auto"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white/10">
            <img 
              src={project.user.avatar} 
              alt={project.user.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{project.user.name}</p>
            <p className="text-xs text-gray-400">{project.user.timeAgo}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
