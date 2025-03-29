"use client";

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../../components/developer/Sidebar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useTaskDetails } from "../../hooks/developer/useTaskDetails";
import TaskHeader from "../../components/developer/Task/TaskHeader";
import TaskDetailsCard from "../../components/developer/Task/TaskDetailsCard";
import TaskSidebar from "../../components/developer/Task/TaskSidebar";
import TaskTabs from "../../components/developer/Task/TaskTabs";
import SkeletonLoader from "../../components/developer/Task/SkeletonLoader";
import ErrorDisplay from "../../components/developer/Task/ErrorDisplay";
import NotFoundDisplay from '../../components/developer/Task/NotFoundDisplay'

const TaskDetailsPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { task, loading, error } = useTaskDetails(taskId);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  if (!task) return <NotFoundDisplay />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <ScrollArea className="h-screen w-full">
          <div className="p-6 max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white mb-4 flex items-center text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            <TaskHeader task={task} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <TaskDetailsCard task={task} />
              <TaskSidebar task={task} />
            </div>

            <TaskTabs task={task} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TaskDetailsPage;