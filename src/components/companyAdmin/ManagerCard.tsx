
import React from 'react';
import { motion } from 'framer-motion';

interface Manager {
  id: number;
  name: string;
  avatar: string;
  projectCount: string;
  phone: string;
  location: string;
  isHighlighted?: boolean;
}

interface ManagerCardProps {
  manager: Manager;
  delay?: number;
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`glassmorphism hover-scale rounded-xl overflow-hidden ${
        manager.isHighlighted ? 'border border-indigo-500/50' : 'border border-white/10'
      }`}
    >
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay * 0.1 + 0.2 }}
          className="flex items-center mb-6"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/10">
            <img 
              src={manager.avatar} 
              alt={manager.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{manager.name}</h3>
            {/* <p className="text-xs text-gray-400">{manager.location}</p> */}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
          className="flex justify-between items-center text-sm"
        >
          <div className="bg-white/5 rounded-lg p-3 w-full mr-2">
            <p className="text-gray-400 mb-1 text-xs">Projects</p>
            <p className="text-white font-medium">{manager.projectCount}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 w-full">
            <p className="text-gray-400 mb-1 text-xs">Phone</p>
            <p className="text-white font-medium">{manager.phone}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ManagerCard;
