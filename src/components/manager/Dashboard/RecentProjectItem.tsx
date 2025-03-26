import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { RecentProjectItemProps } from "../../../types/manager/Dashboard";

export const RecentProjectItem: React.FC<RecentProjectItemProps> = ({ 
  title, 
  date, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * delay }}
      className="bg-gray-900/50 rounded-lg p-4 flex items-center justify-between border border-gray-800/50"
    >
         <h3 className="font-medium">{title}</h3>
    <div className="flex items-center text-gray-400 text-sm">
      <Calendar className="h-3.5 w-3.5 mr-1" />
      {date}
    </div>
    </motion.div>
  );
};