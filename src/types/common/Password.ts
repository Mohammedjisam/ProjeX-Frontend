export interface PasswordResetTokenValidation {
    success: boolean;
    message?: string;
    data?: {
      name: string;
      email: string;
    };
  }
  
  export interface PasswordResetPayload {
    password: string;
  }
  
  export interface PasswordResetResponse {
    success: boolean;
    message?: string;
  }