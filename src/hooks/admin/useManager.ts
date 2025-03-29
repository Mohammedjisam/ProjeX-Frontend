import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchManagers,
  toggleManagerStatus,
  deleteManager,
} from "../../services/admin/manager.services";

export const useManagers = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: fetchManagers,
    onError: (error) => {
      toast.error("Failed to load managers");
      console.error(error);
    },
  });
};

export const useToggleManagerStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleManagerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] });
      toast.success("Manager status updated");
    },
    onError: (error) => {
      toast.error("Failed to update status");
      console.error(error);
    },
  });
};

export const useDeleteManager = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] });
      toast.success("Manager deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete manager");
      console.error(error);
    },
  });
};