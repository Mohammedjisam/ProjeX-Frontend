"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import Sidebar from "../../components/manager/Sidebar";
import { TaskForm } from "../../components/projectManger/Task/TaskForm";
import { useCreateTask, useDevelopers } from "../../hooks/projectManager/useTask";

export const AddTaskPage = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams<{ id: string }>();
  const userData = useSelector((state: RootState) => state.projectManager.projectManagerData);
  const { data: developers, isLoading: loadingDevelopers } = useDevelopers();
  const createTaskMutation = useCreateTask();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "medium" as const,
    dueDate: "",
    remarks: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Task title is required";
    if (!formData.description.trim()) newErrors.description = "Task description is required";
    if (!formData.assignee) newErrors.assignee = "Assignee is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    if (!projectId) newErrors.project = "Project ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !projectId || !userData?.id) return;

    createTaskMutation.mutate({
      ...formData,
      createdBy: userData.id,
      projectId,
    }, {
      onSuccess: () => {
        navigate(`/projectmanager/projects/${projectId}`);
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Add New Task</h1>
          
          {loadingDevelopers ? (
            <div className="text-center py-8">Loading developers...</div>
          ) : (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <TaskForm
                formData={formData}
                developers={developers || []}
                errors={errors}
                loading={createTaskMutation.isPending}
                onChange={handleChange}
                onPrioritySelect={(priority) => setFormData(prev => ({ ...prev, priority }))}
                onAssigneeSelect={(assignee) => setFormData(prev => ({ ...prev, assignee }))}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;