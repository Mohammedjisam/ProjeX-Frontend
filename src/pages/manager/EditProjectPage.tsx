import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectDetails, useProjectManagers, useUpdateProject } from "../../hooks/manager/useProjects";
import { EditProjectForm } from "../../components/manager/Projects/EditProjectForm";
import Sidebar from "../../components/manager/Sidebar";
import Header from "../../components/manager/Header";
import { format } from "date-fns";

const EditProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";

  const { data: project, isLoading: isProjectLoading } = useProjectDetails(id || "");
  const { data: managers, isLoading: isManagersLoading } = useProjectManagers();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject(id || "");

  const handleSubmit = (formData: ProjectFormData) => {
    const payload: ProjectUpdatePayload = {
      ...formData,
      budget: formData.budget === "" ? 0 : Number(formData.budget),
      lastUpdatedBy: userId
    };
    updateProject(payload, {
      onSuccess: () => navigate(`/manager/projects/${id}`)
    });
  };

  if (isProjectLoading || isManagersLoading) {
    return <div>Loading...</div>;
  }

  if (!project || !managers) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex h-screen bg-[#0f121b]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
            <EditProjectForm
              initialData={{
                name: project.name,
                description: project.description,
                clientName: project.clientName,
                budget: project.budget,
                startDate: format(new Date(project.startDate), "yyyy-MM-dd"),
                endDate: format(new Date(project.endDate), "yyyy-MM-dd"),
                projectManager: project.projectManager._id,
                goal: project.goal,
                status: project.status,
                comments: project.comments || ""
              }}
              managers={managers}
              isLoading={isUpdating}
              onSubmit={handleSubmit}
              onCancel={() => navigate(`/manager/projects/${id}`)}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProjectPage;