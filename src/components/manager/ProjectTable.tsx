import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import managerAxiosInstance from "../../utils/ManagerAxiosInstance";

interface Project {
  _id: string;
  name: string;
  clientName: string;
  status: "planned" | "in-progress" | "completed" | "on-hold";
  endDate: string;
  companyAdminIsVerified: boolean;
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await managerAxiosInstance.get("/project/getallprojects");
        setProjects(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewDetails = (projectId: string) => {
    navigate(`/manager/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate("/manager/addproject");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
      case "ongoing":
        return "text-blue-400";
      case "completed":
        return "text-green-400";
      case "on-hold":
        return "text-yellow-400";
      case "planned":
        return "text-purple-400";
      case "closed":
        return "text-gray-400";
      case "created":
        return "text-teal-400";
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
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Projects</h1>
              <button
                onClick={handleCreateProject}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Project</span>
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
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
                        <th className="py-3 px-4 text-left">End Date</th>
                        <th className="py-3 px-4 text-left">Verified</th>{" "}
                        {/* New column */}
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {projects.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center py-8 text-gray-400"
                          >
                            {" "}
                            {/* Update colspan to 7 */}
                            No projects found. Click the 'Add Project' button to
                            create one.
                          </td>
                        </tr>
                      ) : (
                        projects.map((project, index) => (
                          <tr
                            key={project._id}
                            className="hover:bg-gray-800/50 transition-colors"
                          >
                            <td className="py-4 px-4">{index + 1}</td>
                            <td className="py-4 px-4">{project.name}</td>
                            <td className="py-4 px-4">{project.clientName}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`capitalize ${getStatusColor(
                                  project.status
                                )}`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              {formatDate(project.endDate)}
                            </td>
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
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
