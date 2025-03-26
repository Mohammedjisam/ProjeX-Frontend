import { 
  PasswordResetTokenValidation,
  PasswordResetPayload,
  PasswordResetResponse
} from "../../types/common/Password";
import axiosInstance from "../../utils/AxiosInstance";

export const validatePasswordToken = async (token: string): Promise<PasswordResetTokenValidation> => {
  const response = await axiosInstance.get(`/password/validate-token/${token}`);
  return response.data;
};

export const resetPassword = async (token: string, data: PasswordResetPayload): Promise<PasswordResetResponse> => {
  const response = await axiosInstance.post(`/password/reset/${token}`, data);
  return response.data;
};