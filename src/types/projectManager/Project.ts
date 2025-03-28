// Base interface for common project properties
export interface ProjectBase {
  _id: string;
  name: string;
  clientName: string;
  endDate: string;
}

// Main Project interface (for listings)
export interface Project extends ProjectBase {
  status: "ongoing" | "closed" | "created";
}


export interface ProjectDetails extends ProjectBase {
  description: string;
  budget: number;
  startDate: string;
  goal: string;
  status: "planned" | "in-progress" | "completed" | "on-hold";
  projectManager: ProjectManager;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  completionPercentage?: number;
}

export interface ProjectDetailsResponse {
  success: boolean;
  message?: string;
  data?: ProjectDetails;
}

export interface ProjectManager {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface Comment {
  _id: string;
  text: string;
  author: ProjectManager;
  createdAt: string;
}

// Response wrapper interfaces
export interface ProjectResponse<T = Project> {
  success: boolean;
  message?: string;
  data?: T | T[];
}


// Filter interface
export interface ProjectFilters {
  searchQuery?: string;
  status?: Project["status"][]; // Reference the status from Project
}

// Stats interface
export interface ProjectStats {
  totalProjects: number;
  completed: number;
  overdue: number;
  active: number;
}