// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { fetchManagers } from '../../services/companyAdmin/companyAdmin.services';
import { fetchProjects } from '../../services/Project/project.services';
import { Manager, Project, TransformedProject } from '../../types/Dashboard';

export const useDashboardData = () => {
  const managersQuery = useQuery<Manager[]>({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  });

  const projectsQuery = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    enabled: !!managersQuery.data,
  });

  const transformProjects = (projects: Project[], managers: Manager[]): TransformedProject[] => {
    return projects.map((project) => {
      const color = getStatusColor(project.status);
      const timeAgo = calculateTimeAgo(project.startDate);
      const { managerName, managerId } = getManagerInfo(project.projectManager, managers);

      return {
        id: project._id,
        title: project.name,
        color,
        managerId,
        user: {
          name: managerName,
          avatar: '/placeholder.svg?height=60&width=60',
          timeAgo,
        },
      };
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'in-progress': return 'bg-indigo-500';
      case 'completed': return 'bg-teal-500';
      case 'on-hold': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const calculateTimeAgo = (startDate: string): string => {
    const start = new Date(startDate);
    const now = new Date();
    const diffDays = Math.ceil(Math.abs(now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  };

  const getManagerInfo = (
    projectManager: Project['projectManager'],
    managersList: Manager[]
  ): { managerName: string; managerId: string } => {
    if (!projectManager) return { managerName: 'Unassigned', managerId: '' };

    if (typeof projectManager === 'object' && projectManager.name) {
      return {
        managerName: projectManager.name,
        managerId: projectManager._id
      };
    }

    if (typeof projectManager === 'string') {
      const manager = managersList.find(m => m._id === projectManager);
      if (manager) {
        return {
          managerName: manager.name,
          managerId: manager._id
        };
      }
    }

    return { managerName: 'Unassigned', managerId: '' };
  };

  return {
    managers: managersQuery.data || [],
    projects: projectsQuery.data ? transformProjects(projectsQuery.data, managersQuery.data || []) : [],
    isLoading: managersQuery.isLoading || projectsQuery.isLoading,
    error: managersQuery.error || projectsQuery.error,
  };
};