// TaskDetailsPage.tsx
"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useTaskDetails, useUpdateTaskStatus, useAddTaskRemark } from "../../hooks/projectManager/useTask";
import Sidebar from "../../components/projectManger/Sidebar";
import { TaskDetailsHeader } from "../../components/projectManger/Task/TaskDetailsHeader";
import { TaskDetailsOverview } from "../../components/projectManger/Task/TaskDetailsOverview";
import { TaskAssigneeCard } from "../../components/projectManger/Task/TaskAssigneeCard";
import { TaskActionsCard } from "../../components/projectManger/Task/TaskActionsCard";
import { TaskStatusAlert } from "../../components/projectManger/Task/TaskStatusAlert";
import { TaskTimelineTabs } from "../../components/projectManger/Task/TaskTimelineTabs";
import { TaskDetailsSkeleton } from "../../components/projectManger/Task/TaskDetailsSkeleton";
import { TaskDetailsError } from "../../components/projectManger/Task/TaskDetailsError";
import { format } from "date-fns";

export const TaskDetailsPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { 
    data: task, 
    isLoading, 
    error,
    refetch 
  } = useTaskDetails(taskId);
  
  const updateStatusMutation = useUpdateTaskStatus();
  const addRemarkMutation = useAddTaskRemark();

  const handleBack = () => navigate(-1);
  const handleEditTask = () => navigate(`/projectmanager/tasks/${taskId}/edit`);
  
  const handleUpdateStatus = () => {
    if (task && taskId) {
      const newStatus = task.status === 'completed' ? 'in-progress' : 'completed';
      updateStatusMutation.mutate(
        { taskId, status: newStatus },
        { onSuccess: () => refetch() }
      );
    }
  };

  const handleAddRemarks = () => {
    const remarks = prompt("Enter your remarks:");
    if (remarks && taskId) {
      addRemarkMutation.mutate(
        { taskId, remarks },
        { onSuccess: () => refetch() }
      );
    }
  };

  const handleAddComment = () => {
    navigate(`/projectmanager/tasks/${taskId}/comments/new`);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#1a1f2e]">
        <Sidebar />
        <div className="flex-1 ml-[240px] p-6">
          <TaskDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#1a1f2e]">
        <Sidebar />
        <div className="flex-1 ml-[240px] p-6">
          <TaskDetailsError 
            error={error} 
            onRetry={() => refetch()} 
          />
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen bg-[#1a1f2e]">
        <Sidebar />
        <div className="flex-1 ml-[240px] p-6">
          <div className="text-center text-white py-8">
            Task not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#1a1f2e]">
      <Sidebar />
      <div className="flex-1 ml-[240px] p-6">
        <div className="max-w-7xl mx-auto">
          <TaskDetailsHeader 
            title={task.title}
            project={task.project}
            priority={task.priority}
            status={task.status}
            onBack={handleBack}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <TaskDetailsOverview 
              task={{
                ...task,
                dueDate: formatDate(task.dueDate),
                createdAt: formatDate(task.createdAt),
                updatedAt: formatDate(task.updatedAt),
                daysRemaining: task.daysRemaining,
                isOverdue: task.isOverdue
              }}
              onEditTask={handleEditTask}
              onUpdateStatus={handleUpdateStatus}
              onAddRemarks={handleAddRemarks}
            />

            <div className="space-y-6">
              <TaskAssigneeCard 
                assignee={task.assignee}
                createdBy={task.createdBy}
              />

              {task.isOverdue && task.status !== 'completed' && (
                <TaskStatusAlert 
                  dueDate={formatDate(task.dueDate)}
                />
              )}

              <TaskActionsCard 
                onEditTask={handleEditTask}
                onAddComment={handleAddComment}
              />
            </div>
          </div>

          <TaskTimelineTabs 
            task={{
              createdAt: formatDate(task.createdAt),
              updatedAt: formatDate(task.updatedAt),
              dueDate: formatDate(task.dueDate),
              isOverdue: task.isOverdue,
              daysRemaining: task.daysRemaining,
              createdBy: task.createdBy
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;