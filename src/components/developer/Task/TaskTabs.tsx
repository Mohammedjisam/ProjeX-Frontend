import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import TimelineTab from "./TimelineTab";
import ActivityTab from "./ActivityTab";
import { TaskDetails } from "../../../types/developer/task";


interface TaskTabsProps {
  task: TaskDetails;
}

const TaskTabs = ({ task }: TaskTabsProps) => (
  <Tabs defaultValue="timeline" className="w-full">
    <TabsList className="bg-[#252b3b] border-gray-700">
      <TabsTrigger value="timeline" className="data-[state=active]:bg-gray-700">
        Timeline
      </TabsTrigger>
      <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">
        Activity Log
      </TabsTrigger>
    </TabsList>
    <TimelineTab task={task} />
    <ActivityTab />
  </Tabs>
);

export default TaskTabs;