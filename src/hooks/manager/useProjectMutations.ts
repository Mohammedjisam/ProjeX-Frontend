import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchProjectManagers, addNewProject } from '../../services/manager/project.services';
import { ProjectManager, ProjectFormData } from '../../types/Manager/Project';

export const useProjectManagers = () => {
  return useQuery({
    queryKey: ['projectManagers'],
    queryFn: fetchProjectManagers,
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useAddProject = () => {
  return useMutation({
    mutationFn: addNewProject,
    onSuccess: (data) => {
      toast.success(data.message || 'Project created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create project');
    }
  });
};


