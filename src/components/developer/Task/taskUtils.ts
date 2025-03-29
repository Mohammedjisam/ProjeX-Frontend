import { format } from "date-fns";

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-500";
    case "in-progress":
      return "bg-blue-500/10 text-blue-500";
    case "completed":
      return "bg-green-500/10 text-green-500";
    case "on-hold":
      return "bg-orange-500/10 text-orange-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "low":
      return "bg-blue-500/10 text-blue-500";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500";
    case "high":
      return "bg-orange-500/10 text-orange-500";
    case "urgent":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

export const formatTaskDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd MMM yyyy");
  } catch (error) {
    return "Invalid date";
  }
};