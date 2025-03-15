"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import Sidebar from "./Sidebar"
import { Calendar, Check, ChevronDown } from "lucide-react"
import axiosInstance from "../../utils/AxiosConfig"

interface Project {
  _id: string
  name: string
}

interface Developer {
  _id: string
  name: string
  email: string
}

interface TaskFormData {
  title: string
  description: string
  assignee: string
  priority: "low" | "medium" | "high" | "urgent"
  dueDate: string
  remarks: string
}

const AddTask: React.FC = () => {
  const navigate = useNavigate()
  const { id: projectId } = useParams<{ id: string }>();
  const userData = useSelector((state: RootState) => state.projectManager.projectManagerData)

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignee: "",
    priority: "medium",
    dueDate: "",
    remarks: "",
  })

  const [project, setProject] = useState<Project | null>(null)
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false)

  // Fetch project details and developers on component mount
  useEffect(() => {
    console.log("Current projectId from params:", projectId);
    console.log("userdata",userData.id)
    const fetchData = async () => {
      try {
        if (!projectId) {
          console.error("No projectId available from params");
          setErrors({ project: "Project ID is required" });
          return;
        }
  
        // Log the API calls being made
        console.log(`Fetching project data from: /project/${projectId}`);
        console.log("Fetching developers data from: /manager/getalldeveloper");
        

        
        const developersRes = await axiosInstance.get("/manager/getalldeveloper");
        console.log("Developers API response:", developersRes);

  
        if (developersRes.data.success) {
          setDevelopers(developersRes.data.data);
        } else {
          setErrors(prev => ({ ...prev, assignee: "Failed to fetch developers" }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrors({ general: "Failed to load required data. Please try again." });
      }
    };
  
    fetchData();
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Task title is required"
    if (!formData.description.trim()) newErrors.description = "Task description is required"
    if (!formData.assignee) newErrors.assignee = "Assignee is required"
    if (!formData.dueDate) newErrors.dueDate = "Due date is required"
    if (!projectId) newErrors.project = "Project ID is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!validateForm()) return
  
    setLoading(true)
  
    try {
      // Make sure all required fields are present
      const taskData = {
        ...formData,
        createdBy: userData?.id,
        // Ensure date is in the correct format
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }
  
      console.log("Sending task data:", taskData)
  
      const response = await axiosInstance.post(`/task/project/${projectId}`, {
        ...formData,
        createdBy: userData?.id,
      });  
      if (response.data.success) {
        alert("Task created successfully!")
        navigate(`/projectmanager/projects/${projectId}`)
      }
    } catch (error: any) {
      console.error("Error creating task:", error)
      console.error("Error response:", error.response?.data)
  
      if (error.response?.data?.errors) {
        const serverErrors: Record<string, string> = {}
        error.response.data.errors.forEach((err: any) => {
          if (err.field && err.message) {
            serverErrors[err.field] = err.message
          }
        })
        setErrors(serverErrors)
      } else {
        setErrors({ general: "Failed to create task. Please try again." })
      }
    } finally {
      setLoading(false)
    }
  }

  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-blue-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "urgent", label: "Urgent", color: "bg-red-500" },
  ]

  const getPriorityColor = (priority: string) => {
    return priorityOptions.find((option) => option.value === priority)?.color || "bg-blue-500"
  }

  const getPriorityLabel = (priority: string) => {
    return priorityOptions.find((option) => option.value === priority)?.label || "Medium"
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 ml-[240px]">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold text-white mb-6">Add New Task</h1>

          {project && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-lg font-medium text-white">Project: {project.name}</h2>
            </div>
          )}

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Task Title */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
                      Task Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter Task Title"
                      className={`w-full px-3 py-2 bg-gray-700 border ${errors.title ? "border-red-500" : "border-gray-600"} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                  </div>

                  {/* Priority */}
                  <div className="col-span-2 md:col-span-1 relative">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-200 mb-1">
                      Priority
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-3 h-3 rounded-full mr-2 ${getPriorityColor(formData.priority)}`}
                        ></span>
                        {getPriorityLabel(formData.priority)}
                      </div>
                      <ChevronDown size={18} />
                    </button>

                    {showPriorityDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg">
                        {priorityOptions.map((option) => (
                          <div
                            key={option.value}
                            className="px-3 py-2 hover:bg-gray-600 cursor-pointer flex items-center"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, priority: option.value as any }))
                              setShowPriorityDropdown(false)
                            }}
                          >
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${option.color}`}></span>
                            {option.label}
                            {formData.priority === option.value && <Check size={16} className="ml-auto" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Task Description */}
                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
                      Task Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter Task Description"
                      rows={4}
                      className={`w-full px-3 py-2 bg-gray-700 border ${errors.description ? "border-red-500" : "border-gray-600"} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>

                  {/* Due Date */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-200 mb-1">
                      Due Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 bg-gray-700 border ${errors.dueDate ? "border-red-500" : "border-gray-600"} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      <Calendar
                        size={18}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                    {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
                  </div>

                  {/* Assignee */}
                  <div className="col-span-2 md:col-span-1 relative">
                    <label htmlFor="assignee" className="block text-sm font-medium text-gray-200 mb-1">
                      Assignee
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                      className={`w-full px-3 py-2 bg-gray-700 border ${errors.assignee ? "border-red-500" : "border-gray-600"} rounded-md text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      {formData.assignee
                        ? developers.find((dev) => dev._id === formData.assignee)?.name || "Select a developer"
                        : "Select a developer"}
                      <ChevronDown size={18} />
                    </button>

                    {showAssigneeDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {developers.map((developer) => (
                          <div
                            key={developer._id}
                            className="px-3 py-2 hover:bg-gray-600 cursor-pointer flex items-center"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, assignee: developer._id }))
                              setShowAssigneeDropdown(false)
                            }}
                          >
                            {developer.name}
                            {formData.assignee === developer._id && <Check size={16} className="ml-auto" />}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.assignee && <p className="mt-1 text-sm text-red-500">{errors.assignee}</p>}
                  </div>

                  {/* Remarks */}
                  <div className="col-span-2">
                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-200 mb-1">
                      Remarks
                    </label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Add remarks..."
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                  </div>

                  {/* Error message */}
                  {errors.general && (
                    <div className="col-span-2">
                      <p className="text-red-500">{errors.general}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-span-2 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating Task..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTask

