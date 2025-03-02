import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosConfig';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';


interface Manager {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const ManagersTable: React.FC = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/companyadmin/getallmanager');

      if (response.data && response.data.data) {
        setManagers(response.data.data);
      } else {
        setManagers([]);
        console.warn('Unexpected response format:', response.data);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch managers';
      
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
        navigate('/companyadmin/addmanager'); 
      };


  const handleEdit = (id: string) => {
    toast.info(`Editing manager with ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/companyadmin/getallmanager/${id}`);

      setManagers(managers.filter(manager => manager._id !== id));
      toast.success('Manager deleted successfully');
    } catch (err) {
      let errorMessage = 'Failed to delete manager';
      
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
          <div className="text-white">Loading managers...</div>
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

    const hasManagers = Array.isArray(managers) && managers.length > 0;

    return (
      <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5">
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-semibold text-white">Managers</h2>
          <button
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
    >
      Add Manager
    </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-white/80 text-sm">
              <th className="py-4 px-6 text-left font-medium">NO</th>
              <th className="py-4 px-6 text-left font-medium">Manager Name</th>
              <th className="py-4 px-6 text-left font-medium">Email</th>
              <th className="py-4 px-6 text-left font-medium">Phone No</th>
              <th className="py-4 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {!hasManagers ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No managers found
                </td>
              </tr>
            ) : (
              managers.map((manager, index) => (
                <tr 
                  key={manager._id} 
                  className="border-t border-white/5 hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-gray-300">{index + 1}</td>
                  <td className="py-4 px-6 text-white">{manager.name}</td>
                  <td className="py-4 px-6 text-gray-300">{manager.email}</td>
                  <td className="py-4 px-6 text-gray-300">{manager.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(manager._id)} 
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(manager._id)} 
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
      <div className="flex-1 ml-[220px]">
        <Header userAvatar="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" userName="Admin" />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ManagersTable;
