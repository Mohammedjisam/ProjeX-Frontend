export interface ProjectManager {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    status?: 'active' | 'inactive';
  }
  
  export interface ProjectManagerFormData {
    name: string;
    email: string;
    phoneNumber: string;
    password?: string;
  }
  
  export interface ProjectManagerResponse {
    success: boolean;
    message?: string;
    data?: ProjectManager | ProjectManager[];
  }

  export interface AddProjectManagerResponse {
    success: boolean;
    message: string;
    data?: {
      _id: string;
      name: string;
      email: string;
      phoneNumber: string;
    };
  }