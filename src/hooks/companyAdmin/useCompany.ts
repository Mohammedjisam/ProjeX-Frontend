// src/hooks/useCompany.ts
import { useMutation } from "@tanstack/react-query";
import { 
  createCompanyPaymentIntent, 
  completeCompanyCreation
} from "../../services/company/company.services";
import { ICompanyFormData } from "../../types/CompanyAdmin/Company";
import { IPaymentIntentResponse, ICompanyRegistrationResponse } from "../../types/CompanyAdmin/Response";

export const useCreateCompanyPaymentIntent = () => {
  return useMutation<
    IPaymentIntentResponse,
    Error,
    ICompanyFormData & { userId: string }
  >({
    mutationFn: createCompanyPaymentIntent
  });
};

export const useCompleteCompanyCreation = () => {
  return useMutation<
    ICompanyRegistrationResponse,
    Error,
    {
      companyData: ICompanyFormData & { userId: string };
      paymentIntentId: string;
    }
  >({
    mutationFn: completeCompanyCreation
  });
};