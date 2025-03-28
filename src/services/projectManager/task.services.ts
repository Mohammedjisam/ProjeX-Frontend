import { 
    TaskDetails, 
    TaskDetailsResponse,CreateTaskPayload, CreateTaskResponse,
    TaskResponse,UserRef
  } from "../../types/projectManager/Task";
import managerAxiosInstance from "../../utils/ManagerAxiosInstance";
  import taskAxiosInstance from "../../utils/TaskAxiosInstance";

  export const fetchTasksByProject = async (projectId: string): Promise<TaskDetails[]> => {
    try {
      const response = await taskAxiosInstance.get<TaskResponse>(`/project/${projectId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch tasks");
      }
      
      return response.data.data || [];
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch tasks");
    }
  };
  
  export const deleteTask = async (taskId: string): Promise<void> => {
    try {
      const response = await taskAxiosInstance.delete(`/${taskId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete task");
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to delete task");
    }
  };
  
  export const fetchTaskDetails = async (
    taskId: string
  ): Promise<TaskDetails> => {
    try {
      const response = await taskAxiosInstance.get<TaskDetailsResponse>(
        `/${taskId}`
      );
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Task not found");
      }
      
      return response.data.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch task details");
    }
  };
  
  export const updateTaskStatus = async (
    taskId: string,
    status: TaskDetails["status"]
  ): Promise<TaskDetails> => {
    try {
      const response = await taskAxiosInstance.patch<TaskDetailsResponse>(
        `/${taskId}/status`,
        { status }
      );
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Failed to update task status");
      }
      
      return response.data.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to update task status");
    }
  };
  
  export const addTaskRemark = async (
    taskId: string,
    remarks: string
  ): Promise<TaskDetails> => {
    try {
      const response = await taskAxiosInstance.patch<TaskDetailsResponse>(
        `/${taskId}/remarks`,
        { remarks }
      );
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Failed to add remarks");
      }
      
      return response.data.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to add remarks");
    }
  };

  export const createTask = async (taskData: CreateTaskPayload): Promise<TaskDetails> => {
    try {
      const response = await taskAxiosInstance.post<CreateTaskResponse>(
        `/project/${taskData.projectId}`,
        taskData
      );
      
      if (!response.data.success || !response.data.data) {
        const errorMessage = response.data.message || "Failed to create task";
        const errors = response.data.errors?.reduce((acc, err) => ({
          ...acc,
          [err.field]: err.message
        }), {} as Record<string, string>);
        
        throw new Error(errors ? JSON.stringify(errors) : errorMessage);
      }
      
      return response.data.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error("Failed to create task");
    }
  };
  
  export const fetchDevelopers = async (): Promise<UserRef[]> => {
    try {
      const response = await managerAxiosInstance.get("/getalldeveloper");
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch developers");
      }
      
      return response.data.data || [];
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch developers");
    }
  };