"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import axiosInstance from "../../utils/AxiosConfig"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useParams, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"

// Task interface based on your MongoDB model
interface ITask {
  _id: string
  title: string
  description: string
  project: string
  assignee: {
    _id: string
    name: string
    email: string
    role: string
  }
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "completed" | "on-hold"
  dueDate: string
  remarks?: string
  createdBy: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate();
  const { id } = useParams()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        console.log("project id ", id)
        const response = await axiosInstance.get(`/task/project/${id}`)

        if (response.data.success) {
          setTasks(response.data.data || [])
        } else {
          setError("Failed to fetch tasks")
        }
      } catch (err) {
        setError("An error occurred while fetching tasks")
        console.error("Error fetching tasks:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [id])

  const handleViewDetails = (taskId: string) => {
    // Navigate to task details page with the task ID in the params
    navigate(`/projectmanager/projects/${id}/tasks/${taskId}`)
  }

  const handleDelete = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axiosInstance.delete(`/task/${taskId}`)

        if (response.data.success) {
          // Remove the deleted task from the state
          setTasks(tasks.filter((task) => task._id !== taskId))
        } else {
          setError("Failed to delete task")
        }
      } catch (err) {
        setError("An error occurred while deleting the task")
        console.error("Error deleting task:", err)
      }
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "not started":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "on-hold":
        return "bg-gray-500 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[240px] flex-1 p-6">
        <div className="w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Tasks</h1>
            <button
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors"
              onClick={() => navigate(`/projectmanager/projects/${id}/addtask`)}
            >
              Add Task
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-2">Loading tasks...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-6">{error}</div>
          ) : tasks.length === 0 ? (
            <div className="text-gray-400 text-center py-6">No tasks found. Create a new task to get started.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="py-3 px-4 text-left">NO</th>
                    <th className="py-3 px-4 text-left">Task Title</th>
                    <th className="py-3 px-4 text-left">Assignee</th>
                    <th className="py-3 px-4 text-left">Priority</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">End Date</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tasks.map((task, index) => (
                    <tr key={task._id} className="hover:bg-gray-800 transition-colors">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4 font-medium">{task.title}</td>
                      <td className="py-4 px-4">{task.assignee?.name || "Unassigned"}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {task.dueDate ? format(new Date(task.dueDate), "dd/MM/yyyy") : "No date"}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(task._id)}
                            className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="bg-red-900 hover:bg-red-800 text-white text-xs px-3 py-1 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskTable