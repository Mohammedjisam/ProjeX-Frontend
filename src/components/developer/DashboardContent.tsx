import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: 'Completed' | 'Pending' | 'Ongoing';
}

interface Notification {
  id: number;
  text: string;
}

const tasks: Task[] = [
  { id: 1, title: 'User Authentication', dueDate: '05/06/2024', status: 'Completed' },
  { id: 2, title: 'Offer Management', dueDate: '05/07/2024', status: 'Ongoing' },
  { id: 3, title: 'Forgot Password', dueDate: '05/08/2024', status: 'Pending' },
  { id: 4, title: 'Payment Integration', dueDate: '05/09/2024', status: 'Completed' },
];

const notifications: Notification[] = [
  { id: 1, text: 'Jithesh assigned a task \'User Authentication\'' },
  { id: 2, text: 'Changed status to \'started\' of task \'Forgot Password\'' },
];

const DashboardContent: React.FC = () => {
  return (
    <div className="px-6 py-8 h-full overflow-auto">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card bg-total">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-bold text-white mb-2">10</h2>
              <p className="text-white/80">Total Tasks</p>
            </div>
          </div>
          
          <div className="stat-card bg-pending">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-bold text-white mb-2">5</h2>
              <p className="text-white/80">Pending</p>
            </div>
          </div>
          
          <div className="stat-card bg-completed">
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-bold text-white mb-2">5</h2>
              <p className="text-white/80">Completed</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-morphism rounded-xl p-4 animate-slide-up" style={{animationDelay: '100ms'}}>
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Task Title</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-sidebar-border/30 hover:bg-sidebar-accent/20 transition-colors">
                    <td className="px-4 py-3">{task.id}</td>
                    <td className="px-4 py-3 font-medium">{task.title}</td>
                    <td className="px-4 py-3">{task.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.status === 'Completed' 
                          ? 'bg-completed/20 text-green-300' 
                          : task.status === 'Pending' 
                            ? 'bg-pending/20 text-red-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {task.status === 'Completed' ? (
                          <CheckCircle className="mr-1" size={12} />
                        ) : (
                          <Clock className="mr-1" size={12} />
                        )}
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
