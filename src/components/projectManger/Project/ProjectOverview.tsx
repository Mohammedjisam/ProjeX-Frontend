import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
  } from "../../../components/ui/card";
  import { Progress } from "../../../components/ui/progress";
  import { Button } from "../../../components/ui/button";
  import { 
    Calendar, 
    DollarSign, 
    Clock, 
    Target, 
    User, 
    CheckCircle2, 
    ListTodo, 
    CalendarClock 
  } from "lucide-react";
  import { format } from "date-fns";
  import { ProjectDetails } from "../../../types/projectManager/Project";
  
  interface ProjectOverviewProps {
    project: ProjectDetails;
    onViewTasks: () => void;
    onAddTask: () => void;
  }
  
  export const ProjectOverview = ({ project, onViewTasks, onAddTask }: ProjectOverviewProps) => {
    const formatDate = (dateString: string) => {
      try {
        return format(new Date(dateString), "dd MMM yyyy");
      } catch (error) {
        return "Invalid date";
      }
    };
  
    const calculateDaysLeft = (endDate: string) => {
      const today = new Date();
      const end = new Date(endDate);
      const diffTime = end.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
  
    return (
      <Card className="bg-[#252b3b] border-gray-700 col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Project Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Created on {formatDate(project.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline */}
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Timeline</p>
                <p className="text-white">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </p>
              </div>
            </div>
  
            {/* Budget */}
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Budget</p>
                <p className="text-white">
                  ${project.budget.toLocaleString()}
                </p>
              </div>
            </div>
  
            {/* Days Remaining */}
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Days Remaining</p>
                <p className="text-white">
                  {calculateDaysLeft(project.endDate)} days
                </p>
              </div>
            </div>
  
            {/* Goal */}
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Goal</p>
                <p className="text-white">{project.goal}</p>
              </div>
            </div>
  
            {/* Project Manager */}
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-orange-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Project Manager</p>
                <p className="text-white">
                  {project.projectManager?.name || "Not assigned"}
                </p>
              </div>
            </div>
  
            {/* Completion */}
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Completion</p>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-white">
                      {project.completionPercentage || 0}%
                    </span>
                  </div>
                  <Progress
                    value={project.completionPercentage || 0}
                    className="h-2 bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
  
          {/* Description */}
          <div>
            <h3 className="text-white font-medium mb-2">Description</h3>
            <p className="text-gray-300">{project.description}</p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-700 flex justify-between pt-6">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onViewTasks}
          >
            <ListTodo className="mr-2 h-4 w-4" />
            Show Tasks
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-700"
            onClick={onAddTask}
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule Task
          </Button>
        </CardFooter>
      </Card>
    );
  };