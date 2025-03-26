export interface IAuthResponse {
    success: boolean;
    token: string;
    user: any; 
    message: string;
  }

  export interface ICompanyRegistrationResponse extends IAuthResponse {
    company?: any; 
    subscription?: any; 
  }