// TaskActionsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FileText, MessageSquare } from "lucide-react";

interface TaskActionsCardProps {
  onEditTask: () => void;
  onAddComment: () => void;
}

export const TaskActionsCard = ({ onEditTask, onAddComment }: TaskActionsCardProps) => {
  return (
    <Card className="bg-[#252b3b] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
          onClick={onEditTask}
        >
          <FileText className="mr-2 h-4 w-4 text-blue-400" />
          Edit Task
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
          onClick={onAddComment}
        >
          <MessageSquare className="mr-2 h-4 w-4 text-purple-400" />
          Add Comment
        </Button>
      </CardContent>
    </Card>
  );
};