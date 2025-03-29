import { Developer, UserManagementResponse } from "../../types/admin/user";
import adminAxiosInstance from "../../utils/AdminAxiosInstance";

export const fetchDevelopers = async (): Promise<UserManagementResponse<Developer>> => {
  const response = await adminAxiosInstance.get("/developer");
  return response.data;
};

export const toggleDeveloperStatus = async (id: string) => {
  return adminAxiosInstance.patch(`/developer/${id}/togglestatus`);
};

export const deleteDeveloper = async (id: string) => {
  return adminAxiosInstance.delete(`/developer/${id}`);
};