import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectManagers, useAddProject } from '../../hooks/manager/useProjectMutations';
import { AddProjectForm } from '../../components/manager/Projects/AddProjectForm';
import Header  from '../../components/manager/Header';
import Sidebar  from '../../components/manager/Sidebar';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const { data: projectManagers = [], isLoading: isLoadingManagers } = useProjectManagers();
  const { mutate: addProject, isPending } = useAddProject();
  
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    clientName: "",
    budget: "",
    startDate: "",
    endDate: "",
    projectManager: "",
    goal: "",
    status: "planned",
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(projectData, {
      onSuccess: () => {
        navigate('/manager/projects');
      }
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <AddProjectForm
              projectData={projectData}
              projectManagers={projectManagers}
              isLoading={isPending || isLoadingManagers}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/manager/projects')}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProjectPage;