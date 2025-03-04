"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  Calendar,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Flag,
  MessageSquare,
  Target,
  Trash2,
  User,
  Users,
} from "lucide-react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import axiosInstance from "../../utils/AxiosConfig"

interface Comment {
  _id: string
  text: string
  author: {
    _id: string
    name: string
    role: string
  }
  createdAt: string
}

interface ProjectManager {
  _id: string
  name: string
  email: string
  role: string
}

interface ProjectData {
  _id: string
  name: string
  description: string
  clientName: string
  budget: number
  startDate: string
  endDate: string
  projectManager: ProjectManager
  goal: string
  status: "planned" | "in-progress" | "completed" | "on-hold"
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

const ViewProject: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [newComment, setNewComment] = useState<string>("")
  const [submittingComment, setSubmittingComment] = useState<boolean>(false)

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error("Authentication required")
          navigate("manager/login")
          return
        }

        if (!id) {
          toast.error("Project ID is missing")
          navigate("/manager/projects")
          return
        }

        const response = await axiosInstance.get(`/project/getallprojects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.success) {
          setProject(response.data.data)
        } else {
          toast.error(response.data.message || "Failed to load project data")
          navigate("/manager/projects")
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        toast.error("Failed to load project details")
        navigate("/manager/projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [id, navigate])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
  
    setSubmittingComment(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        navigate("/manager/login");
        return;
      }
  
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        navigate("/manager/login");
        return;
      }
  
      console.log("Using userId for comment:", userId); 
  
      const response = await axiosInstance.post(
        `/project/getallprojects/${id}/comments`,
        {
          text: newComment,
          authorId: userId, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        setProject(response.data.data);
        setNewComment("");
        toast.success("Comment added successfully");
      } else {
        toast.error(response.data.message || "Failed to add comment");
      }
    } catch (error: any) {
      console.error("Error adding comment:", error);
      if (error.response) {
        toast.error(`Failed to add comment: ${error.response.data.message || error.response.statusText}`);
      } else {
        toast.error("Failed to add comment. Please try again.");
      }
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleEditProject = () => {
    navigate(`/manager/projects/${id}/edit`)
  }


  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project? This action cannot be undone.");
    
    if (!confirmDelete) {
      return; 
    }
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        navigate("/manager/login");
        return;
      }
      
     
      const response = await axiosInstance.delete(`/project/getallprojects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        toast.success("Project deleted successfully");
        navigate("/manager/projects");
      } else {
        toast.error(response.data.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-500"
      case "in-progress":
        return "bg-amber-500"
      case "completed":
        return "bg-green-500"
      case "on-hold":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="flex h-screen bg-[#0f121b]">
    
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

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
                    <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
                    <div className="flex items-center space-x-2 text-blue-200">
                      <User size={16} />
                      <span>Client: {project.clientName}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleEditProject}
                      className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button 
                    onClick={handleDeleteProject}
                    className="flex items-center space-x-1 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Start Date
                    </div>
                    <div className="text-white">{formatDate(project.startDate)}</div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      End Date
                    </div>
                    <div className="text-white">{formatDate(project.endDate)}</div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      Budget
                    </div>
                    <div className="text-white">${project.budget.toLocaleString()}</div>
                  </div>
                  <div className="bg-blue-800/50 p-3 rounded-md">
                    <div className="text-blue-300 text-sm mb-1 flex items-center">
                      <Flag size={14} className="mr-1" />
                      Status
                    </div>
                    <div className="flex items-center">
                      <span className={`${getStatusColor(project.status)} w-2 h-2 rounded-full mr-2`}></span>
                      <span className="text-white">{formatStatus(project.status)}</span>
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
                      <div className="bg-gray-800 p-4 rounded-md text-gray-300 leading-relaxed">{project.goal}</div>
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
                          <div className="text-white font-medium">{project.projectManager.name}</div>
                          <div className="text-gray-400 text-sm">{project.projectManager.email}</div>
                          <div className="text-blue-400 text-xs mt-1 capitalize">{project.projectManager.role}</div>
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
                          <span className="text-gray-300">{new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
                          <span className="text-gray-300">Last Updated</span>
                          <span className="text-gray-300">{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-md">
                          <span className="text-gray-300">Duration</span>
                          <span className="text-gray-300">
                            {Math.ceil(
                              (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    Comments & Discussion
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {project.comments && project.comments.length > 0 ? (
                      project.comments.map((comment) => (
                        <div key={comment._id} className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-2">
                              {comment.author.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-white font-medium">{comment.author.name}</div>
                              <div className="text-gray-400 text-xs">
                                {new Date(comment.createdAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-gray-300 ml-10">{comment.text}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-400">
                        No comments yet. Be the first to add a comment!
                      </div>
                    )}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleSubmitComment} className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Add a Comment</h3>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="Type your comment here..."
                      rows={3}
                      required
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        type="submit"
                        disabled={submittingComment || !newComment.trim()}
                        className={`px-4 py-2 rounded-md text-white font-medium ${
                          submittingComment || !newComment.trim()
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-500 transition-colors duration-200"
                        }`}
                      >
                        {submittingComment ? "Submitting..." : "Add Comment"}
                      </button>
                    </div>
                  </form>
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
  )
}

export default ViewProject

