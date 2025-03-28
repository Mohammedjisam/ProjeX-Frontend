"use client";

import { useState } from "react";
import Sidebar from "../../components/projectManger/Sidebar";
import { ProjectsTable } from "../../components/projectManger/Project/ProjectsTable";
import { useProjects } from "../../hooks/projectManager/useProjects";
import { Search } from "lucide-react";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: projects = [], isLoading, error } = useProjects();

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#252b3b] border border-gray-700 rounded-md px-3 py-2 text-white placeholder:text-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <ProjectsTable
            projects={filteredProjects}  // Pass filtered projects
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;