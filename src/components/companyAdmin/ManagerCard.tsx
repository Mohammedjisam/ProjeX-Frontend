import React from 'react';
import { motion } from 'framer-motion';

interface ManagerCardProps {
  manager: {
    id: number;
    name: string;
    avatar: string;
    projectCount: string;
    phone: string;
    location: string;
    isHighlighted?: boolean;
  };
  delay: number;
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, delay }) => {
  const { name, avatar, projectCount, phone, location, isHighlighted } = manager;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * delay }}
      className={`bg-white/5 backdrop-blur-md border ${
        isHighlighted ? 'border-indigo-500/50' : 'border-white/10'
      } rounded-xl p-6 hover:border-white/20 transition-all`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-xs text-gray-400">{2} Projects</p>
        </div>
      </div>

      <div className="space-y-3 mt-5">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="text-sm text-gray-300">{phone}</span>
        </div>
        <div className="flex items-center gap-2">

          <span className="text-sm text-gray-300">{location}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
      >
        View Details
      </motion.button>
    </motion.div>
  );
};

export default ManagerCard;