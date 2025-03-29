import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { TaskDetails } from "../../../types/developer/task";
import OverdueAlert from "./OverdueAlert";

interface TaskSidebarProps {
  task: TaskDetails;
}

const TaskSidebar = ({ task }: TaskSidebarProps) => (
  <div className="space-y-6">
    <Card className="bg-[#252b3b] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Assigned To</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            {task.assignee.profileImage ? (
              <AvatarImage src={task.assignee.profileImage} alt={task.assignee.name} />
            ) : (
              <AvatarFallback className="bg-blue-600 text-white">
                {task.assignee.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-white font-medium">{task.assignee.name}</p>
            <p className="text-gray-400 text-sm">{task.assignee.email}</p>
            <Badge className="mt-2 bg-gray-700 text-white">{task.assignee.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
    
    {task.isOverdue && task.status !== 'completed' && (
      <OverdueAlert dueDate={task.dueDate} />
    )}
    
    <Card className="bg-[#252b3b] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
        >
          <MessageSquare className="mr-2 h-4 w-4 text-purple-400" />
          Add Comment
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default TaskSidebar;