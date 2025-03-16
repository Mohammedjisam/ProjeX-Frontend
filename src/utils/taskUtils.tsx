// src/utils/taskUtils.ts

import axiosInstance from '../utils/AxiosConfig'

export interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  assignee: {
    _id: string;
    name: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  project?: {
    _id: string;
    name: string;
    clientName?: string;
  };
  description?: string;
  priority?: string;
  remarks?: string;
  createdBy?: {
    _id: string;
    name: string;
    email?: string;
  };
}

export interface TasksResponse {
  success: boolean;
  count: number;
  total: number;
  pagination: {
    current: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  data: Task[];
}

export interface DeveloperTasksResponse {
  success: boolean;
  taskCounts: {
    total: number;
    completed: number;
    pending: number;
  };
  recentTasks: Task[];
}

// export const fetchTasksByProject = async (projectId: string, page = 1, limit = 50): Promise<Task[]> => {
//   try {
//     const response = await axiosInstance.get<TasksResponse>(`/task/project/${projectId}`, {
//       params: { page, limit }
//     });
    
//     if (response.data.success) {
//       return response.data.data;
//     } else {
//       throw new Error('Failed to fetch tasks');
//     }
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     throw error;
//   }
// };

// New function to fetch tasks by developer ID
export const fetchTasksByDeveloper = async (developerId: string): Promise<DeveloperTasksResponse> => {
  try {
    // Using POST as specified in the backend API
    const response = await axiosInstance.post<DeveloperTasksResponse>('/task/assignee', {
      assigneeId: developerId
    });
    
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error('Failed to fetch developer tasks');
    }
  } catch (error) {
    console.error('Error fetching tasks by developer:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, status: string): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/task/${taskId}`, { status });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to update task status');
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};



// Map backend status values to frontend display values (if needed)
export const mapStatusToDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'not-started',
    'in-progress': 'in-progress',
    'completed': 'completed'
  };
  
  return statusMap[status] || status;
};

// Map frontend display values to backend status values (if needed)
export const mapDisplayToStatus = (display: string): string => {
  const displayMap: Record<string, string> = {
    'not-started': 'pending',
    'in-progress': 'in-progress', 
    'completed': 'completed'
  };
  
  return displayMap[display] || display;
};