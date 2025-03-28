import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { User } from "lucide-react";

interface TaskAssigneeCardProps {
  assignee: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
  } | null; // Make assignee nullable
  createdBy: {
    name: string;
    email?: string;
  };
}

export const TaskAssigneeCard = ({ assignee, createdBy }: TaskAssigneeCardProps) => {
  return (
    <Card className="bg-[#252b3b] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Assigned To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {assignee ? (
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              {assignee?.profileImage ? (
                <AvatarImage src={assignee.profileImage} alt={assignee.name} />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white">
                  {assignee.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-white font-medium">{assignee.name}</p>
              <p className="text-gray-400 text-sm">{assignee.email}</p>
              <Badge className="mt-2 bg-gray-700 text-white">
                {assignee.role}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">No assignee selected</div>
        )}

        <div className="flex items-center space-x-3 pt-4 border-t border-gray-700">
          <div className="p-2 bg-gray-700 rounded-full">
            <User className="h-4 w-4 text-gray-300" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Created By</p>
            <p className="text-white">{createdBy.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};