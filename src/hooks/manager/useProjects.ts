import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchAllProjects, getProjectDetails,getAllProjectManagers,updateProject , addProjectComment, 
  deleteProject} from "../../services/manager/project.services";
import { Project ,ProjectUpdatePayload} from "../../types/Manager/Project";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export const useProjects = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetchAllProjects();
      if (response.success) {
        return response.data || [];
      }
      throw new Error(response.message || "Failed to fetch projects");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    projects: data as Project[],
    isLoading,
    error,
    refetch
  };
};
export const useProjectDetails = (projectId: string) => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectDetails(projectId),
    onError: (error: Error) => toast.error(error.message)
  });
};

export const useProjectManagers = () => {
  return useQuery({
    queryKey: ['projectManagers'],
    queryFn: getAllProjectManagers,
    onError: (error: Error) => toast.error(error.message)
  });
};

export const useUpdateProject = (projectId: string) => {
  return useMutation({
    mutationFn: (data: ProjectUpdatePayload) => updateProject(projectId, data),
    onSuccess: () => toast.success("Project updated successfully"),
    onError: (error: Error) => toast.error(error.message)
  });
};
export const useAddComment = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment, authorId }: { comment: string; authorId: string }) => 
      addProjectComment(projectId, comment, authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success("Comment added successfully");
    },
    onError: (error: Error) => toast.error(error.message)
  });
};

export const useDeleteProject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      navigate("/manager/projects");
    },
    onError: (error: Error) => toast.error(error.message)
  });
};