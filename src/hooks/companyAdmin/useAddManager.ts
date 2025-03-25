// src/hooks/useAddManager.ts
import { useState } from 'react';
import { addManager } from '../../services/companyAdmin/companyAdmin.services';
import { ManagerFormData } from '../../types/Manager';

export const useAddManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitManager = async (formData: ManagerFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addManager(formData);
      return { success: true, data: result };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add manager';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { submitManager, loading, error };
};