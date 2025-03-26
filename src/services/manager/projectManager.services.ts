import { ProjectManager, ProjectManagerResponse ,ProjectManagerFormData,AddProjectManagerResponse } from '../../types/Manager/ProjectManager';
import managerAxiosInstance from '../../utils/ManagerAxiosInstance';

export const fetchProjectManagers = async (): Promise<ProjectManager[]> => {
  const response = await managerAxiosInstance.get<ProjectManagerResponse>('/getallprojectmanager');
  if (response.data?.success && response.data.data) {
    return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
  }
  throw new Error(response.data?.message || 'Failed to fetch project managers');
};

export const createProjectManager = async (data: ProjectManagerFormData): Promise<ProjectManager> => {
  const response = await managerAxiosInstance.post<ProjectManagerResponse>('/addprojectmanager', data);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to create project manager');
};

export const updateProjectManager = async (id: string, data: Partial<ProjectManagerFormData>): Promise<ProjectManager> => {
  const response = await managerAxiosInstance.put<ProjectManagerResponse>(`/getallprojectmanager/${id}`, data);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to update project manager');
};

export const toggleProjectManagerStatus = async (id: string): Promise<ProjectManager> => {
  const response = await managerAxiosInstance.patch<ProjectManagerResponse>(`/projectmanagers/${id}/status`);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to toggle project manager status');
};

export const deleteProjectManager = async (id: string): Promise<void> => {
  const response = await managerAxiosInstance.delete<ProjectManagerResponse>(`/getallprojectmanager/${id}`);
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to delete project manager');
  }
};
export const addNewProjectManager = async (data: ProjectManagerFormData): Promise<AddProjectManagerResponse> => {
    const response = await managerAxiosInstance.post('/addnewprojectmanager', data);
    if (response.data?.success) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to add project manager');
  };