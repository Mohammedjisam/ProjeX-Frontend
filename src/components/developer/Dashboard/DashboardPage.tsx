import { useDashboard } from "../../../hooks/developer/useDashboard";
import { StatsCards } from "./StatsCards";
import { TasksTable } from "./TasksTable";
import { NotificationsPanel } from "./NotificationsPanel";
import { Loader2 } from "lucide-react";

const notifications = [
  { id: 1, text: 'Jithesh assigned a task \'User Authentication\'' },
  { id: 2, text: 'Changed status to \'started\' of task \'Forgot Password\'' },
];

export const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();

  return (
    <div className="px-6 py-8 h-full overflow-auto">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-100 rounded-lg">
            {error.message}
          </div>
        ) : data?.taskCounts ? (
          <StatsCards taskCounts={data.taskCounts} />
        ) : null}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-morphism rounded-xl p-4 animate-slide-up" style={{animationDelay: '100ms'}}>
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 p-4">
              Failed to load tasks
            </div>
          ) : data?.recentTasks && data.recentTasks.length > 0 ? (
            <TasksTable tasks={data.recentTasks} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No tasks found
            </div>
          )}
        </div>
        
        <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{animationDelay: '200ms'}}>
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <NotificationsPanel notifications={notifications} />
        </div>
      </div>
    </div>
  );
};