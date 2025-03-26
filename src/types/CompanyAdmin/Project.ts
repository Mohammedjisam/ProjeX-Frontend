// src/types/Project.ts
export interface Project {
    _id: string;
    name: string;
    clientName: string;
    status: "planned" | "in-progress" | "completed" | "on-hold";
    endDate: string;
    companyAdminIsVerified: boolean;
    startDate: string;
  }

  export interface Comment {
    _id: string;
    text: string;
    author: {
      _id: string;
      name: string;
      role: string;
    };
    createdAt: string;
  }
  
  export interface ProjectManager {
    _id: string;
    name: string;
    email: string;
    role: string;
  }
  
  export interface ProjectData {
    projectId: string;
    name: string;
    description: string;
    clientName: string;
    budget: number;
    startDate: string;
    endDate: string;
    projectManager: ProjectManager;
    goal: string;
    status: "planned" | "in-progress" | "completed" | "on-hold";
    companyAdminIsVerified: boolean;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
  }