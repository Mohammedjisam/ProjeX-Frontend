import { useQuery } from "@tanstack/react-query";
import { fetchProjects,fetchProjectDetails,fetchProjectStats } from "../../services/projectManager/project.services";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import { toast } from "sonner";

export const useProjects = () => {
  const projectManagerData = useSelector((state: RootState) => state.projectManager.projectManagerData);
  
  return useQuery({
    queryKey: ['projects', projectManagerData?._id],
    queryFn: () => fetchProjects(projectManagerData?._id),
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: !!projectId,
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useProjectStats = () => {
  return useQuery({
    queryKey: ['projectStats'],
    queryFn: fetchProjectStats
  });
};