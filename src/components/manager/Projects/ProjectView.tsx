// components/manager/Project/ProjectView.tsx
"use client";

import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Edit, FileText, Flag, MessageSquare, Target, Trash2, User, Users } from "lucide-react";
import { useProjectDetails, useAddComment, useDeleteProject } from "../../../hooks/manager/useProject";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { format } from "date-fns";
import { Button } from "../../ui/button";
import { useState } from "react";

const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  
  const { data: project, isLoading, error } = useProjectDetails(id || "");
  const { mutate: addComment, isPending: isSubmittingComment } = useAddComment(id || "");
  const { mutate: deleteProject } = useDeleteProject();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    addComment({ comment: newComment, authorId: userId });
    setNewComment("");
  };

  const handleEditProject = () => navigate(`/manager/projects/${id}/edit`);

  const handleDeleteProject = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );
    if (confirmDelete && id) {
      deleteProject(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned": return "bg-blue-500";
      case "in-progress": return "bg-amber-500";
      case "completed": return "bg-green-500";
      case "on-hold": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatStatus = (status: string) => {
    return status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !project) return <ErrorState />;

  return (
    <div className="flex h-screen bg-[#0f121b]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f121b] p-6">
          <ProjectHeader 
            project={project} 
            onEdit={handleEditProject} 
            onDelete={handleDeleteProject}
          />
          
          <ProjectInfoGrid project={project} />
          
          <div className="bg-gray-900 p-6 shadow-lg rounded-b-lg mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ProjectDescriptionSection project={project} />
              <ProjectManagerSection project={project} />
            </div>
          </div>
          
          <CommentsSection 
            comments={project.comments} 
            newComment={newComment}
            onCommentChange={setNewComment}
            onSubmitComment={handleSubmitComment}
            isSubmitting={isSubmittingComment}
          />
        </main>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorState = () => (
  <div className="flex justify-center items-center h-full">
    <div className="text-white text-xl">Project not found</div>
  </div>
);

export default ProjectView;