import { 
  ProjectsResponse, 
  Project,
  ProjectDetails, 
  ProjectDetailsResponse, 
  ProjectStats
} from "../../types/Manager/Project";
import projectAxiosInstance from "../../utils/ProjectAxioInstance";

export const fetchProjects = async (projectManagerId?: string): Promise<Project[]> => {
  try {
    const endpoint = projectManagerId 
      ? `/projectmanager/${projectManagerId}`
      : "/getallprojects";
      
    const response = await projectAxiosInstance.get<ProjectsResponse>(endpoint);
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch projects");
    }
    
    return response.data.data || [];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch projects");
  }
};

export const fetchProjectDetails = async (
  projectId: string,
  managerId?: string
): Promise<ProjectDetails> => {
  try {
    const endpoint = managerId
      ? `/projectmanager/${managerId}/project/${projectId}`
      : `/getallprojects/${projectId}`;
    
    const response = await projectAxiosInstance.get<ProjectDetailsResponse>(endpoint);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Project not found");
    }
    
    return response.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch project details");
  }
};

export const fetchProjectStats = async (): Promise<ProjectStats> => {
  try {
    const response = await projectAxiosInstance.get<{ data: ProjectStats }>("/stats");
    return response.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch project stats");
  }
};

export const createProject = async (projectData: any): Promise<ProjectDetails> => {
  try {
    const response = await projectAxiosInstance.post<ProjectDetailsResponse>(
      "/addnewproject",
      projectData
    );
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to create project");
    }
    
    return response.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create project");
  }
};

export const updateProject = async (
  projectId: string,
  projectData: any
): Promise<ProjectDetails> => {
  try {
    const response = await projectAxiosInstance.put<ProjectDetailsResponse>(
      `/updateproject/${projectId}`,
      projectData
    );
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to update project");
    }
    
    return response.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update project");
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const response = await projectAxiosInstance.delete(`/getallprojects/${projectId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete project");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to delete project");
  }
};

export const addComment = async (
  projectId: string,
  commentData: { text: string; authorId: string }
): Promise<ProjectDetails> => {
  try {
    const response = await projectAxiosInstance.post<ProjectDetailsResponse>(
      `/getallprojects/${projectId}/comments`,
      commentData
    );
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to add comment");
    }
    
    return response.data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to add comment");
  }
};