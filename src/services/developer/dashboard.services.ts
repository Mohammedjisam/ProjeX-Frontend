import { DashboardResponse } from "../../types/developer/dashboard";
import taskAxiosInstance from "../../utils/TaskAxiosInstance";

export const fetchDashboardData = async (developerId: string): Promise<DashboardResponse> => {
  try {
    const response = await taskAxiosInstance.post('/assignee', { assigneeId: developerId });
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch dashboard data');
    }

    return {
      success: true,
      taskCounts: response.data.taskCounts,
      recentTasks: response.data.recentTasks.map((task: any) => ({
        _id: task._id,
        title: task.title,
        dueDate: new Date(task.dueDate).toLocaleDateString(),
        status: task.status,
        project: task.project
      }))
    };
  } catch (error) {
    console.error('Dashboard service error:', error);
    throw error;
  }
};