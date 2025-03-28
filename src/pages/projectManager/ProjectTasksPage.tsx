import { useParams, useNavigate } from "react-router-dom";
import { useProjectTasks, useDeleteTask } from "../../hooks/projectManager/useTask";
import Sidebar from "../../components/projectManger/Sidebar";
import {TaskTable} from "../../components/projectManger/Task/TaskTable"

export const ProjectTasksPage = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tasks, isLoading, error, refetch } = useProjectTasks(projectId);
  const { mutate: deleteTask } = useDeleteTask();

  const handleViewDetails = (taskId: string) => {
    navigate(`/projectmanager/projects/${projectId}/tasks/${taskId}`);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId, {
        onSuccess: () => refetch()
      });
    }
  };

  const handleCreateTask = () => {
    navigate(`/projectmanager/projects/${projectId}/addtask`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[240px] p-6">
        <div className="  mx-auto">
          <TaskTable
            tasks={tasks || []}
            isLoading={isLoading}
            error={error}
            projectId={projectId!}
            onViewDetails={handleViewDetails}
            onDeleteTask={handleDeleteTask}
            onCreateTask={handleCreateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTasksPage;