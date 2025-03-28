import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { 
  fetchDashboardProjects, 
  processDashboardProjects,
  getDashboardStats
} from "../../services/projectManager/dashboard.services";
import { RootState } from "../../redux/Store";

export const useDashboard = (page: number = 1, limit: number = 9) => {
  const projectManagerId = useSelector(
    (state: RootState) => state.projectManager?.projectManagerData?.id
  );

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardProjects", projectManagerId, page, limit],
    queryFn: () => fetchDashboardProjects(projectManagerId, page, limit),
    enabled: !!projectManagerId,
    onError: (error: Error) => {
      toast.error(error.message || "Failed to fetch projects");
    },
  });

  const projects = response?.data || [];
  const processedProjects = processDashboardProjects(projects);
  const stats = getDashboardStats(processedProjects);
  const pagination = response?.pagination;

  return {
    projects: processedProjects,
    stats,
    pagination,
    isLoading,
    error,
    refetch,
  };
};