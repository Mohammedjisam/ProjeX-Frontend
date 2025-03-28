export interface DashboardProject {
    _id: string;
    name: string;
    clientName: string;
    status: "planned" | "in-progress" | "completed" | "on-hold" | "created" | "closed";
    endDate: string;
    completionPercentage?: number;
    progress?: number;
  }
  
  export interface ProcessedDashboardProject extends DashboardProject {
    weeksRemaining: number;
    displayName: string;
    displayStatus: string;
  }
  
  export interface DashboardStats {
    totalProjects: number;
    completed: number;
    inProgress: number;
    averageProgress: number;
  }
  
  export interface DashboardProjectsResponse {
    success: boolean;
    message?: string;
    data?: DashboardProject[];
    pagination?: {
      current: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }
  
  export interface ProjectCardProps {
    title: string;
    subtitle: string;
    progress: number;
    weeksRemaining: number;
    delay?: number;
    status?: string;
  }
  
  export interface ProgressVisualizationProps {
    projects: ProcessedDashboardProject[];
  }