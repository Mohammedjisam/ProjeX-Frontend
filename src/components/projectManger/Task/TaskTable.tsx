import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "../../ui/skeleton";
import { Alert, AlertDescription } from "../../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface TaskTableProps {
  tasks: TaskDetails[];
  isLoading: boolean;
  error: Error | null;
  projectId: string;
  onViewDetails: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateTask: () => void;
}

export const TaskTable = ({
  tasks,
  isLoading,
  error,
  projectId,
  onViewDetails,
  onDeleteTask,
  onCreateTask
}: TaskTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "on-hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p>No tasks found</p>
        <Button onClick={onCreateTask}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button onClick={onCreateTask}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NO</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={task._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.assignee?.name || "Unassigned"}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell>
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails(task._id)}
                >
                  View
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDeleteTask(task._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};