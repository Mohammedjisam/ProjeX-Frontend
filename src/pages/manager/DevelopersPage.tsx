import { useNavigate } from 'react-router-dom';
import { useDevelopers } from '../../hooks/manager/useDevelopers';
import { DevelopersTable } from '../../components/manager/Developers/DeveloperTable';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';

export const DevelopersPage = () => {
  const navigate = useNavigate();
  const { 
    developers, 
    isLoading, 
    error, 
    createDeveloper, 
    isCreating, 
    updateDeveloper, 
    isUpdating, 
    toggleDeveloperStatus, 
    isToggling, 
    deleteDeveloper, 
    isDeleting 
  } = useDevelopers();

  const handleAddDeveloper = () => navigate('/manager/adddeveloper');
  const handleEditDeveloper = (id: string) => navigate(`/manager/editdeveloper/${id}`);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <DevelopersTable
            developers={developers}
            isLoading={isLoading}
            error={error}
            isDeleting={isDeleting}
            isToggling={isToggling}
            onAddDeveloper={handleAddDeveloper}
            onEditDeveloper={handleEditDeveloper}
            onToggleStatus={toggleDeveloperStatus}
            onDeleteDeveloper={deleteDeveloper}
          />
        </main>
      </div>
    </div>
  );
};