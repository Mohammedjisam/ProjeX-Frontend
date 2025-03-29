import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { CheckCircle2, FileText, Clock } from "lucide-react";
import { TaskDetails } from "../../../types/developer/task";
import { formatTaskDate } from "./taskUtils";
import TaskMetadata from "./TaskMetadata.tsx";
import TaskDescription from "./TaskDescription";
import TaskRemarks from "./TaskRemarks";

interface TaskDetailsCardProps {
  task: TaskDetails;
}

const TaskDetailsCard = ({ task }: TaskDetailsCardProps) => (
  <Card className="bg-[#252b3b] border-gray-700 col-span-2">
    <CardHeader>
      <CardTitle className="text-white">Task Details</CardTitle>
      <CardDescription className="text-gray-400">
        Created on {formatTaskDate(task.createdAt)}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <TaskMetadata task={task} />
      <TaskDescription description={task.description} />
      {task.remarks && <TaskRemarks remarks={task.remarks} />}
    </CardContent>
    <CardFooter className="border-t border-gray-700 flex justify-between pt-6">
      <Button 
        className={`${
          task.status === 'completed' 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {task.status === 'completed' ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Completed
          </>
        ) : (
          <>
            <Clock className="mr-2 h-4 w-4" />
            Update Status
          </>
        )}
      </Button>
      <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
        <FileText className="mr-2 h-4 w-4" />
        Add Remarks
      </Button>
    </CardFooter>
  </Card>
);

export default TaskDetailsCard;