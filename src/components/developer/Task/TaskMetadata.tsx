import { Calendar, AlarmClock, Flag, CheckCircle2, Briefcase, User } from "lucide-react";
import { TaskDetails } from "../../../types/developer/task";
import MetadataItem from "./MetadataItem";

interface TaskMetadataProps {
  task: TaskDetails;
}

const formatTaskDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
const TaskMetadata = ({ task }: TaskMetadataProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <MetadataItem icon={<Calendar className="text-blue-400" />} label="Due Date" value={formatTaskDate(task.dueDate)} />
    <MetadataItem 
      icon={<AlarmClock className="text-orange-400" />} 
      label="Days Remaining" 
      value={task.isOverdue ? 'Overdue' : task.daysRemaining > 0 ? `${task.daysRemaining} days` : 'Due today'}
      isError={task.isOverdue}
    />
    <MetadataItem icon={<Flag className="text-yellow-400" />} label="Priority" value={task.priority} />
    <MetadataItem icon={<CheckCircle2 className="text-green-400" />} label="Status" value={task.status} />
    <MetadataItem icon={<Briefcase className="text-purple-400" />} label="Project" value={task.project.name} />
    <MetadataItem icon={<User className="text-cyan-400" />} label="Created By" value={task.createdBy.name} />
  </div>
);

export default TaskMetadata;