import { Project } from '../../types/CompanyAdmin/Dashboard';
import { ProjectData } from '../../types/CompanyAdmin/Project';
import projectAxiosInstance from '../../utils/ProjectAxioInstance';


export const fetchProjects = async (): Promise<Project[]> => {
    const response = await projectAxiosInstance.get('/getallprojects');
    if (response.data?.success) {
      return response.data.data;
    }
    throw new Error('Failed to fetch projects');
  };

  export const fetchProject = async (projectId: string): Promise<ProjectData> => {
    const response = await projectAxiosInstance.get(`/getallprojects/${projectId}`);
    return response.data.data;
  };
  
  export const toggleVerification = async (projectId: string): Promise<{ success: boolean; message: string }> => {
    const response = await projectAxiosInstance.patch(`/projects/${projectId}/toggle-verification`);
    return response.data;
  };