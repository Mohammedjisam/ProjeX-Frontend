export interface DeveloperData {
    id: string;
    name?: string;
    email?: string;
    profileImage?: string;
  }
  
  export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "on-hold";
    dueDate: string;
    priority: "low" | "medium" | "high" | "urgent";
    project?: {
      name: string;
    };
    assignee: {
      name: string;
      _id: string;
      profileImage?: string;
    };
  }
  
  export interface Column {
    id: string;
    title: string;
    tasks: Task[];
  }
  
  export interface ColumnsState {
    [key: string]: Column;
  }
  
  export interface TasksResponse {
    success: boolean;
    data: Task[];
    message?: string;
  }
  
  export interface StatusUpdateResponse {
    success: boolean;
    message?: string;
  }
  
  export interface ReduxState {
    developer: {
      developerData: DeveloperData;
    };
  }


  export interface Project {
    _id: string;
    name: string;
    clientName: string;
    status: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
  }
  
  export interface TaskDetails extends Task {
    project: Project;
    assignee: User;
    createdBy: User;
    remarks?: string;
    createdAt: string;
    updatedAt: string;
    daysRemaining: number;
    isOverdue: boolean;
  }
  
  export interface TaskResponses {
    success: boolean;
    data: TaskDetails;
    message?: string;
  }