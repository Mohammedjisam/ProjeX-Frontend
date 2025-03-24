"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Header from "./Header"
import Sidebar from "./Sidebar"
import ProjectCard from "./ProjectCard"
import OverallProgress from "./OverallProgress"
import TestStatus from "./TestStatus"
import { PlusCircle, Filter, Search } from "lucide-react"
import projectmanagerAxiosInstance from "../../utils/ProjectManagerAxiosInstance"
import projectAxiosInstance from "../../utils/ProjectAxioInstance"

interface Project {
  _id: string
  name?: string
  description?: string
  clientName: string
  budget?: number
  startDate?: Date
  endDate?: Date | string
  projectManager?: string | object
  goal?: string
  status: "planned" | "in-progress" | "completed" | "on-hold"
  completionPercentage?: number
  progress?: number
  title?: string
  subtitle?: string
  weeksRemaining?: number
}

interface PaginationData {
  current: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

interface RootState {
  projectManager: {
    projectManagerData: {
      id: string
      // other project manager fields
    }
  }
}

const Dashboard: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(9) // Show up to 9 projects (3x3 grid)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pages: 1,
    hasNext: false,
    hasPrev: false,
  })
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Get project manager ID from Redux store
  const projectManagerData = useSelector((state: RootState) => state.projectManager?.projectManagerData)
  const projectManagerId = projectManagerData?.id

  // Define the calculateWeeksRemaining function before using it
  const calculateWeeksRemaining = (deadline?: string | Date): number => {
    if (!deadline) return 0

    try {
      const deadlineDate = new Date(deadline)
      const today = new Date()
      const diffTime = deadlineDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return Math.max(Math.ceil(diffDays / 7), 0) // Ensure we don't return negative weeks
    } catch (error) {
      console.error("Error calculating weeks remaining:", error)
      return 0
    }
  }

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      if (!projectManagerId) {
        setError("No project manager ID found")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Explicitly adding limit parameter to ensure we get more data
        const response = await projectAxiosInstance.get(
          `/projectmanager/${projectManagerId}?limit=${limit}&page=${page}`,
        )

        const projectsData = response.data.data || []
        console.log("Fetched projects:", projectsData.length, projectsData)

        setProjects(projectsData)

        // Safely set pagination data
        if (response.data.pagination) {
          setPagination(response.data.pagination)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch projects")
        setLoading(false)
      }
    }

    if (projectManagerId) {
      fetchProjects()
    }
  }, [projectManagerId, page, limit])

  // Process projects to calculate weeks remaining
  const processedProjects = projects.map((project) => {
    return {
      _id: project._id,
      title: project.name || project.title || "",
      clientName: project.clientName || "",
      status: project.status || "in-progress",
      progress: project.completionPercentage || project.progress || 0,
      deadline: project.endDate,
      subtitle: project.status || "In Progress",
      weeksRemaining: calculateWeeksRemaining(project.endDate),
    }
  })

  // Filter projects based on search query
  const filteredProjects = searchQuery
    ? processedProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.clientName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : processedProjects

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500"
      case "in-progress":
        return "bg-blue-500"
      case "planned":
        return "bg-amber-500"
      case "on-hold":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Sidebar />
      <div className="flex-1 ml-[240px]">
        <div className="py-8 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <Header title="Projects Dashboard" />
            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg border border-slate-700">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                <PlusCircle className="h-4 w-4" />
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-xl border border-blue-500/20 shadow-lg">
              <h3 className="text-slate-300 text-sm font-medium mb-2">Total Projects</h3>
              <p className="text-3xl font-bold text-white">{processedProjects.length}</p>
              <div className="mt-2 text-blue-300 text-sm">
                {pagination.pages > 1 ? `Showing ${limit} of ${pagination.pages * limit}` : "All projects"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/20 shadow-lg">
              <h3 className="text-slate-300 text-sm font-medium mb-2">Completed</h3>
              <p className="text-3xl font-bold text-white">
                {processedProjects.filter((p) => p.status === "completed").length}
              </p>
              <div className="mt-2 text-emerald-300 text-sm">
                {Math.round(
                  (processedProjects.filter((p) => p.status === "completed").length / processedProjects.length) * 100,
                ) || 0}
                % completion rate
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 p-6 rounded-xl border border-amber-500/20 shadow-lg">
              <h3 className="text-slate-300 text-sm font-medium mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-white">
                {processedProjects.filter((p) => p.status === "in-progress").length}
              </p>
              <div className="mt-2 text-amber-300 text-sm">
                {Math.round(
                  (processedProjects.filter((p) => p.status === "in-progress").length / processedProjects.length) * 100,
                ) || 0}
                % of total projects
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 rounded-xl border border-purple-500/20 shadow-lg">
              <h3 className="text-slate-300 text-sm font-medium mb-2">Average Progress</h3>
              <p className="text-3xl font-bold text-white">
                {Math.round(
                  processedProjects.reduce((acc, curr) => acc + curr.progress, 0) / processedProjects.length,
                ) || 0}
                %
              </p>
              <div className="mt-2 text-purple-300 text-sm">Across all active projects</div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-5 rounded-xl shadow-lg">
              <p className="font-medium text-lg">Error loading projects</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                className="mt-3 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 text-red-200 rounded-lg text-sm transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      title={project.title || project.clientName}
                      subtitle={project.subtitle || ""}
                      progress={project.progress || 0}
                      weeksRemaining={project.weeksRemaining || 0}
                      delay={index * 100}
                      statusColor={getStatusColor(project.status)}
                    />
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-slate-400 py-16 bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg">
                    <p className="text-lg font-medium">No projects found</p>
                    <p className="text-sm mt-2 text-slate-500">
                      {searchQuery ? "Try a different search term" : "Create a new project to get started"}
                    </p>
                    {searchQuery && (
                      <button
                        className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg">
                  <h2 className="text-xl font-semibold text-white mb-4">Overall Progress</h2>
                  <OverallProgress projects={processedProjects} />
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg">
                  <h2 className="text-xl font-semibold text-white mb-4">Test Status</h2>
                  <TestStatus projects={processedProjects} />
                </div>
              </div>

              {processedProjects.length > 0 && pagination.pages > 1 && (
                <div className="flex justify-center mt-8 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <button
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-slate-700 mr-2 transition-colors"
                    disabled={!pagination.hasPrev}
                    onClick={() => handlePageChange(pagination.current - 1)}
                  >
                    Previous
                  </button>
                  <div className="flex items-center px-4">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`w-8 h-8 mx-1 rounded-md flex items-center justify-center transition-colors ${
                          pageNum === pagination.current
                            ? "bg-blue-600 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  <button
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-slate-700 ml-2 transition-colors"
                    disabled={!pagination.hasNext}
                    onClick={() => handlePageChange(pagination.current + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

