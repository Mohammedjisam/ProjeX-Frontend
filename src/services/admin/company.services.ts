import axiosInstance from "../../utils/AxiosInstance";
import { CompanyResponse,Company } from "../../types/admin/company";

export const fetchCompanies = async (): Promise<CompanyResponse> => {

  const response = await axiosInstance.get(`/company`);
  return response.data;
};

export const fetchCompanyDetails = async (id: string): Promise<Company> => {
    const response = await axiosInstance.get(`/company/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch company details");
    }
    return response.data.data;
  };
  
  export const fetchAdminDetails = async (adminId: string) => {
    const response = await axiosInstance.get(`/user/${adminId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch admin details");
    }
    return response.data.data;
  };
  
  export const toggleCompanyVerification = async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.patch(`/company/${id}/toggle-verification`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update verification status");
    }
    return response.data;
  };