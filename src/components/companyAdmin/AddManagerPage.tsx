
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AddManagerForm from './AddManagerForm';

const AddManagerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect to dashboard or managers list after successful submission
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#0A101F] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-md mx-auto mt-10">
            <AddManagerForm onSuccess={handleSuccess} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddManagerPage;
