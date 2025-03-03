import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosConfig';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

interface Developer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const DevelopersTable: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/manager/getalldeveloper');

      if (response.data && response.data.data) {
        setDevelopers(response.data.data);
      } else {
        setDevelopers([]);
        console.warn('Unexpected response format:', response.data);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch developers';
      
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
    navigate('/manager/adddeveloper');
  };

  const handleEdit = (id: string) => {
    navigate(`/manager/editdeveloper/${id}`);
  };

  const handleBlock = (id: string) => {
    toast.info(`Blocking developer with ID: ${id}`);
    // Implementation for blocking a developer would go here
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/manager/getalldeveloper/${id}`);

      setDevelopers(developers.filter(dev => dev._id !== id));
      toast.success('Developer deleted successfully');
    } catch (err) {
      let errorMessage = 'Failed to delete developer';
      
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
          <div className="text-white">Loading developers...</div>
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

    const hasDevelopers = Array.isArray(developers) && developers.length > 0;

    return (
      <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5">
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-semibold text-white">Developers</h2>
          <button
            onClick={handleClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
          >
            Add Develeoper
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-white/80 text-sm">
              <th className="py-4 px-6 text-left font-medium">NO</th>
              <th className="py-4 px-6 text-left font-medium">Developer Name</th>
              <th className="py-4 px-6 text-left font-medium">Email</th>
              <th className="py-4 px-6 text-left font-medium">Phone No</th>
              <th className="py-4 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {!hasDevelopers ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No developers found
                </td>
              </tr>
            ) : (
              developers.map((developer, index) => (
                <tr 
                  key={developer._id} 
                  className="border-t border-white/5 hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-gray-300">{index + 1}</td>
                  <td className="py-4 px-6 text-white">{developer.name}</td>
                  <td className="py-4 px-6 text-gray-300">{developer.email}</td>
                  <td className="py-4 px-6 text-gray-300">{developer.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(developer._id)} 
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleBlock(developer._id)} 
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                      >
                        Block
                      </button>
                      <button 
                        onClick={() => handleDelete(developer._id)} 
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
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DevelopersTable;
