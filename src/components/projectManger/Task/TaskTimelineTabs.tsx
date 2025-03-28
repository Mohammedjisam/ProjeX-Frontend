// TaskTimelineTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { Clock } from "lucide-react";

interface TaskTimelineTabsProps {
  task: {
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    isOverdue: boolean;
    daysRemaining: number;
    createdBy: {
      name: string;
    };
  };
}

export const TaskTimelineTabs = ({ task }: TaskTimelineTabsProps) => {
  return (
    <Tabs defaultValue="timeline" className="w-full">
      <TabsList className="bg-[#252b3b] border-gray-700">
        <TabsTrigger value="timeline" className="data-[state=active]:bg-gray-700">
          Timeline
        </TabsTrigger>
        <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">
          Activity Log
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="timeline">
        <Card className="bg-[#252b3b] border-gray-700 mt-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4 pb-4">
                <div className="flex justify-between">
                  <p className="text-white font-medium">Task Created</p>
                  <p className="text-gray-400 text-sm">{task.createdAt}</p>
                </div>
                <p className="text-gray-300 mt-1">
                  Created by {task.createdBy.name}
                </p>
              </div>
              
              {task.createdAt !== task.updatedAt && (
                <div className="border-l-2 border-yellow-500 pl-4 pb-4">
                  <div className="flex justify-between">
                    <p className="text-white font-medium">Task Updated</p>
                    <p className="text-gray-400 text-sm">{task.updatedAt}</p>
                  </div>
                  <p className="text-gray-300 mt-1">
                    Last modified on {task.updatedAt}
                  </p>
                </div>
              )}
              
              <div className={`border-l-2 ${task.isOverdue ? 'border-red-500' : 'border-green-500'} pl-4 pb-4`}>
                <div className="flex justify-between">
                  <p className="text-white font-medium">Due Date</p>
                  <p className={`text-sm ${task.isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
                    {task.dueDate}
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
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="activity">
        <Card className="bg-[#252b3b] border-gray-700 mt-6">
          <CardContent className="pt-6">
            <div className="text-center text-gray-400 py-8">
              <Clock className="mx-auto h-12 w-12 opacity-20 mb-2" />
              <p>Activity log coming soon</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};