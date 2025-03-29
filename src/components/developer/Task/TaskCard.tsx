import { Task } from "../../../types/developer/task";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Clock, AlertTriangle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onViewDetails: () => void;
}

const priorityBadgeConfig = {
  urgent: { variant: "destructive" as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> },
  high: { variant: "destructive" as const, icon: null },
  medium: { variant: "secondary" as const, icon: null },
  low: { variant: "outline" as const, icon: null },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const TaskCard = ({ task, onViewDetails }: TaskCardProps) => {
  const priorityBadge = priorityBadgeConfig[task.priority];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow mb-3">
      <CardContent className="p-4">
        <div className="text-xs font-medium text-muted-foreground mb-1">
          {task.project?.name || "No Project"}
        </div>
        <div className="font-semibold mb-2">{task.title}</div>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Clock className="h-3 w-3 mr-1" />
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <Badge variant={priorityBadge.variant} className="capitalize flex items-center">
            {priorityBadge.icon}
            {task.priority}
          </Badge>
          <Avatar className="h-7 w-7">
            <AvatarImage src={task.assignee?.profileImage} alt={task.assignee?.name || "User"} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {task.assignee?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};