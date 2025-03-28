import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  fetchTaskDetails,
  updateTaskStatus,
  addTaskRemark,fetchTasksByProject, deleteTask,createTask, fetchDevelopers 
} from "../../services/projectManager/task.services";
import { toast } from "sonner";

export const useProjectTasks = (projectId?: string) => {
    return useQuery({
      queryKey: ['tasks', projectId],
      queryFn: () => fetchTasksByProject(projectId!),
      enabled: !!projectId,
      onError: (error: Error) => {
        toast.error(error.message);
      }
    });
  };
  
  export const useDeleteTask = () => {
    return useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        toast.success("Task deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      }
    });
  };

export const useTaskDetails = (taskId?: string) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskDetails(taskId!),
    enabled: !!taskId,
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useUpdateTaskStatus = () => {
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: string }) => 
      updateTaskStatus(taskId, status),
    onSuccess: () => {
      toast.success("Task status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useAddTaskRemark = () => {
  return useMutation({
    mutationFn: ({ taskId, remarks }: { taskId: string; remarks: string }) =>
      addTaskRemark(taskId, remarks),
    onSuccess: () => {
      toast.success("Remarks added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useCreateTask = () => {
    return useMutation({
      mutationFn: createTask,
      onSuccess: () => {
        toast.success("Task created successfully");
      },
      onError: (error: Error) => {
        try {
          const errors = JSON.parse(error.message);
          if (typeof errors === 'object') {
            Object.values(errors).forEach((err) => {
              if (typeof err === 'string') toast.error(err);
            });
          } else {
            toast.error(error.message);
          }
        } catch {
          toast.error(error.message);
        }
      }
    });
  };
  
  export const useDevelopers = () => {
    return useQuery({
      queryKey: ['developers'],
      queryFn: fetchDevelopers,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };