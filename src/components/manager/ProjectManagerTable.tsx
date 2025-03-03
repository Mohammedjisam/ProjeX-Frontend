import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosConfig';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

interface ProjectManager {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const ProjectManagersTable: React.FC = () => {
  const [projectManagers, setProjectManagers] = useState<ProjectManager[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectManagers();
  }, []);

  const fetchProjectManagers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/manager/getallprojectmanager');

      if (response.data && response.data.data) {
        setProjectManagers(response.data.data);
      } else {
        setProjectManagers([]);
        console.warn('Unexpected response format:', response.data);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch project managers';
      
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate('/manager/addprojectmanager');
  };

  const handleEdit = (id: string) => {
    navigate(`/manager/editprojectmanager/${id}`);
  };

  const handleBlock = (id: string) => {
    toast.info(`Blocking project manager with ID: ${id}`);
    // Implementation for blocking a project manager would go here
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/manager/getallprojectmanager/${id}`);

      setProjectManagers(projectManagers.filter(pm => pm._id !== id));
      toast.success('Project Manager deleted successfully');
    } catch (err) {
      let errorMessage = 'Failed to delete project manager';
      
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5 animate-pulse p-10 flex justify-center">
          <div className="text-white">Loading project managers...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5 p-10 flex justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      );
    }

    const hasProjectManagers = Array.isArray(projectManagers) && projectManagers.length > 0;

    return (
      <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5">
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-semibold text-white">Project Managers</h2>
          <button
            onClick={handleClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
          >
            Add Project Manager
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-white/80 text-sm">
              <th className="py-4 px-6 text-left font-medium">NO</th>
              <th className="py-4 px-6 text-left font-medium">PM Name</th>
              <th className="py-4 px-6 text-left font-medium">Email</th>
              <th className="py-4 px-6 text-left font-medium">Phone No</th>
              <th className="py-4 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {!hasProjectManagers ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No project managers found
                </td>
              </tr>
            ) : (
              projectManagers.map((pm, index) => (
                <tr 
                  key={pm._id} 
                  className="border-t border-white/5 hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-gray-300">{index + 1}</td>
                  <td className="py-4 px-6 text-white">{pm.name}</td>
                  <td className="py-4 px-6 text-gray-300">{pm.email}</td>
                  <td className="py-4 px-6 text-gray-300">{pm.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(pm._id)} 
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleBlock(pm._id)} 
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                      >
                        Block
                      </button>
                      <button 
                        onClick={() => handleDelete(pm._id)} 
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default ProjectManagersTable;