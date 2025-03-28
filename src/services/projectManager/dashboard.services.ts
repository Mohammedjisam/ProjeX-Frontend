import { DashboardProject, DashboardProjectsResponse, ProcessedDashboardProject } from "../../types/projectManager/Dashboard";
import projectAxiosInstance from "../../utils/ProjectAxioInstance";

export const fetchDashboardProjects = async (
  projectManagerId: string,
  page: number = 1,
  limit: number = 9
): Promise<DashboardProjectsResponse> => {
  const response = await projectAxiosInstance.get(
    `/projectmanager/${projectManagerId}?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const calculateWeeksRemaining = (endDate: string): number => {
  try {
    const deadlineDate = new Date(endDate);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(Math.ceil(diffDays / 7), 0);
  } catch (error) {
    console.error("Error calculating weeks remaining:", error);
    return 0;
  }
};

export const processDashboardProjects = (projects: DashboardProject[]): ProcessedDashboardProject[] => {
  return projects.map((project) => ({
    ...project,
    weeksRemaining: calculateWeeksRemaining(project.endDate),
    displayName: project.name || project.clientName,
    displayStatus: project.status,
    progress: project.completionPercentage || project.progress || 0,
  }));
};

export const getDashboardStats = (projects: ProcessedDashboardProject[]): DashboardStats => {
  const totalProjects = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;
  const averageProgress = Math.round(
    projects.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects
  ) || 0;

  return { totalProjects, completed, inProgress, averageProgress };
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed": return "bg-emerald-500";
    case "in-progress": return "bg-blue-500";
    case "planned": return "bg-amber-500";
    case "on-hold": return "bg-red-500";
    case "created": return "bg-teal-500";
    case "closed": return "bg-gray-500";
    default: return "bg-gray-500";
  }
};