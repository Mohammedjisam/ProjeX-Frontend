import { Manager, UserManagementResponse } from "../../types/admin/user";
import adminAxiosInstance from "../../utils/AdminAxiosInstance";

export const fetchManagers = async (): Promise<UserManagementResponse<Manager>> => {
  const response = await adminAxiosInstance.get("/manager");
  return response.data;
};

export const toggleManagerStatus = async (id: string) => {
  return adminAxiosInstance.patch(`/manager/${id}/togglestatus`);
};

export const deleteManager = async (id: string) => {
  return adminAxiosInstance.delete(`/manager/${id}`);
};