export interface Developer {
    id?: string;
    _id?: string;
    name: string;
    email: string;
    role: string;
  }
  
  export interface Task {
    _id: string;
    title: string;
    dueDate: string;
    status: 'completed' | 'pending' | 'ongoing';
    project?: {
      name: string;
    };
  }
  
  export interface TaskCounts {
    total: number;
    completed: number;
    pending: number;
  }
  
  export interface DashboardResponse {
    success: boolean;
    message?: string;
    taskCounts?: TaskCounts;
    recentTasks?: Task[];
  }
  
  export interface Notification {
    id: number;
    text: string;
  }