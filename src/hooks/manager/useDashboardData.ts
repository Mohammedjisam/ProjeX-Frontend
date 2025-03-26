import { useState, useEffect } from "react";
import projectAxiosInstance from "../../utils/ProjectAxioInstance";
import { Project, DashboardData } from "../../types/manager/Dashboard";

export const useDashboardData = (): DashboardData => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await projectAxiosInstance.get<{
        success: boolean;
        data: Project[];
      }>("/getallprojects");
      
      if (response.data.success) {
        const allProjects = response.data.data;
        setProjects(allProjects.slice(0, 3));
        
        const sortedByDate = [...allProjects].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentProjects(sortedByDate.slice(0, 2));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    recentProjects,
    loading,
    error,
    refetch: fetchProjects
  };
};