"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Sidebar from "./Sidebar"
import Header from "./Header"
import axiosInstance from "../../utils/AxiosConfig"

interface ProjectManager {
  _id: string
  name: string
  email: string
  role?: string
}

// Interface for Project data
interface ProjectData {
  name: string
  description: string
  clientName: string
  budget: number | ""
  startDate: string
  endDate: string
  projectManager: string
  goal: string
  status: "planned" | "in-progress" | "completed" | "on-hold"
  comments?: string
}

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [projectManagers, setProjectManagers] = useState<ProjectManager[]>([])

  // Initialize project data state
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    clientName: "",
    budget: "",
    startDate: "",
    endDate: "",
    projectManager: "",
    goal: "",
    status: "planned",
    comments: "",
  })

  // Fetch project data and project managers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error("Authentication required")
          navigate("/manager/login")
          return
        }

        // Fetch project managers
        const managersResponse = await axiosInstance.get(`/manager/getallprojectmanager`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (managersResponse.data.success && managersResponse.data.data) {
          setProjectManagers(managersResponse.data.data)
        } else {
          toast.error("Failed to load project managers data")
        }

        // Fetch project details
        const projectResponse = await axiosInstance.get(`/project/getallprojects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (projectResponse.data.success && projectResponse.data.data) {
          const project = projectResponse.data.data

          // Format dates for input fields (YYYY-MM-DD)
          const formatDate = (dateString: string) => {
            const date = new Date(dateString)
            return date.toISOString().split("T")[0]
          }

          setProjectData({
            name: project.name,
            description: project.description,
            clientName: project.clientName,
            budget: project.budget,
            startDate: formatDate(project.startDate),
            endDate: formatDate(project.endDate),
            projectManager: project.projectManager._id,
            goal: project.goal,
            status: project.status,
            comments: project.comments?.join("\n") || "",
          })
        } else {
          toast.error("Failed to load project data")
          navigate("/manager/projects")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load required data")
        navigate("/manager/projects")
      } finally {
        setIsFetching(false)
      }
    }

    fetchData()
  }, [id, navigate])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProjectData({
      ...projectData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Authentication required")
        navigate("/manager/login") // Fixed path
        return
      }

      // Format data for API - only send fields that are in the backend controller
      const formattedData = {
        name: projectData.name,
        description: projectData.description,
        clientName: projectData.clientName,
        budget: projectData.budget === "" ? 0 : Number(projectData.budget),
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        projectManager: projectData.projectManager,
        goal: projectData.goal,
        status: projectData.status,
        // Don't send comments as the backend doesn't handle it in updateProject
      }

      const response = await axiosInstance.put(`/project/updateproject/${id}`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.success) {
        toast.success("Project updated successfully")
        navigate(`/manager/projects/view/${id}`) // Fixed path to match your router
      } else {
        toast.error(response.data.message || "Failed to update project")
      }
    } catch (error: any) {
      console.error("Error updating project:", error)
      const errorMessage = error.response?.data?.message || "An error occurred while updating the project"
      toast.error(errorMessage)

      // Handle validation errors
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`)
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0f121b]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f121b] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg shadow-lg shadow-indigo-900/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-4">
                <h1 className="text-xl font-semibold text-white">Edit Project</h1>
              </div>

              {isFetching ? (
                <div className="p-6 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Name */}
                    <div className="col-span-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Project Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={projectData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                        placeholder="Enter Project Name"
                        required
                      />
                    </div>

                    {/* Goal */}
                    <div className="col-span-1">
                      <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-1">
                        Goal*
                      </label>
                      <input
                        type="text"
                        id="goal"
                        name="goal"
                        value={projectData.goal}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                        placeholder="Define Goal of the project"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                        placeholder="Enter Description"
                        required
                      />
                    </div>

                    {/* Client Name */}
                    <div className="col-span-1">
                      <label htmlFor="clientName" className="block text-sm font-medium text-gray-300 mb-1">
                        Client Name*
                      </label>
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={projectData.clientName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                        placeholder="Enter Client Name"
                        required
                      />
                    </div>

                    {/* Budget */}
                    <div className="col-span-1">
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                        Budget*
                      </label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={projectData.budget}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                        placeholder="Enter Project Budget"
                        min="0"
                        required
                      />
                    </div>

                    {/* Start Date */}
                    <div className="col-span-1">
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">
                        Start Date*
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={projectData.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* End Date */}
                    <div className="col-span-1">
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">
                        End Date*
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={projectData.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Project Manager */}
                    <div className="col-span-1">
                      <label htmlFor="projectManager" className="block text-sm font-medium text-gray-300 mb-1">
                        Project Manager*
                      </label>
                      <select
                        id="projectManager"
                        name="projectManager"
                        value={projectData.projectManager}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                        required
                      >
                        <option value="">Select a Manager</option>
                        {projectManagers.map((manager) => (
                          <option key={manager._id} value={manager._id}>
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={projectData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="planned">Planned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                      </select>
                    </div>

                    {/* Comments */}
                    <div className="col-span-2">
                      <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-1">
                        Comments
                      </label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={projectData.comments}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                        placeholder="Enter Comments"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Note: Comments must be updated separately through the project view page
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate(`/manager/projects/view/${id}`)}
                      className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                        isLoading ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Project"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditProject