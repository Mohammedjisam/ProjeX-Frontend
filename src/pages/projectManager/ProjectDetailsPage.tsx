"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useProjectDetails } from "../../hooks/projectManager/useProjects";
import Sidebar from "../../components/projectManger/Sidebar";
import { ProjectHeader } from "../../components/projectManger/Project/Project";
import { ProjectOverview } from "../../components/projectManger/Project/ProjectOverview";
import { ProjectSidebar } from "../../components/projectManger/Project/ProjectSidebar";
import { ProjectTabs } from "../../components/projectManger/Project/ProjectTabs";
import { ProjectDetailsSkeleton } from "../../components/projectManger/Project/ProjectDetailsSkeleton";
import { ProjectDetailsError } from "../../components/projectManger/Project/ProjectDetailsError";

export const ProjectDetailsPage = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectManagerData = useSelector(
    (state: RootState) => state.projectManager.projectManagerData
  );

  const { data: project, isLoading, error } = useProjectDetails(
    projectId,
    projectManagerData?._id
  );

  const handleBack = () => navigate("/projectmanager/projects");
  const handleViewTasks = () => navigate(`/projectmanager/projects/${projectId}/tasks`);
  const handleAddTask = () => navigate(`/projectmanager/projects/${projectId}/addtask`);
  const handleAddComment = () => navigate(`/projectmanager/projects/${projectId}/comments/add`);
  const handleUpdateStatus = () => navigate(`/projectmanager/projects/${projectId}/status`);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#1a1f2e]">
        <Sidebar />
        <div className="flex-1 ml-[240px] p-6">
          <ProjectDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#1a1f2e]">
        <Sidebar />
        <div className="flex-1 ml-[240px] p-6">
          <ProjectDetailsError 
            error={error} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-[#1a1f2e]">
        <Sidebar />
        <div className="flex-1 ml-[240px] p-6">
          <div className="text-center text-white py-8">
            Project not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#1a1f2e]">
      <Sidebar />
      <div className="flex-1 ml-[240px] p-6">
        <div className="max-w-7xl mx-auto">
          <ProjectHeader 
            name={project.name}
            clientName={project.clientName}
            status={project.status}
            onBack={handleBack}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <ProjectOverview 
              project={project}
              onViewTasks={handleViewTasks}
              onAddTask={handleAddTask}
            />

            <ProjectSidebar 
              projectManager={project.projectManager}
              onAddComment={handleAddComment}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>

          <ProjectTabs 
            comments={project.comments}
            projectId={project._id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;