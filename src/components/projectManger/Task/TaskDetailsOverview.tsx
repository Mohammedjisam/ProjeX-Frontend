// TaskDetailsOverview.tsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../ui/card";
import { Button } from "../../ui/button";
import { 
  Calendar, 
  AlarmClock, 
  Flag, 
  CheckCircle2, 
  Briefcase, 
  User,
  Clock,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

interface TaskDetailsOverviewProps {
  task: {
    dueDate: string;
    daysRemaining: number;
    isOverdue: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
    project: {
      _id: string;
      name: string;
      clientName: string;
    };
    createdBy: {
      name: string;
    };
    description: string;
    remarks?: string;
    createdAt: string;
    updatedAt: string;
  };
  onEditTask: () => void;
  onUpdateStatus: () => void;
  onAddRemarks: () => void;
}

export const TaskDetailsOverview = ({ 
  task,
  onEditTask,
  onUpdateStatus,
  onAddRemarks
}: TaskDetailsOverviewProps) => {
  return (
    <Card className="bg-[#252b3b] border-gray-700 col-span-2">
      <CardHeader>
        <CardTitle className="text-white">Task Details</CardTitle>
        <CardDescription className="text-gray-400">
          Created on {task.createdAt}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-gray-400 text-sm">Due Date</p>
              <p className="text-white">{task.dueDate}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <AlarmClock className="h-5 w-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-gray-400 text-sm">Days Remaining</p>
              <p className={`${task.isOverdue ? 'text-red-400' : 'text-white'}`}>
                {task.isOverdue 
                  ? 'Overdue' 
                  : task.daysRemaining > 0 
                    ? `${task.daysRemaining} days` 
                    : 'Due today'
                }
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Flag className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-gray-400 text-sm">Priority</p>
              <p className="text-white capitalize">{task.priority}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-white capitalize">{task.status}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Briefcase className="h-5 w-5 text-purple-400 mt-0.5" />
            <div>
              <p className="text-gray-400 text-sm">Project</p>
              <p className="text-white">
                <Link to={`/projectmanager/projects/${task.project._id}`} className="hover:text-blue-400">
                  {task.project.name}
                </Link>
              </p>
              <p className="text-gray-400 text-xs">{task.project.clientName}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-cyan-400 mt-0.5" />
            <div>
              <p className="text-gray-400 text-sm">Created By</p>
              <p className="text-white">{task.createdBy.name}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-medium mb-2">Description</h3>
          <p className="text-gray-300">{task.description}</p>
        </div>

        {task.remarks && (
          <div>
            <h3 className="text-white font-medium mb-2">Remarks</h3>
            <p className="text-gray-300">{task.remarks}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-700 flex justify-between pt-6">
        <Button 
          className={`${
            task.status === 'completed' 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          onClick={onUpdateStatus}
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
        <Button
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
          onClick={onAddRemarks}
        >
          <FileText className="mr-2 h-4 w-4" />
          Add Remarks
        </Button>
      </CardFooter>
    </Card>
  );
};