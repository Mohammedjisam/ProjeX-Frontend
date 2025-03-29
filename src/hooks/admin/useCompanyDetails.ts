import { useState, useEffect } from "react";
import { Company } from "../../types/admin/company";
import { fetchCompanyDetails, fetchAdminDetails, toggleCompanyVerification } from "../../services/admin/company.services";

export const useCompanyDetails = (id: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [adminUser, setAdminUser] = useState<Company['companyAdmin']>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const loadCompany = async () => {
    try {
      setLoading(true);
      const data = await fetchCompanyDetails(id);
      setCompany(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAdminDetails = async (adminId: string) => {
    try {
      setLoadingAdmin(true);
      const data = await fetchAdminDetails(adminId);
      setAdminUser(data);
    } catch (err: any) {
      console.error("Error fetching admin details:", err);
    } finally {
      setLoadingAdmin(false);
    }
  };

  const toggleVerification = async () => {
    if (!company) return;
    
    try {
      setUpdating(true);
      const result = await toggleCompanyVerification(id);
      setCompany(prev => prev ? { ...prev, adminVerification: !prev.adminVerification } : null);
      setUpdateSuccess(result.message);
      setTimeout(() => setUpdateSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (id) loadCompany();
  }, [id]);

  useEffect(() => {
    if (company && !company.companyAdmin && company.payment?.companyAdmin) {
      loadAdminDetails(company.payment.companyAdmin);
    }
  }, [company]);

  return {
    company,
    adminUser,
    loading,
    error,
    updating,
    updateSuccess,
    loadingAdmin,
    toggleVerification,
    refresh: loadCompany
  };
};