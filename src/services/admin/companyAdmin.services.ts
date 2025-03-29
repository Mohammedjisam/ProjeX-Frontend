import { CompanyAdmin, UserManagementResponse } from "../../types/admin/user";
import adminAxiosInstance from "../../utils/AdminAxiosInstance";

export const fetchCompanyAdmins = async (): Promise<UserManagementResponse<CompanyAdmin>> => {
  const response = await adminAxiosInstance.get("/companyadmin");
  return response.data;
};

export const toggleCompanyAdminStatus = async (id: string) => {
  return adminAxiosInstance.patch(`/companyadmin/${id}/togglestatus`);
};

export const deleteCompanyAdmin = async (id: string) => {
  return adminAxiosInstance.delete(`/companyadmin/${id}`);
};