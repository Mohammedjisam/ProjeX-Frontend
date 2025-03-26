// src/hooks/useManagers.ts
import { useState, useEffect } from 'react';
import { fetchManagers, deleteManager } from '../../services/companyAdmin/companyAdmin.services';
import { Manager } from '../../types/Manager/Manager';

export const useManagers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadManagers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchManagers();
      setManagers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch managers');
    } finally {
      setLoading(false);
    }
  };

  const removeManager = async (id: string) => {
    try {
      await deleteManager(id);
      setManagers(prev => prev.filter(manager => manager._id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete manager');
      return false;
    }
  };

  useEffect(() => {
    loadManagers();
  }, []);

  return { managers, loading, error, removeManager, refresh: loadManagers };
};