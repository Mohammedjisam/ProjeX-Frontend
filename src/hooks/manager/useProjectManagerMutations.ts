import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addNewProjectManager } from '../../services/manager/projectManager.services';

export const useAddProjectManager = () => {
  return useMutation({
    mutationFn: addNewProjectManager,
    onSuccess: (data) => {
      toast.success(data.message || 'Project Manager added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add project manager');
    }
  });
};