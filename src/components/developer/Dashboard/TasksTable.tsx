import { Task } from "../../../types/developer/dashboard";
import { CheckCircle, Clock } from "lucide-react";

interface TasksTableProps {
  tasks: Task[];
}

export const TasksTable = ({ tasks }: TasksTableProps) => (
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
);