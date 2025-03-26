// src/components/manager/ProjectView/CommentsSection.tsx
import { MessageSquare } from "lucide-react";
import { Comment } from "../../../../types/Manager/Project";
import { Button } from "../../../ui/button";
import { useState } from "react";

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
  isSubmitting: boolean;
}

export const CommentsSection = ({ 
  comments, 
  onAddComment, 
  isSubmitting 
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <MessageSquare size={18} className="mr-2" />
          Comments & Discussion
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          ) : (
            <div className="text-center py-6 text-gray-400">
              No comments yet. Be the first to add a comment!
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Add a Comment</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Type your comment here..."
            rows={3}
            required
          />
          <div className="mt-3 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isSubmitting ? "Submitting..." : "Add Comment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-2">
        {comment.author.name.charAt(0)}
      </div>
      <div>
        <div className="text-white font-medium">{comment.author.name}</div>
        <div className="text-gray-400 text-xs">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
    <div className="text-gray-300 ml-10">{comment.text}</div>
  </div>
);