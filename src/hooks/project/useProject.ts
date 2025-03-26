// src/hooks/useProject.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProject, toggleVerification } from '../../services/Project/project.services';
import { ProjectData } from '../../types/CompanyAdmin/Project';

export const useProject = (projectId: string) => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        if (!projectId) {
          throw new Error("Project ID is missing");
        }

        const data = await fetchProject(projectId);
        setProject(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load project";
        setError(message);
        navigate("/companyAdmin/projects");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, navigate]);

  const handleToggleVerification = async () => {
    if (!projectId) return;
    
    setVerifying(true);
    try {
      const result = await toggleVerification(projectId);
      if (result.success) {
        setProject(prev => prev ? {
          ...prev,
          companyAdminIsVerified: !prev.companyAdminIsVerified
        } : null);
      }
      return result;
    } finally {
      setVerifying(false);
    }
  };

  return { project, loading, error, verifying, handleToggleVerification };
};