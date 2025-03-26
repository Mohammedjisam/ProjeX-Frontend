import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProjectManagerForm } from '../../components/manager/ProjectManager/AddProjectManagerForm';
import { useAddProjectManager } from '../../hooks/manager/useProjectManagerMutations';
import Header from '../../components/manager/Header';
import Sidebar from '../../components/manager/Sidebar'; 

const AddProjectManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: addProjectManager, isPending } = useAddProjectManager();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project Manager name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[^\d]/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addProjectManager(formData, {
        onSuccess: () => {
          navigate('/manager/projectmanagers');
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-md mx-auto mt-10">
            <AddProjectManagerForm
              formData={formData}
              errors={errors}
              loading={isPending}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/manager/projectmanagers')}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProjectManagerPage;