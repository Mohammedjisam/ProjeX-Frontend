// src/hooks/useProfile.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { updateProfile, getProfile } from '../services/profile.service';
import { updateCompanyAdmin, setCompanyAdmin } from '../redux/slice/CompanyAdminSlice'; // Add setCompanyAdmin

export const useProfile = () => {
  const dispatch = useDispatch();
  const companyAdminData = useSelector((state: RootState) => state.companyAdmin.companyAdminData);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Separate state for initial load
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
      const { user } = await updateProfile(formData);
      dispatch(updateCompanyAdmin(user));
      setSuccess('Profile updated successfully!');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      return false;
    } finally {
      setLoading(false); // This ensures loading is always reset
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