import React, { useEffect, useState } from "react";
import { Loader2, Filter, ChevronDown } from "lucide-react";
import axiosInstance from "../../utils/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

interface Company {
  _id: string;
  companyName: string;
  companyType: string;
  companyDomain: string;
  phoneNumber: string;
  address: {
    buildingNo: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  companyAdmin: {
    _id: string;
    name: string;
    email: string;
  };
  adminVerification: boolean;
}

interface FilterOptions {
  companyName: string;
  companyType: string;
  companyDomain: string;
  country: string;
  verified: string;
}

export default function CompanyTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    companyName: "",
    companyType: "",
    companyDomain: "",
    country: "",
    verified: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, [page, filters]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      
      if (filters.companyName) queryParams.append("companyName", filters.companyName);
      if (filters.companyType) queryParams.append("companyType", filters.companyType);
      if (filters.companyDomain) queryParams.append("companyDomain", filters.companyDomain);
      if (filters.country) queryParams.append("country", filters.country);
      if (filters.verified) queryParams.append("verified", filters.verified);

      const response = await axiosInstance.get(`/company`);
      
      if (response.data.success) {
        setCompanies(response.data.data);
        // Calculate total pages based on count
        const totalItems = response.data.count || 0;
        setTotalPages(Math.ceil(totalItems / limit));
        setError(null);
      } else {
        throw new Error(response.data.message || "Failed to fetch companies");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch companies");
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (companyId: string) => {
    navigate(`/admin/company/${companyId}`);
  };

 
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      companyName: "",
      companyType: "",
      companyDomain: "",
      country: "",
      verified: "",
    });
    setPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className=" flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
           
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={filters.companyName}
                  onChange={handleFilterChange}
                  placeholder="Search by name"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Type</label>
                <input
                  type="text"
                  name="companyType"
                  value={filters.companyType}
                  onChange={handleFilterChange}
                  placeholder="Search by type"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Domain</label>
                <input
                  type="text"
                  name="companyDomain"
                  value={filters.companyDomain}
                  onChange={handleFilterChange}
                  placeholder="Search by domain"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  placeholder="Search by country"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Verification Status</label>
                <select
                  name="verified"
                  value={filters.verified}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="true">Verified</option>
                  <option value="false">Pending</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
            <p>{error}</p>
            <button
              onClick={() => fetchCompanies()}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="py-3 px-4 text-left">NO</th>
                    <th className="py-3 px-4 text-left">Company Name</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Domain</th>
                    <th className="py-3 px-4 text-left">Phone</th>
                    <th className="py-3 px-4 text-left">Location</th>
                    <th className="py-3 px-4 text-left">CompanyAdmin</th>
                    <th className="py-3 px-4 text-left">Verification</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-8 text-gray-400">
                        No companies found. Click the 'Add Company' button to create one.
                      </td>
                    </tr>
                  ) : (
                    companies.map((company, index) => (
                      <tr key={company._id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="py-4 px-4">{(page - 1) * limit + index + 1}</td>
                        <td className="py-4 px-4">{company.companyName}</td>
                        <td className="py-4 px-4">{company.companyType}</td>
                        <td className="py-4 px-4">{company.companyDomain}</td>
                        <td className="py-4 px-4">{company.phoneNumber}</td>
                        <td className="py-4 px-4">
                          {company.address.city}, {company.address.country}
                        </td>
                        <td className="py-4 px-4">{company.companyAdmin.name}</td>
                        <td className="py-4 px-4">
                          {company.adminVerification ? (
                            <span className="text-green-400">Verified</span>
                          ) : (
                            <span className="text-yellow-400">Pending</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex space-x-2 justify-center">
                            <button
                              onClick={() => handleViewDetails(company._id)}
                              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {totalPages > 1 && (
              <div className="bg-gray-800 py-3 px-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Page {page} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}