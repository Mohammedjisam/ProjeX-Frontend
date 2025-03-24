import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Search, RefreshCw, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import adminAxiosInstance from "../../utils/AdminAxiosInstance";

// Types
interface CompanyAdmin {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
}

const CompanyAdminManagement: React.FC = () => {
  const [companyAdmins, setCompanyAdmins] = useState<CompanyAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const adminsPerPage: number = 6;

  useEffect(() => {
    fetchCompanyAdmins();
  }, []);

  const fetchCompanyAdmins = async () => {
    try {
      setLoading(true);
      
      const response = await adminAxiosInstance.get("/companyadmin");
      
      setCompanyAdmins(response.data.data);
      setError(null);
      toast.success("Company admins loaded successfully");
    } catch (err) {
      console.error("Error fetching company admins:", err);
      setError("Failed to load company admins. Please try again.");
      toast.error("Failed to load company admins");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await adminAxiosInstance.patch(`/companyadmin/${id}/togglestatus`);
      
      // Update local state to reflect the change
      setCompanyAdmins(prevAdmins =>
        prevAdmins.map(admin =>
          admin._id === id ? { ...admin, isActive: !admin.isActive } : admin
        )
      );
      
      toast.success("Company admin status updated successfully");
    } catch (err) {
      console.error("Error toggling company admin status:", err);
      setError("Failed to update status. Please try again.");
      toast.error("Failed to update company admin status");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this company admin?")) {
      try {
        await adminAxiosInstance.delete(`/companyadmin/${id}`);
        
        // Remove deleted admin from state
        setCompanyAdmins(prevAdmins => prevAdmins.filter(admin => admin._id !== id));
        
        toast.success("Company admin deleted successfully");
      } catch (err) {
        console.error("Error deleting company admin:", err);
        setError("Failed to delete company admin. Please try again.");
        toast.error("Failed to delete company admin");
      }
    }
  };

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredAdmins = companyAdmins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (admin.phoneNumber && admin.phoneNumber.includes(searchTerm))
  );

  // Pagination
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-700 text-gray-500' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`w-8 h-8 rounded-md ${
                currentPage === index + 1 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-700 text-gray-500' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        {/* Professional Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Company Admin Management</h1>
            </div>
            
          </div>
          
          <div className="flex items-center p-3 bg-gray-800 rounded-lg">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search company admins..."
              className="bg-transparent border-none outline-none text-white w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin) => (
                  <tr key={admin._id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-4">{admin._id.substring(0, 6)}</td>
                    <td className="p-4 font-medium">{admin.name}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">{admin.phoneNumber || "N/A"}</td>
                    <td className="p-4">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          admin.isActive ? "bg-green-500/20 text-green-400 border border-green-500" : "bg-red-500/20 text-red-400 border border-red-500"
                        }`}
                      >
                        {admin.isActive ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button 
                        className={`px-3 py-1 text-sm rounded-md ${
                          admin.isActive 
                            ? "bg-amber-600 hover:bg-amber-700" 
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                        onClick={() => handleToggleStatus(admin._id)}
                      >
                        {admin.isActive ? "Block" : "Unblock"}
                      </button>
                      <button 
                        className="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(admin._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {currentAdmins.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <p className="mt-2">No company admins found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && renderPagination()}
      </div>
    </div>
  );
};

export default CompanyAdminManagement;
