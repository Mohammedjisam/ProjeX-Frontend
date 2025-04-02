
export interface Project {
  _id: string;
  name: string;
  clientName: string;
  status: "planned" | "in-progress" | "completed" | "on-hold" | "created" | "closed";
  endDate: string;
  companyAdminIsVerified: boolean;
}

export interface ProjectDetails extends Project {
  description: string;
  budget: number;
  startDate: string;
  goal: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  projectManager: ProjectManager;
  developers?: DeveloperRef[];
  tasks?: TaskRef[];
}

export interface ProjectFormData {
  name: string;
  description: string;
  clientName: string;
  budget: number | "";
  startDate: string;
  endDate: string;
  projectManager: string;
  goal: string;
  status: "planned" | "in-progress" | "completed" | "on-hold";
  comments?: string;
}

export interface ProjectManager {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface DeveloperRef {
  _id: string;
  name: string;
  email: string;
}

export interface TaskRef {
  _id: string;
  title: string;
  status: string;
}

export interface ProjectsResponse<T = ProjectDetails> {
  success: boolean;
  message?: string;
  data?: T | T[];
}

export interface ProjectDetailsResponse extends ProjectsResponse<ProjectDetails> {}
export interface AddProjectResponse extends ProjectsResponse<ProjectDetails> {}


export interface ProjectStats {
  totalProjects: number;
  completed: number;
  overdue: number;
  active: number;
}


export interface ProjectTimelineEvent {
  date: string;
  eventType: "status-change" | "milestone" | "note";
  title: string;
  description?: string;
  changedBy?: ProjectManager;
}


export interface ProjectAttachment {
  _id: string;
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy: DeveloperRef | ProjectManager;
}

export interface ProjectPreview extends Pick<Project, "_id" | "name" | "status"> {
  progress: number;
  teamCount: number;
}

export interface ProjectFilters {
  status?: Project["status"][];
  dateRange?: {
    start: string;
    end: string;
  };
  searchQuery?: string;
}


export interface ProjectUpdatePayload extends Omit<ProjectFormData, 'budget'> {
  budget: number;
  lastUpdatedBy: string; 
}

export interface ProjectUpdateResponse extends ProjectsResponse<ProjectDetails> {
  updatedFields: string[];
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
