export interface Project {
    _id: string;
    name: string;
    completionPercentage?: number;
    startDate: string;
    createdAt: string;
    status?: string;
    clientName?: string;
  }
  
  export interface ProjectCardProps {
    title: string;
    progress: number;
    delay: number;
  }
  
  export interface RecentProjectItemProps {
    title: string;
    date: string;
    delay: number;
  }
  
  export interface DashboardData {
    projects: Project[];
    recentProjects: Project[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
  }