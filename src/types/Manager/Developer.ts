export interface Developer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status?: 'active' | 'inactive';
}

export interface DeveloperFormData {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

export interface DeveloperResponse {
  success: boolean;
  message?: string;
  data?: Developer | Developer[];
}


export interface AddDeveloperResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
}