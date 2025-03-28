export interface UserRef {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
  }
  
  export interface ProjectRef {
    _id: string;
    name: string;
    clientName: string;
    status: string;
  }
  
  export interface TaskBase {
    _id: string;
    title: string;
    description: string;
    project: ProjectRef;
    status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate: string;
  }
  
  export interface TaskDetails extends TaskBase {
    assignee: UserRef;
    remarks?: string;
    createdBy: UserRef;
    createdAt: string;
    updatedAt: string;
    daysRemaining?: number;
    isOverdue?: boolean;
  }
  
  export interface TaskResponse<T = TaskDetails> {
    success: boolean;
    message?: string;
    data?: T | T[];
  }
  
  export interface TaskDetailsResponse extends TaskResponse<TaskDetails> {}
  
  export interface TaskFilters {
    searchQuery?: string;
    status?: TaskBase["status"][];
    priority?: TaskBase["priority"][];
    projectId?: string;
  }

  export interface TaskFormData {
    title: string;
    description: string;
    assignee: string;
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string;
    remarks: string;
  }
  
  export interface CreateTaskPayload extends TaskFormData {
    createdBy: string;
    projectId: string;
  }
  
  export interface CreateTaskResponse {
    success: boolean;
    message?: string;
    data?: Task;
    errors?: Array<{ field: string; message: string }>;
  }
