import { motion } from "framer-motion";
import { ProjectCardProps } from "../../../types/manager/Dashboard";

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  progress, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * delay }}
      className="bg-blue-900/30 rounded-lg p-6 border border-blue-900/50"
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="relative h-36 flex items-center justify-center">
        <svg className="w-32 h-32">
          <circle
            className="text-gray-700"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="58"
            cx="64"
            cy="64"
          />
          <circle
            className="text-blue-500"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="58"
            cx="64"
            cy="64"
            strokeDasharray={365}
            strokeDashoffset={365 - (365 * progress) / 100}
            transform="rotate(-90 64 64)"
          />
        </svg>
        <span className="absolute text-xl font-bold">{progress}%</span>
      </div>
    </motion.div>
  );
};