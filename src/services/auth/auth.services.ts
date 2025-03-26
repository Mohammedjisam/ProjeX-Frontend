import { IAuthResponse } from "../../types/CompanyAdmin/Response";
import { ILoginData } from "../../types/common/User";
import authAxiosInstance from "../../utils/AuthAxiosInstance";


export const adminSignin = async (credentials: ILoginData): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/login",
      {
        ...credentials,
        role: "admin"
      }
    );
    return response.data;
  };
  

  export const companyAdminSignin = async (credentials: ILoginData): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/login",
      {
        ...credentials,
        role: "companyAdmin"
      }
    );
    return response.data;
  };
  
  export const companyAdminGoogleSignin = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/google/token",
      {
        credential,
        role: "companyAdmin"
      }
    );
    return response.data;
  };
  export const initiateCompanyAdminSignup = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/initiate", {
      ...data,
      role: "companyAdmin"
    });
    return response.data;
  };
  
  export const verifyCompanyAdminSignup = async (email: string, otp: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/verify", {
      email,
      otp,
      role: "companyAdmin"
    });
    return response.data;
  };
  
  export const resendCompanyAdminOTP = async (email: string): Promise<{ success: boolean }> => {
    const response = await authAxiosInstance.post("/signup/resend", {
      email,
      role: "companyAdmin"
    });
    return response.data;
  };
  
  export const companyAdminGoogleSignup = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/google/token", {
      credential,
      role: "companyAdmin"
    });
    return response.data;
  };

  export const managerSignin = async (credentials: ILoginData & { rememberMe?: boolean }): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/login",
      {
        ...credentials,
        role: "manager"
      }
    );
    return response.data;
  };
  
  export const managerGoogleSignin = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/google/token",
      {
        credential,
        role: "manager"
      }
    );
    return response.data;
  };
  export const initiateManagerSignup = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/initiate", {
      ...data,
      role: "manager"
    });
    return response.data;
  };
  
  export const verifyManagerSignup = async (email: string, otp: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/verify", {
      email,
      otp,
      role: "manager"
    });
    return response.data;
  };
  
  export const resendManagerOTP = async (email: string): Promise<{ success: boolean }> => {
    const response = await authAxiosInstance.post("/signup/resend", {
      email,
      role: "manager"
    });
    return response.data;
  };
  
  export const managerGoogleSignup = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/google/token", {
      credential,
      role: "manager"
    });
    return response.data;
  };
  export const initiateProjectManagerSignup = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/initiate", {
      ...data,
      role: "projectManager"
    });
    return response.data;
  };
  
  export const verifyProjectManagerSignup = async (email: string, otp: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/verify", {
      email,
      otp,
      role: "projectManager"
    });
    return response.data;
  };
  
  export const resendProjectManagerOTP = async (email: string): Promise<{ success: boolean }> => {
    const response = await authAxiosInstance.post("/signup/resend", {
      email,
      role: "projectManager"
    });
    return response.data;
  };
  
  export const projectManagerGoogleSignup = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/google/token", {
      credential,
      role: "projectManager"
    });
    return response.data;
  };
  export const projectManagerSignin = async (credentials: ILoginData): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/login",
      {
        ...credentials,
        role: "projectManager"
      }
    );
    return response.data;
  };
  
  export const projectManagerGoogleSignin = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/google/token",
      {
        credential,
        role: "projectManager"
      }
    );
    return response.data;
  };
  export const developerSignin = async (credentials: ILoginData): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/login",
      {
        ...credentials,
        role: "developer"
      }
    );
    return response.data;
  };
  
  export const developerGoogleSignin = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>(
      "/google/token",
      {
        credential,
        role: "developer"
      }
    );
    return response.data;
  };
  export const initiateDeveloperSignup = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/initiate", {
      ...data,
      role: "developer"
    });
    return response.data;
  };
  
  export const verifyDeveloperSignup = async (email: string, otp: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/signup/verify", {
      email,
      otp,
      role: "developer"
    });
    return response.data;
  };
  
  export const resendDeveloperOTP = async (email: string): Promise<{ success: boolean }> => {
    const response = await authAxiosInstance.post("/signup/resend", {
      email,
      role: "developer"
    });
    return response.data;
  };
  
  export const developerGoogleSignup = async (credential: string): Promise<IAuthResponse> => {
    const response = await authAxiosInstance.post<IAuthResponse>("/google/token", {
      credential,
      role: "developer"
    });
    return response.data;
  };