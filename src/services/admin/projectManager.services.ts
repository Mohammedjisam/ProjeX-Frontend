import { ProjectManager, UserManagementResponse } from "../../types/admin/user";
import adminAxiosInstance from "../../utils/AdminAxiosInstance";

export const fetchProjectManagers = async (): Promise<UserManagementResponse<ProjectManager>> => {
  const response = await adminAxiosInstance.get("/projectmanager");
  return response.data;
};

export const toggleProjectManagerStatus = async (id: string) => {
  return adminAxiosInstance.patch(`/projectmanager/${id}/togglestatus`);
};

export const deleteProjectManager = async (id: string) => {
  return adminAxiosInstance.delete(`/projectmanager/${id}`);
};