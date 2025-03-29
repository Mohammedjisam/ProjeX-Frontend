export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
}

export type Developer = BaseUser;
export type CompanyAdmin = BaseUser;
export type Manager = BaseUser;
export type ProjectManager = BaseUser;

export interface UserManagementResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}