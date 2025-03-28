import { Eye } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Skeleton } from "../../ui/skeleton";
import { Project } from "../../../types/Manager/Project";

interface ProjectsTableProps {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
}

export const ProjectsTable = ({
  projects,
  isLoading,
  error,
}: ProjectsTableProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-blue-900/30 text-blue-400 border-blue-800";
      case "closed":
        return "bg-red-900/30 text-red-400 border-red-800";
      case "created":
        return "bg-green-900/30 text-green-400 border-green-800";
      default:
        return "bg-gray-800 text-gray-400 border-gray-700";
    }
  };

  if (error) {
    return (
      <div className="border border-red-900/50 bg-red-900/10 p-4 text-red-400">
        {error.message}
      </div>
    );
  }

  return (
    <div className="border border-gray-800 bg-gray-900 shadow">
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow className="hover:bg-transparent border-b border-gray-800">
            <TableHead className="w-[60px] font-medium text-gray-400 px-6 py-4">NO</TableHead>
            <TableHead className="font-medium text-gray-400 px-6 py-4">Project Name</TableHead>
            <TableHead className="font-medium text-gray-400 px-6 py-4">Client Name</TableHead>
            <TableHead className="font-medium text-gray-400 px-6 py-4">Status</TableHead>
            <TableHead className="font-medium text-gray-400 px-6 py-4">End Date</TableHead>
            <TableHead className="text-right font-medium text-gray-400 px-6 py-4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent border-b border-gray-800">
                <TableCell className="px-6 py-4">
                  <Skeleton className="h-4 w-8 bg-gray-800" />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Skeleton className="h-4 w-40 bg-gray-800" />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Skeleton className="h-4 w-32 bg-gray-800" />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Skeleton className="h-4 w-24 bg-gray-800 inline-block" />
                </TableCell>
              </TableRow>
            ))
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <TableRow key={project._id} className="hover:bg-gray-800/50 border-b border-gray-800">
                <TableCell className="px-6 py-4 text-gray-300">{index + 1}</TableCell>
                <TableCell className="px-6 py-4 font-medium text-white">
                  {project.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-400">
                  {project.clientName}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-sm border ${getStatusVariant(project.status)}`}>
                    {project.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-400">
                  {formatDate(project.endDate)}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700"
                    asChild
                  >
                    <Link to={`/projectmanager/projects/${project._id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6} className="px-6 py-8 text-center text-gray-500">
                No projects found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};