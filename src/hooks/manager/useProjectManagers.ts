import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  fetchProjectManagers, 
  createProjectManager, 
  updateProjectManager, 
  toggleProjectManagerStatus, 
  deleteProjectManager 
} from '../../services/manager/projectManager.services';
import { ProjectManager, ProjectManagerFormData } from '../../types/Manager/ProjectManager';
import { toast } from 'sonner';

export const useProjectManagers = () => {
  const queryClient = useQueryClient();

  const { data: projectManagers = [], isLoading, error } = useQuery<ProjectManager[], Error>({
    queryKey: ['projectManagers'],
    queryFn: fetchProjectManagers
  });

  const createMutation = useMutation({
    mutationFn: createProjectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectManagers'] });
      toast.success('Project manager created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<ProjectManagerFormData> }) => 
      updateProjectManager(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectManagers'] });
      toast.success('Project manager updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleProjectManagerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectManagers'] });
      toast.success('Project manager status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProjectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectManagers'] });
      toast.success('Project manager deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    projectManagers,
    isLoading,
    error,
    createProjectManager: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProjectManager: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    toggleProjectManagerStatus: toggleStatusMutation.mutateAsync,
    isToggling: toggleStatusMutation.isPending,
    deleteProjectManager: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending
  };
};