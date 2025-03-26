import { Project } from "../../../types/Manager/Project";
import { Button } from "../../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Plus, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ProjectsTableProps {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  onViewDetails: (projectId: string) => void;
  onCreateProject: () => void;
  onRetry: () => void;
}

export const ProjectsTable = ({
  projects,
  isLoading,
  error,
  onViewDetails,
  onCreateProject,
  onRetry
}: ProjectsTableProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "in-progress":
      case "ongoing":
        return "blue";
      case "completed":
        return "green";
      case "on-hold":
        return "yellow";
      case "planned":
        return "purple";
      case "closed":
        return "gray";
      case "created":
        return "teal";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="bg-destructive/30 border border-destructive text-destructive-foreground p-4 rounded-md">
            <p>{error.message}</p>
            <Button
              onClick={onRetry}
              variant="ghost"
              className="mt-2 text-sm"
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button onClick={onCreateProject}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NO</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No projects found. Click the 'Add Project' button to create one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => (
                <TableRow key={project._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.clientName}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(project.endDate)}</TableCell>
                  <TableCell>
                    <Badge variant={project.companyAdminIsVerified ? "default" : "secondary"}>
                      {project.companyAdminIsVerified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(project._id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};