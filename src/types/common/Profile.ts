// src/types/Profile.ts
export interface ProfileData {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
  }
  
  export interface ProfileFormValues {
    name: string;
    email: string;
    phoneNumber: string;
    profileImageBase64?: string | null;
  }
  
  export interface ProfileUpdatePayload {
    name: string;
    email: string;
    phoneNumber: string;
    profileImageBase64?: string | null;
  }