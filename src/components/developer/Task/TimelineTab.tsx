import { TabsContent } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card"
import { TaskDetails } from "../../../types/developer/task";
import { formatTaskDate } from "./taskUtils";

interface TimelineTabProps {
  task: TaskDetails;
}

const TimelineTab = ({ task }: TimelineTabProps) => (
  <TabsContent value="timeline">
    <Card className="bg-[#252b3b] border-gray-700 mt-6">
      <CardContent className="pt-6">
        <div className="border-l-2 border-blue-500 pl-4 pb-4">
          <div className="flex justify-between">
            <p className="text-white font-medium">Task Created</p>
            <p className="text-gray-400 text-sm">{formatTaskDate(task.createdAt)}</p>
          </div>
          <p className="text-gray-300 mt-1">
            Created by {task.createdBy.name}
          </p>
        </div>
        
        {task.createdAt !== task.updatedAt && (
          <div className="border-l-2 border-yellow-500 pl-4 pb-4">
            <div className="flex justify-between">
              <p className="text-white font-medium">Task Updated</p>
              <p className="text-gray-400 text-sm">{formatTaskDate(task.updatedAt)}</p>
            </div>
            <p className="text-gray-300 mt-1">
              Last modified on {formatTaskDate(task.updatedAt)}
            </p>
          </div>
        )}
        
        <div className={`border-l-2 ${task.isOverdue ? 'border-red-500' : 'border-green-500'} pl-4 pb-4`}>
          <div className="flex justify-between">
            <p className="text-white font-medium">Due Date</p>
            <p className={`text-sm ${task.isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
              {formatTaskDate(task.dueDate)}
            </p>
          </div>
          <p className={`mt-1 ${task.isOverdue ? 'text-red-400' : 'text-gray-300'}`}>
            {task.isOverdue 
              ? 'This task is overdue' 
              : task.daysRemaining > 0 
                ? `${task.daysRemaining} days remaining` 
                : 'Due today'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);

export default TimelineTab;