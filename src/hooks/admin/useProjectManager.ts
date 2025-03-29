import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchProjectManagers,
  toggleProjectManagerStatus,
  deleteProjectManager,
} from "../../services/admin/projectManager.services";

export const useProjectManagers = () => {
  return useQuery({
    queryKey: ["projectManagers"],
    queryFn: fetchProjectManagers,
    onError: (error) => {
      toast.error("Failed to load project managers");
      console.error(error);
    },
  });
};

export const useToggleProjectManagerStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleProjectManagerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectManagers"] });
      toast.success("Project manager status updated");
    },
    onError: (error) => {
      toast.error("Failed to update status");
      console.error(error);
    },
  });
};

export const useDeleteProjectManager = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProjectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectManagers"] });
      toast.success("Project manager deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete project manager");
      console.error(error);
    },
  });
};