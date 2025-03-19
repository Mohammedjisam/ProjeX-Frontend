"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  Flag,
  MessageSquare,
  Target,
  Trash2,
  User,
  Users,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import Sidebar from "./Sidebar";
import axiosInstance from "../../utils/AxiosConfig";

interface Comment {
  _id: string;
  text: string;
  author: {
    _id: string;
    name: string;
    role: string;
  };
  createdAt: string;
}

interface ProjectManager {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface ProjectData {
  projectId: string;
  name: string;
  description: string;
  clientName: string;
  budget: number;
  startDate: string;
  endDate: string;
  projectManager: ProjectManager;
  goal: string;
  status: "planned" | "in-progress" | "completed" | "on-hold";
  companyAdminIsVerified: boolean;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

const ViewProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjectData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            toast.error("Authentication required");
            navigate("/companyAdmin/login");
            return;
          }
      
          if (!projectId) {
            toast.error("Project ID is missing");
            navigate("/companyAdmin/projects");
            return;
          }
      
          // Get user role from localStorage
          const role = localStorage.getItem("role");
          setUserRole(role || "");
      
          // Updated API endpoint to match backend expectation
          const response = await axiosInstance.get(
            `/project/getallprojects/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          if (response.data.success) {
            setProject(response.data.data);
          } else {
            toast.error(response.data.message || "Failed to load project data");
            navigate("/companyAdmin/projects");
          }
        } catch (error) {
          console.error("Error fetching project:", error);
          toast.error("Failed to load project details");
          navigate("/companyAdmin/projects");
        } finally {
          setLoading(false);
        }
      };

    fetchProjectData();
  }, [projectId, navigate]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  const handleToggleVerification = async () => {
    if (!project) return;
    
    setVerifying(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        navigate("/companyAdmin/login");
        return;
      }
      
      const response = await axiosInstance.patch(
        `/project/projects/${projectId}/toggle-verification`,
        {}, // Empty request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        // Only update the specific field that changed instead of replacing the entire object
        setProject(prevProject => {
          if (!prevProject) return null;
          return {
            ...prevProject,
            companyAdminIsVerified: !prevProject.companyAdminIsVerified
          };
        });
        toast.success(response.data.message || "Verification status updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update verification status");
      }
    } catch (error: any) {
      console.error("Error toggling verification:", error);
      if (error.response) {
        toast.error(
          `Failed to update verification: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else {
        toast.error("Failed to update verification status. Please try again.");
      }
    } finally {
      setVerifying(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-500";
      case "in-progress":
        return "bg-amber-500";
      case "completed":
        return "bg-green-500";
      case "on-hold":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };



  return (
    <div className="flex h-screen bg-[#0f121b]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f121b] p-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : project ? (
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-t-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                      {project.name}
                    </h1>
                    <div className="flex items-center space-x-2 text-blue-200">
                      <User size={16} />
                      <span>Client: {project.clientName}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    
                      <button
                        onClick={handleToggleVerification}
                        disabled={verifying}
                        className={`flex items-center ${
                          project.companyAdminIsVerified 
                            ? "bg-red-600 hover:bg-red-700" 
                            : "bg-green-600 hover:bg-green-700"
                        } text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-md`}
                      >
                        {verifying ? (
                          <div className="flex items-center">
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full mr-2"></div>
                            <span>Processing...</span>
                          </div>
                        ) : project.companyAdminIsVerified ? (
                          <>
                            <XCircle size={18} className="mr-2" />
                            <span>Revoke Verification</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} className="mr-2" />
                            <span>Verify Project</span>
                          </>
                        )}
                      </button>
                    
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Start Date
                    </div>
                    <div className="text-white">
                      {formatDate(project.startDate)}
                    </div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      End Date
                    </div>
                    <div className="text-white">
                      {formatDate(project.endDate)}
                    </div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      ₹ Budget
                    </div>
                    <div className="text-white">
                      ₹ {project.budget.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Flag size={14} className="mr-1" />
                      Status
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`${getStatusColor(
                          project.status
                        )} w-2 h-2 rounded-full mr-2`}
                      ></span>
                      <span className="text-white">
                        {formatStatus(project.status)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Shield size={14} className="mr-1" />
                      Verification Status
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`${
                          project.companyAdminIsVerified
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } w-2 h-2 rounded-full mr-2`}
                      ></span>
                      <span className="text-white">
                        {project.companyAdminIsVerified
                          ? "Verified"
                          : "Pending Verification"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 shadow-lg rounded-b-lg mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <FileText size={18} className="mr-2 text-blue-400" />
                        Description
                      </h2>
                      <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">
                        {project.description}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Target size={18} className="mr-2 text-blue-400" />
                        Project Goal
                      </h2>
                      <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">
                        {project.goal}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-800 p-4 rounded-md">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Users size={18} className="mr-2 text-blue-400" />
                        Project Manager
                      </h2>
                      <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-md">
                        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
                          {project.projectManager.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {project.projectManager.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {project.projectManager.email}
                          </div>
                          <div className="text-blue-400 text-xs mt-1 capitalize">
                            {project.projectManager.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-md">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Clock size={18} className="mr-2 text-blue-400" />
                        Timeline
                      </h2>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
                          <span className="text-gray-300">Created</span>
                          <span className="text-gray-300">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
                          <span className="text-gray-300">Last Updated</span>
                          <span className="text-gray-300">
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
                          <span className="text-gray-300">Duration</span>
                          <span className="text-gray-300">
                            {Math.ceil(
                              (new Date(project.endDate).getTime() -
                                new Date(project.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="text-white text-xl">Project not found</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewProject;