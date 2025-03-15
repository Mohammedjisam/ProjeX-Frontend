import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import axiosInstance from '../../utils/AxiosConfig';
import { useSelector } from 'react-redux'; // Import useSelector hook

// Define RootState interface for Redux store
interface RootState {
  auth: {
    user: {
      _id: string;
      // Add other user properties as needed
    };
    token: string;
  };
}

interface Task {
  _id: string;
  id?: number;
  title: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'ongoing';
  project?: {
    name: string;
  };
}

interface Notification {
  id: number;
  text: string;
}

interface TaskCounts {
  total: number;
  completed: number;
  pending: number;
}

// Static notifications - we won't update these
const notifications: Notification[] = [
  { id: 1, text: 'Jithesh assigned a task \'User Authentication\'' },
  { id: 2, text: 'Changed status to \'started\' of task \'Forgot Password\'' },
];

const DashboardContent: React.FC = () => {
  // Get user and token from Redux store
  const developerData = useSelector((state: RootState) => state.developer.developerData)
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({
    total: 0,
    completed: 0,
    pending: 0
  });

  console.log("developer data",developerData)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Check if user and token exist
        if (!developerData || !developerData._id) {
          throw new Error('User not authenticated');
        }
        
     
        
        // Send assigneeId in the request body
        const response = await axiosInstance.post('/task/assignee', 
          { assigneeId: developerData._id },
        
        );
        
        if (response.data.success) {
          setTaskCounts(response.data.taskCounts);
          setTasks(response.data.recentTasks.map((task: any) => ({
            _id: task._id,
            id: task._id, // For compatibility with existing UI
            title: task.title,
            dueDate: new Date(task.dueDate).toLocaleDateString(),
            status: task.status,
            project: task.project
          })));
        } else {
          throw new Error(response.data.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [developerData]); // Add user and token as dependencies

  return (
    <div className="px-6 py-8 h-full overflow-auto">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg">Loading dashboard data...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        ) : (
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
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-morphism rounded-xl p-4 animate-slide-up" style={{animationDelay: '100ms'}}>
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-lg">Loading tasks...</div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4">
              Failed to load tasks
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sidebar-border">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Task Title</th>
                    <th className="px-4 py-3 text-left">Due Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task._id} className="border-b border-sidebar-border/30 hover:bg-sidebar-accent/20 transition-colors">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{task.title}</td>
                      <td className="px-4 py-3">{task.dueDate}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === 'completed' 
                            ? 'bg-completed/20 text-green-300' 
                            : task.status === 'pending' 
                              ? 'bg-pending/20 text-red-300' 
                              : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {task.status === 'completed' ? (
                            <CheckCircle className="mr-1" size={12} />
                          ) : (
                            <Clock className="mr-1" size={12} />
                          )}
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{animationDelay: '200ms'}}>
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="border-b border-sidebar-border/30 pb-3">
                <p className="text-sm">
                  <span className="w-2 h-2 inline-block bg-primary rounded-full mr-2"></span>
                  {notification.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;