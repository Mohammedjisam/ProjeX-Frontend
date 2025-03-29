import { Badge } from "../../../components/ui/badge";
import { TaskDetails } from "../../../types/developer/task";
import { getPriorityColor, getStatusColor } from "./taskUtils";

interface TaskHeaderProps {
  task: TaskDetails;
}

const TaskHeader = ({ task }: TaskHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
    <div>
      <h1 className="text-2xl font-bold text-white">{task.title}</h1>
      <p className="text-gray-400">
        Project: <span className="hover:text-blue-400">{task.project.name}</span>
      </p>
    </div>
    <div className="flex space-x-3">
      <Badge className={`${getPriorityColor(task.priority)} px-3 py-1 text-xs uppercase`}>
        {task.priority}
      </Badge>
      <Badge className={`${getStatusColor(task.status)} px-3 py-1 text-xs uppercase`}>
        {task.status}
      </Badge>
    </div>
  </div>
);

export default TaskHeader;