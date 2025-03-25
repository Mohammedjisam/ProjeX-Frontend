import { useMutation } from "@tanstack/react-query";
import { adminSignin, companyAdminGoogleSignin, companyAdminGoogleSignup, companyAdminSignin, developerGoogleSignin, developerGoogleSignup, developerSignin, initiateCompanyAdminSignup, initiateDeveloperSignup, initiateManagerSignup, initiateProjectManagerSignup, managerGoogleSignin, managerGoogleSignup, managerSignin, projectManagerGoogleSignin, projectManagerGoogleSignup, projectManagerSignin, resendCompanyAdminOTP, resendDeveloperOTP, resendManagerOTP, resendProjectManagerOTP, verifyCompanyAdminSignup, verifyDeveloperSignup, verifyManagerSignup, verifyProjectManagerSignup } from "../services/auth/auth.services";
import { IAuthResponse } from "../types/Response";
import { ILoginData } from "../types/User";

export const useAdminLoginMutation = () => {
    return useMutation<IAuthResponse, Error, ILoginData>({
      mutationFn: adminSignin
    });
  };


  export const useCompanyAdminLoginMutation = () => {
    return useMutation<IAuthResponse, Error, ILoginData>({
      mutationFn: companyAdminSignin
    });
  };
  
  export const useCompanyAdminGoogleLoginMutation = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: companyAdminGoogleSignin
    });
  };
  export const useInitiateCompanyAdminSignup = () => {
    return useMutation<IAuthResponse, Error, {
      name: string;
      email: string;
      phoneNumber: string;
      password: string;
    }>({
      mutationFn: initiateCompanyAdminSignup
    });
  };
  
  export const useVerifyCompanyAdminSignup = () => {
    return useMutation<IAuthResponse, Error, { email: string; otp: string }>({
      mutationFn: ({ email, otp }) => verifyCompanyAdminSignup(email, otp)
    });
  };
  
  export const useResendCompanyAdminOTP = () => {
    return useMutation<{ success: boolean }, Error, string>({
      mutationFn: resendCompanyAdminOTP
    });
  };
  
  export const useCompanyAdminGoogleSignup = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: companyAdminGoogleSignup
    });
  };

  export const useManagerLoginMutation = () => {
    return useMutation<IAuthResponse, Error, ILoginData & { rememberMe?: boolean }>({
      mutationFn: managerSignin
    });
  };
  
  export const useManagerGoogleLoginMutation = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: managerGoogleSignin
    });
  };
  export const useInitiateManagerSignup = () => {
    return useMutation<IAuthResponse, Error, {
      name: string;
      email: string;
      phoneNumber: string;
      password: string;
    }>({
      mutationFn: initiateManagerSignup
    });
  };
  export const useVerifyManagerSignup = () => {
    return useMutation<IAuthResponse, Error, { email: string; otp: string }>({
      mutationFn: ({ email, otp }) => verifyManagerSignup(email, otp)
    });
  };
  
  export const useResendManagerOTP = () => {
    return useMutation<{ success: boolean }, Error, string>({
      mutationFn: resendManagerOTP
    });
  };
  
  export const useManagerGoogleSignup = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: managerGoogleSignup
    });
  };
  export const useInitiateProjectManagerSignup = () => {
    return useMutation<IAuthResponse, Error, {
      name: string;
      email: string;
      phoneNumber: string;
      password: string;
    }>({
      mutationFn: initiateProjectManagerSignup
    });
  };
  
  export const useVerifyProjectManagerSignup = () => {
    return useMutation<IAuthResponse, Error, { email: string; otp: string }>({
      mutationFn: ({ email, otp }) => verifyProjectManagerSignup(email, otp)
    });
  };
  
  export const useResendProjectManagerOTP = () => {
    return useMutation<{ success: boolean }, Error, string>({
      mutationFn: resendProjectManagerOTP
    });
  };
  
  export const useProjectManagerGoogleSignup = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: projectManagerGoogleSignup
    });
  };
  export const useProjectManagerLoginMutation = () => {
    return useMutation<IAuthResponse, Error, ILoginData>({
      mutationFn: projectManagerSignin
    });
  };
  
  export const useProjectManagerGoogleLoginMutation = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: projectManagerGoogleSignin
    });
  };
  export const useDeveloperLoginMutation = () => {
    return useMutation<IAuthResponse, Error, ILoginData>({
      mutationFn: developerSignin
    });
  };
  
  export const useDeveloperGoogleLoginMutation = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: developerGoogleSignin
    });
  };
  export const useInitiateDeveloperSignup = () => {
    return useMutation<IAuthResponse, Error, {
      name: string;
      email: string;
      phoneNumber: string;
      password: string;
    }>({
      mutationFn: initiateDeveloperSignup
    });
  };
  
  export const useVerifyDeveloperSignup = () => {
    return useMutation<IAuthResponse, Error, { email: string; otp: string }>({
      mutationFn: ({ email, otp }) => verifyDeveloperSignup(email, otp)
    });
  };
  
  export const useResendDeveloperOTP = () => {
    return useMutation<{ success: boolean }, Error, string>({
      mutationFn: resendDeveloperOTP
    });
  };
  
  export const useDeveloperGoogleSignup = () => {
    return useMutation<IAuthResponse, Error, string>({
      mutationFn: developerGoogleSignup
    });
  };