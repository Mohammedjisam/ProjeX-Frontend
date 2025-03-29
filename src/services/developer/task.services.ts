import { TasksResponse, StatusUpdateResponse,TasksResponses } from "../../types/developer/task";
import taskAxiosInstance from "../../utils/TaskAxiosInstance";

export const fetchDeveloperTasks = async (developerId: string): Promise<TasksResponse> => {
  try {
    const response = await taskAxiosInstance.post(`/developer`, { developerId });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const updateTaskStatus = async (
    taskId: string, 
    newStatus: string
  ): Promise<StatusUpdateResponse> => {
    try {
      const response = await taskAxiosInstance.post("/updatestatus", {
        taskId,
        status: newStatus
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update task status');
      }
  
      return response.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to update task status'
      );
    }
  };

  export const fetchTaskDetails = async (taskId: string): Promise<TasksResponses> => {
    try {
      const response = await taskAxiosInstance.get(`/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task details:", error);
      throw new Error("Failed to fetch task details");
    }
  };