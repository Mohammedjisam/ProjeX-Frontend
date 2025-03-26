import { useNavigate } from 'react-router-dom';
import { useProjectManagers } from '../../hooks/manager/useProjectManagers';
import { ProjectManagersTable } from '../../components/manager/ProjectManager/ProjectManagersTable';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar';

const ProjectManagersPage = () => {
  const navigate = useNavigate();
  const { 
    projectManagers, 
    isLoading, 
    error, 
    deleteProjectManager, 
    isDeleting, 
    toggleProjectManagerStatus, 
    isToggling 
  } = useProjectManagers();

  const handleAddProjectManager = () => navigate('/manager/addprojectmanager');
  const handleEditProjectManager = (id: string) => navigate(`/manager/editprojectmanager/${id}`);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ProjectManagersTable
            projectManagers={projectManagers}
            isLoading={isLoading}
            error={error}
            isDeleting={isDeleting}
            isToggling={isToggling}
            onAddProjectManager={handleAddProjectManager}
            onEditProjectManager={handleEditProjectManager}
            onToggleStatus={toggleProjectManagerStatus}
            onDeleteProjectManager={deleteProjectManager}
          />
        </main>
      </div>
    </div>
  );
};

export default ProjectManagersPage;