"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import {
  ArrowLeft,
  Calendar,
  AlarmClock,
  Clock,
  CheckCircle2,
  MessageSquare,
  User,
  Briefcase,
  FileText,
  AlertTriangle,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import axiosInstance from "../../utils/AxiosConfig";
import Sidebar from "./Sidebar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Skeleton } from "../../components/ui/skeleton";

interface TaskDetails {
  _id: string;
  title: string;
  description: string;
  project: {
    _id: string;
    name: string;
    clientName: string;
    status: string;
  };
  assignee: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  dueDate: string;
  remarks?: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  createdAt: string;
  updatedAt: string;
  daysRemaining: number;
  isOverdue: boolean;
}

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userData = useSelector(
    (state: RootState) => state.projectManager.projectManagerData
  );

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching task with ID:", taskId);

        const response = await axiosInstance.get(`/task/${taskId}`);
        
        console.log("API Response:", response.data);

        if (response.data.success) {
          setTask(response.data.data);
        } else {
          setError(
            "Failed to fetch task details: " +
              (response.data.message || "Unknown error")
          );
        }
      } catch (err: any) {
        console.error("Error fetching task details:", err);
        setError(
          `Error fetching task details: ${err.message || "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTaskDetails();
    } else {
      setError("No task ID provided");
      setLoading(false);
    }
  }, [taskId]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status: string) => {
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

  const getPriorityColor = (priority: string) => {
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

  const renderSkeleton = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-40 bg-gray-700" />
        <Skeleton className="h-6 w-24 bg-gray-700 rounded-full" />
      </div>

      <Card className="bg-[#252b3b] border-gray-700">
        <CardHeader>
          <Skeleton className="h-7 w-64 bg-gray-700" />
          <Skeleton className="h-4 w-full bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-5 w-5 bg-gray-700" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-6 w-full bg-gray-700" />
          <Skeleton className="h-4 w-full bg-gray-700" />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#1a1f2e]">
      <Sidebar />
      <div className="flex-1 ml-[240px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {loading ? (
              renderSkeleton()
            ) : error ? (
              <Card className="bg-[#252b3b] border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center text-red-400 py-8">
                    <p>{error}</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-gray-700 text-white hover:bg-gray-700"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : task ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {task.title}
                    </h1>
                    <p className="text-gray-400">
                      Project: <Link to={`/projectmanager/projects/${task.project._id}`} className="hover:text-blue-400">{task.project.name}</Link>
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Badge
                      className={`${getPriorityColor(
                        task.priority
                      )} px-3 py-1 text-xs uppercase`}
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      className={`${getStatusColor(
                        task.status
                      )} px-3 py-1 text-xs uppercase`}
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-[#252b3b] border-gray-700 col-span-2">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Task Details
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Created on {formatDate(task.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Due Date</p>
                            <p className="text-white">
                              {formatDate(task.dueDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <AlarmClock className="h-5 w-5 text-orange-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Days Remaining</p>
                            <p className={`${task.isOverdue ? 'text-red-400' : 'text-white'}`}>
                              {task.isOverdue 
                                ? 'Overdue' 
                                : task.daysRemaining > 0 
                                  ? `${task.daysRemaining} days` 
                                  : 'Due today'
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Flag className="h-5 w-5 text-yellow-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Priority</p>
                            <p className="text-white capitalize">{task.priority}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Status</p>
                            <p className="text-white capitalize">{task.status}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Briefcase className="h-5 w-5 text-purple-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Project</p>
                            <p className="text-white">
                              <Link to={`/projectmanager/projects/${task.project._id}`} className="hover:text-blue-400">
                                {task.project.name}
                              </Link>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <User className="h-5 w-5 text-cyan-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Created By</p>
                            <p className="text-white">{task.createdBy?.name || "Unknown"}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-medium mb-2">Description</h3>
                        <p className="text-gray-300">{task.description}</p>
                      </div>

                      {task.remarks && (
                        <div>
                          <h3 className="text-white font-medium mb-2">Remarks</h3>
                          <p className="text-gray-300">{task.remarks}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t border-gray-700 flex justify-between pt-6">
                      <Button 
                        className={`${
                          task.status === 'completed' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                        onClick={() => {
                          // This would be the update task endpoint
                          if (task.status !== 'completed') {
                            navigate(`/projectmanager/tasks/${id}/edit`);
                          }
                        }}
                      >
                        {task.status === 'completed' ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock className="mr-2 h-4 w-4" />
                            Update Status
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-700"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Add Remarks
                      </Button>
                    </CardFooter>
                  </Card>

                  <div className="space-y-6">
                    <Card className="bg-[#252b3b] border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">
                          Assigned To
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            {task.assignee?.profileImage ? (
                              <AvatarImage
                                src={task.assignee.profileImage}
                                alt={task.assignee.name}
                              />
                            ) : (
                              <AvatarFallback className="bg-blue-600 text-white">
                                {task.assignee?.name.charAt(0) || "U"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">
                              {task.assignee?.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {task.assignee?.email}
                            </p>
                            <Badge className="mt-2 bg-gray-700 text-white">
                              {task.assignee?.role}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {task.isOverdue && task.status !== 'completed' && (
                      <Card className="bg-[#2b2535] border-red-900">
                        <CardContent className="pt-6">
                          <div className="flex items-center space-x-3 text-red-400">
                            <AlertTriangle className="h-5 w-5" />
                            <p className="font-medium">This task is overdue</p>
                          </div>
                          <p className="text-gray-300 mt-2 text-sm">
                            The due date was {formatDate(task.dueDate)}. Please update the status or extend the deadline.
                          </p>
                        </CardContent>
                      </Card>
                    )}

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
                          onClick={() => navigate(`/projectmanager/tasks/${id}/edit`)}
                        >
                          <FileText className="mr-2 h-4 w-4 text-blue-400" />
                          Edit Task
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
                        >
                          <MessageSquare className="mr-2 h-4 w-4 text-purple-400" />
                          Add Comment
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="bg-[#252b3b] border-gray-700">
                    <TabsTrigger
                      value="timeline"
                      className="data-[state=active]:bg-gray-700"
                    >
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-gray-700"
                    >
                      Activity Log
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline">
                    <Card className="bg-[#252b3b] border-gray-700 mt-6">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="border-l-2 border-blue-500 pl-4 pb-4">
                            <div className="flex justify-between">
                              <p className="text-white font-medium">Task Created</p>
                              <p className="text-gray-400 text-sm">{formatDate(task.createdAt)}</p>
                            </div>
                            <p className="text-gray-300 mt-1">
                              Created by {task.createdBy.name}
                            </p>
                          </div>
                          
                          {task.createdAt !== task.updatedAt && (
                            <div className="border-l-2 border-yellow-500 pl-4 pb-4">
                              <div className="flex justify-between">
                                <p className="text-white font-medium">Task Updated</p>
                                <p className="text-gray-400 text-sm">{formatDate(task.updatedAt)}</p>
                              </div>
                              <p className="text-gray-300 mt-1">
                                Last modified on {formatDate(task.updatedAt)}
                              </p>
                            </div>
                          )}
                          
                          <div className={`border-l-2 ${task.isOverdue ? 'border-red-500' : 'border-green-500'} pl-4 pb-4`}>
                            <div className="flex justify-between">
                              <p className="text-white font-medium">Due Date</p>
                              <p className={`text-sm ${task.isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
                                {formatDate(task.dueDate)}
                              </p>
                            </div>
                            <p className={`mt-1 ${task.isOverdue ? 'text-red-400' : 'text-gray-300'}`}>
                              {task.isOverdue 
                                ? 'This task is overdue' 
                                : task.daysRemaining > 0 
                                  ? `${task.daysRemaining} days remaining` 
                                  : 'Due today'
                              }
                            </p>
                          </div>
                        </div>
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
              </>
            ) : (
              <Card className="bg-[#252b3b] border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center text-gray-400 py-8">
                    <p>Task not found</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;