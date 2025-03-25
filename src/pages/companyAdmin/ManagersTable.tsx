// src/pages/companyadmin/managers/ManagersTable.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Sidebar from '../../components/companyAdmin/Sidebar';
import { useManagers } from '../../hooks/companyAdmin/useManagers'
import LoadingState from '../../components/companyAdmin/manager/LoadingState';
import ErrorState from '../../components/companyAdmin/manager/ErrorState';
import ManagersList from '../../components/companyAdmin/manager/ManagersList';

const ManagersTable: React.FC = () => {
  const navigate = useNavigate();
  const { managers, loading, error, removeManager, refresh } = useManagers();

  const handleAddManager = () => {
    navigate('/companyadmin/addmanager');
  };

  const handleEdit = (id: string) => {
    toast.info(`Editing manager with ID: ${id}`);
    // Navigate to edit page if needed
    // navigate(`/companyadmin/managers/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    const success = await removeManager(id);
    if (success) {
      toast.success('Manager deleted successfully');
    } else {
      toast.error('Failed to delete manager');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-[280px] mr-[30px]">
        <main className="p-6">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={refresh} />
          ) : (
            <ManagersList 
              managers={managers}
              onAdd={handleAddManager}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ManagersTable;