import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  fetchDevelopers, 
  createDeveloper, 
  updateDeveloper, 
  toggleDeveloperStatus, 
  deleteDeveloper 
} from '../../services/manager/developer.services'
import { Developer, DeveloperFormData } from '../../types/manager/Developer';
import { toast } from 'sonner';

export const useDevelopers = () => {
  const queryClient = useQueryClient();

  const { data: developers = [], isLoading, error } = useQuery<Developer[], Error>({
    queryKey: ['developers'],
    queryFn: fetchDevelopers
  });

  const createMutation = useMutation({
    mutationFn: createDeveloper,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
      toast.success('Developer created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<DeveloperFormData> }) => 
      updateDeveloper(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
      toast.success('Developer updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleDeveloperStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
      toast.success('Developer status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDeveloper,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
      toast.success('Developer deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  return {
    developers,
    isLoading,
    error,
    createDeveloper: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateDeveloper: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    toggleDeveloperStatus: toggleStatusMutation.mutateAsync,
    isToggling: toggleStatusMutation.isPending,
    deleteDeveloper: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending
  };
};