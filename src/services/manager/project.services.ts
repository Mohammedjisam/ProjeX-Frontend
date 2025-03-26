import { ProjectsResponse,ProjectManager ,AddProjectResponse,ProjectFormData,ProjectUpdateResponse,ProjectDetails,ProjectUpdatePayload} from "../../types/Manager/Project";
import managerAxiosInstance from "../../utils/ManagerAxiosInstance";
import projectAxiosInstance from "../../utils/ProjectAxioInstance";

export const fetchAllProjects = async (): Promise<ProjectsResponse> => {
  const response = await projectAxiosInstance.get("/getallprojects");
  return response.data;
};
export const fetchProjectManagers = async (): Promise<ProjectManager[]> => {
    const response = await managerAxiosInstance.get('/getallprojectmanager');
    if (response.data?.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to fetch project managers');
  };
  
  export const addNewProject = async (data: ProjectFormData): Promise<AddProjectResponse> => {
    const formattedData = {
      ...data,
      budget: data.budget === "" ? 0 : Number(data.budget),
    };
    const response = await projectAxiosInstance.post('/addnewproject', formattedData);
    if (response.data?.success) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to add project');
  };

  export const getProjectDetails = async (projectId: string): Promise<ProjectDetails> => {
    const response = await projectAxiosInstance.get(`/getallprojects/${projectId}`);
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data as ProjectDetails;
  };
  
  export const getAllProjectManagers = async (): Promise<ProjectManager[]> => {
    const response = await managerAxiosInstance.get('/getallprojectmanager');
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  };
  
  export const updateProject = async (
    projectId: string,
    data: ProjectUpdatePayload
  ): Promise<ProjectUpdateResponse> => {
    const response = await projectAxiosInstance.put(`/updateproject/${projectId}`, data);
    return response.data;
  };
  
  export const addProjectComment = async (projectId: string, comment: string, authorId: string) => {
    const response = await managerAxiosInstance.post<ProjectsResponse>(
      `/project/getallprojects/${projectId}/comments`,
      { text: comment, authorId }
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data as ProjectDetails;
  };
  
  export const deleteProject = async (projectId: string) => {
    const response = await managerAxiosInstance.delete<ProjectsResponse>(
      `/project/getallprojects/${projectId}`
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data;
  };