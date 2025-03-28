import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { MessageSquare, Briefcase } from "lucide-react";
import { ProjectManager } from "../../../types/Manager/ProjectManager";

interface ProjectSidebarProps {
  projectManager: ProjectManager;
  onAddComment: () => void;
  onUpdateStatus: () => void;
}

export const ProjectSidebar = ({ 
  projectManager,
  onAddComment,
  onUpdateStatus
}: ProjectSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-[#252b3b] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Project Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              {projectManager?.profileImage ? (
                <AvatarImage
                  src={projectManager.profileImage}
                  alt={projectManager.name}
                />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white">
                  {projectManager?.name.charAt(0) || "PM"}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-white font-medium">
                {projectManager?.name}
              </p>
              <p className="text-gray-400 text-sm">
                {projectManager?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252b3b] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
            onClick={onAddComment}
          >
            <MessageSquare className="mr-2 h-4 w-4 text-blue-400" />
            Add Comment
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
            onClick={onUpdateStatus}
          >
            <Briefcase className="mr-2 h-4 w-4 text-purple-400" />
            Update Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};