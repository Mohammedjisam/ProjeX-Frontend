import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchDevelopers,
  toggleDeveloperStatus,
  deleteDeveloper,
} from "../../services/admin/developer.services";

export const useDevelopers = () => {
  return useQuery({
    queryKey: ["developers"],
    queryFn: fetchDevelopers,
    onError: (error) => {
      toast.error("Failed to load developers");
      console.error(error);
    },
  });
};

export const useToggleDeveloperStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleDeveloperStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["developers"] });
      toast.success("Developer status updated");
    },
    onError: (error) => {
      toast.error("Failed to update status");
      console.error(error);
    },
  });
};

export const useDeleteDeveloper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDeveloper,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["developers"] });
      toast.success("Developer deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete developer");
      console.error(error);
    },
  });
};