import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { MessageSquare, Clock } from "lucide-react";
import { Comment } from "../../../types/Manager/Project";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

interface ProjectTabsProps {
  comments: Comment[];
  projectId: string;
}

export const ProjectTabs = ({ comments, projectId }: ProjectTabsProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPpp");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Tabs defaultValue="comments" className="w-full">
      <TabsList className="bg-[#252b3b] border-gray-700">
        <TabsTrigger
          value="comments"
          className="data-[state=active]:bg-gray-700"
        >
          Comments ({comments?.length || 0})
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          className="data-[state=active]:bg-gray-700"
        >
          Activity Log
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="comments">
        <Card className="bg-[#252b3b] border-gray-700 mt-6">
          <CardContent className="pt-6">
            {comments && comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex space-x-4 pb-4 border-b border-gray-700"
                  >
                    <Avatar className="h-8 w-8">
                      {comment.author?.profileImage ? (
                        <AvatarImage
                          src={comment.author.profileImage}
                          alt={comment.author.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-gray-600 text-white">
                          {comment.author?.name.charAt(0) || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">
                          {comment.author?.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-300 mt-1">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-2" />
                <p>No comments yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="activity">
        <Card className="bg-[#252b3b] border-gray-700 mt-6">
          <CardContent className="pt-6">
            <div className="text-center text-gray-400 py-8">
              <Clock className="mx-auto h-12 w-12 opacity-20 mb-2" />
              <p>Activity log coming soon</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};