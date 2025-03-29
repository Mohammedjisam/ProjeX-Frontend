import { TaskCounts } from "../../../types/developer/dashboard";

interface StatsCardsProps {
  taskCounts: TaskCounts;
}

export const StatsCards = ({ taskCounts }: StatsCardsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="stat-card bg-total">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold text-white mb-2">{taskCounts.total}</h2>
        <p className="text-white/80">Total Tasks</p>
      </div>
    </div>
    
    <div className="stat-card bg-pending">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold text-white mb-2">{taskCounts.pending}</h2>
        <p className="text-white/80">Pending</p>
      </div>
    </div>
    
    <div className="stat-card bg-completed">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold text-white mb-2">{taskCounts.completed}</h2>
        <p className="text-white/80">Completed</p>
      </div>
    </div>
  </div>
);