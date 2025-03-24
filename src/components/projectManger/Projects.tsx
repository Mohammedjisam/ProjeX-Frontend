"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { Eye, Search } from "lucide-react"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Card } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"
import Sidebar from "./Sidebar"
import projectAxiosInstance from "../../utils/ProjectAxioInstance"

interface Project {
  _id: string
  name: string
  clientName: string
  status: "ongoing" | "closed" | "created"
  endDate: string
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const projectManagerData = useSelector((state: RootState) => state.projectManager.projectManagerData)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      let response
      if (projectManagerData?._id) {
        response = await projectAxiosInstance.get(`/projectmanager/${projectManagerData._id}`)
      } else {
        response = await projectAxiosInstance.get("/getallprojects")
      }

      if (response.data.success) {
        setProjects(response.data.data || [])
      } else {
        setError("Failed to fetch projects")
      }
    } catch (err: any) {
      setError(`Error fetching projects: ${err.message || "Unknown error"}`)
      console.error("Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [projectManagerData?._id])

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "text-blue-400"
      case "closed":
        return "text-red-400"
      case "created":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-[#1a1f2e]">
      <Sidebar />
      <div className="flex-1 ml-[240px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">Projects</h1>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#252b3b] border-gray-700 text-white placeholder:text-gray-400 w-full"
                />
              </div>
            </div>
          </div>

          <Card className="bg-[#252b3b] border-gray-700">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-gray-400 w-[80px]">NO</TableHead>
                    <TableHead className="text-gray-400">Project Name</TableHead>
                    <TableHead className="text-gray-400">Client Name</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">End Date</TableHead>
                    <TableHead className="text-gray-400 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    [...Array(4)].map((_, index) => (
                      <TableRow key={index} className="border-gray-700">
                        <TableCell>
                          <Skeleton className="h-4 w-8 bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-40 bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-32 bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 bg-gray-700" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <TableRow key={project._id} className="border-gray-700 hover:bg-[#2a3141] transition-colors">
                        <TableCell className="text-gray-300">{index + 1}</TableCell>
                        <TableCell className="text-gray-300 font-medium">{project.name}</TableCell>
                        <TableCell className="text-gray-300">{project.clientName}</TableCell>
                        <TableCell>
                          <span className={`capitalize ${getStatusColor(project.status)}`}>{project.status}</span>
                        </TableCell>
                        <TableCell className="text-gray-300">{formatDate(project.endDate)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                            asChild
                          >
                            <Link to={`/projectmanager/projects/${project._id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border-gray-700">
                      <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                        No projects found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Projects

