// src/hooks/useProfile.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { updateProfile, getProfile } from '../../services/profile.service';
import { updateCompanyAdmin, setCompanyAdmin } from '../../redux/slice/CompanyAdminSlice';
import { ProfileFormValues } from '../../types/common/Profile';

export const useProfile = () => {
  const dispatch = useDispatch();
  const companyAdminData = useSelector((state: RootState) => state.companyAdmin.companyAdminData);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setInitialLoading(true);
      try {
        const { user } = await getProfile();
        dispatch(setCompanyAdmin(user));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile data');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const submitProfileUpdate = async (formData: ProfileFormValues) => {
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const response = await updateProfile(formData);
      // Ensure you're using the correct response structure
      dispatch(updateCompanyAdmin(response.user));
      setSuccess('Profile updated successfully!');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    profileData: companyAdminData,
    loading: loading || initialLoading,
    error,
    success,
    submitProfileUpdate,
    clearMessages: () => {
      setError('');
      setSuccess('');
    }
  };
};