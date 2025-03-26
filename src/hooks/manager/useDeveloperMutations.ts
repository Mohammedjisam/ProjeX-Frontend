import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addNewDeveloper } from '../../services/manager/developer.services';
import { DeveloperFormData } from '../../types/Manager/Developer';

export const useAddDeveloper = () => {
  return useMutation({
    mutationFn: addNewDeveloper,
    onSuccess: (data) => {
      toast.success(data.message || 'Developer added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add developer');
    }
  });
};