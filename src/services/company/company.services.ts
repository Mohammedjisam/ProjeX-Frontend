// src/services/company.services.ts
import {  ICompanyRegistrationResponse } from "../../types/Response";
import { ICompanyFormData, IPaymentIntentResponse } from "../../types/Company";
import axiosInstance from "../../utils/AxiosInstance";

export const createCompanyPaymentIntent = async (
  data: ICompanyFormData & { userId: string }
): Promise<IPaymentIntentResponse> => {
  const response = await axiosInstance.post<IPaymentIntentResponse>(
    "/company/create-payment-intent", 
    data
  );
  return response.data;
};

export const completeCompanyCreation = async (
  data: {
    companyData: ICompanyFormData & { userId: string; stripeCustomerId?: string };
    paymentIntentId: string;
  }
): Promise<ICompanyRegistrationResponse> => {
  const response = await axiosInstance.post<ICompanyRegistrationResponse>(
    "/company/complete-creation", 
    data
  );
  return response.data;
};