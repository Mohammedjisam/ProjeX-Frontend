// src/pages/manager/ProjectViewPage.tsx
"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useProjectDetails, useAddComment, useDeleteProject } from '../../hooks/manager/useProjects'
import { Layout } from "../../components/manager/Layout";
import { ProjectHeader } from "../../components/manager/Projects/ProjectView/ProjectHeader";
import { ProjectInfoGrid } from "../../components/manager/Projects/ProjectView/ProjectInfoGrid";
import { ProjectDescriptionSection } from "../../components/manager/Projects/ProjectView/ProjectDescriptionSection";
import { ProjectManagerSection } from "../../components/manager/Projects/ProjectView/ProjectManagerSection";
import { CommentsSection } from "../../components/manager/Projects/ProjectView/CommentsSection";
import {LoadingSpinner} from "../../components/ui/LoadingSpinner";
import { ErrorState } from "../../components/ui/ErrorState";

const ProjectViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
  const { data: project, isLoading, error } = useProjectDetails(id || "");
  const { mutate: addComment, isPending: isSubmittingComment } = useAddComment(id || "");
  const { mutate: deleteProject } = useDeleteProject();

  const handleAddComment = (comment: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    addComment({ comment, authorId: userId });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );
    if (confirmDelete && id) {
      deleteProject(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !project) return <ErrorState message="Failed to load project" />;

  return (
    <Layout>
      <ProjectHeader 
        project={project} 
        onEdit={() => navigate(`/manager/projects/${id}/edit`)} 
        onDelete={handleDelete} 
      />
      
      <ProjectInfoGrid project={project} />
      
      <div className="bg-gray-900 p-6 shadow-lg rounded-b-lg mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProjectDescriptionSection project={project} />
          <ProjectManagerSection project={project} />
        </div>
      </div>
      
      <CommentsSection 
        comments={project.comments || []} 
        onAddComment={handleAddComment}
        isSubmitting={isSubmittingComment}
      />
    </Layout>
  );
};

export default ProjectViewPage;