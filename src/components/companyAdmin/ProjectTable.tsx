import React, { useEffect, useState } from "react";
import {Loader2, Filter, ChevronDown } from "lucide-react";
import axiosInstance from "../../utils/AxiosConfig";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

interface Project {
  _id: string;
  name: string;
  clientName: string;
  status: "planned" | "in-progress" | "completed" | "on-hold";
  endDate: string;
  companyAdminIsVerified: boolean;
  startDate: string;
}

interface FilterOptions {
  status: string;
  clientName: string;
  startDateFrom: string;
  startDateTo: string;
  verified: string;
}

export default function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: "",
    clientName: "",
    startDateFrom: "",
    startDateTo: "",
    verified: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [page, filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.clientName) queryParams.append("clientName", filters.clientName);
      if (filters.startDateFrom) queryParams.append("startDateFrom", filters.startDateFrom);
      if (filters.startDateTo) queryParams.append("startDateTo", filters.startDateTo);
      if (filters.verified) queryParams.append("verified", filters.verified);

      const response = await axiosInstance.get(`/project/getallprojects?${queryParams.toString()}`);
      setProjects(response.data.data);
      setTotalPages(response.data.pagination.pages);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (projectId: string) => {
    navigate(`/companyadmin/projects/${projectId}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      clientName: "",
      startDateFrom: "",
      startDateTo: "",
      verified: "",
    });
    setPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "text-blue-400";
      case "completed":
        return "text-green-400";
      case "on-hold":
        return "text-yellow-400";
      case "planned":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className="ml-[240px] flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Projects</h1>
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
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={filters.clientName}
                  onChange={handleFilterChange}
                  placeholder="Search by client name"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date From</label>
                <input
                  type="date"
                  name="startDateFrom"
                  value={filters.startDateFrom}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date To</label>
                <input
                  type="date"
                  name="startDateTo"
                  value={filters.startDateTo}
                  onChange={handleFilterChange}
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
              onClick={() => fetchProjects()}
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
                    <th className="py-3 px-4 text-left">Project Name</th>
                    <th className="py-3 px-4 text-left">Client Name</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Start Date</th>
                    <th className="py-3 px-4 text-left">End Date</th>
                    <th className="py-3 px-4 text-left">Verification</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-400">
                        No projects found. Click the 'Add Project' button to create one.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project, index) => (
                      <tr key={project._id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="py-4 px-4">{(page - 1) * limit + index + 1}</td>
                        <td className="py-4 px-4">{project.name}</td>
                        <td className="py-4 px-4">{project.clientName}</td>
                        <td className="py-4 px-4">
                          <span className={`capitalize ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">{formatDate(project.startDate)}</td>
                        <td className="py-4 px-4">{formatDate(project.endDate)}</td>
                        <td className="py-4 px-4">
                          {project.companyAdminIsVerified ? (
                            <span className="text-green-400">Verified</span>
                          ) : (
                            <span className="text-yellow-400">Pending</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleViewDetails(project._id)}
                            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
                          >
                            View Details
                          </button>
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