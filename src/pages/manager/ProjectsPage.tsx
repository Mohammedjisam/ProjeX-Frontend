import { useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/manager/useProjects";
import { ProjectsTable } from "../../components/manager/Projects/ProjectsTable";
import Header from "../../components/manager/Header";
import Sidebar from "../../components/manager/Sidebar";
const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, isLoading, error, refetch } = useProjects();

  const handleViewDetails = (projectId: string) => {
    navigate(`/manager/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate("/manager/addproject");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ProjectsTable
            projects={projects}
            isLoading={isLoading}
            error={error}
            onViewDetails={handleViewDetails}
            onCreateProject={handleCreateProject}
            onRetry={refetch}
          />
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;