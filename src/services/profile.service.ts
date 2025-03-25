// src/services/profile.service.ts
import { ProfileUpdatePayload } from '../types/Profile';
import authAxiosInstance from '../utils/AuthAxiosInstance';

export const updateProfile = async (data: ProfileUpdatePayload) => {
    try {
      const response = await authAxiosInstance.put('/profile', data);
      return response.data;
    } catch (error) {
      throw error; 
    }
  };
  

export const getProfile = async () => {
  const response = await authAxiosInstance.get('/profile');
  return response.data;
};