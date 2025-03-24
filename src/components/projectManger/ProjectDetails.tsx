"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  Target,
  User,
  CheckCircle2,
  ListTodo,
  CalendarClock,
  MessageSquare,
  Briefcase,
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
import { Progress } from "../../components/ui/progress";
import { Skeleton } from "../../components/ui/skeleton";
import projectAxiosInstance from "../../utils/ProjectAxioInstance";

interface ProjectDetails {
  _id: string;
  name: string;
  description: string;
  clientName: string;
  budget: number;
  startDate: string;
  endDate: string;
  goal: string;
  status: "planned" | "in-progress" | "completed" | "on-hold";
  projectManager: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  comments: Array<{
    _id: string;
    text: string;
    author: {
      _id: string;
      name: string;
      profileImage?: string;
    };
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
  completionPercentage?: number;
}

const ProjectDetails: React.FC = () => {
  // Change from projectId to id to match the route parameter in ProjectManagerRoutes
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const projectManagerData = useSelector(
    (state: RootState) => state.projectManager.projectManagerData
  );

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching project with ID:", id);

        let response;
        if (projectManagerData?._id) {
          // Use the correct endpoint from your API
          response = await projectAxiosInstance.get(
            `/projectmanager/${projectManagerData._id}/project/${id}`
          );
          console.log("Using manager-specific endpoint");
        } else {
          // Use the correct general endpoint from your API
          response = await projectAxiosInstance.get(`/getallprojects/${id}`);
          console.log("Using general project endpoint");
        }

        console.log("API Response:", response.data);

        if (response.data.success) {
          setProject(response.data.data);
        } else {
          setError(
            "Failed to fetch project details: " +
              (response.data.message || "Unknown error")
          );
        }
      } catch (err: any) {
        console.error("Error fetching project details:", err);
        setError(
          `Error fetching project details: ${err.message || "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetails();
    } else {
      setError("No project ID provided");
      setLoading(false);
    }
  }, [id, projectManagerData?._id]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planned":
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

  const calculateDaysLeft = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              asChild
            >
              <Link to="/projectmanager/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
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
            ) : project ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {project.name}
                    </h1>
                    <p className="text-gray-400">
                      Client: {project.clientName}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      project.status
                    )} px-3 py-1 text-xs uppercase`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-[#252b3b] border-gray-700 col-span-2">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Project Overview
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Created on {formatDate(project.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Timeline</p>
                            <p className="text-white">
                              {formatDate(project.startDate)} -{" "}
                              {formatDate(project.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <DollarSign className="h-5 w-5 text-green-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Budget</p>
                            <p className="text-white">
                              ${project.budget.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">
                              Days Remaining
                            </p>
                            <p className="text-white">
                              {calculateDaysLeft(project.endDate)} days
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-purple-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Goal</p>
                            <p className="text-white">{project.goal}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <User className="h-5 w-5 text-orange-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">
                              Project Manager
                            </p>
                            <p className="text-white">
                              {project.projectManager?.name || "Not assigned"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5" />
                          <div>
                            <p className="text-gray-400 text-sm">Completion</p>
                            <div className="w-full">
                              <div className="flex justify-between mb-1">
                                <span className="text-white">
                                  {project.completionPercentage || 0}%
                                </span>
                              </div>
                              <Progress
                                value={project.completionPercentage || 0}
                                className="h-2 bg-gray-700"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-medium mb-2">
                          Description
                        </h3>
                        <p className="text-gray-300">{project.description}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-700 flex justify-between pt-6">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() =>
                          navigate(`/projectmanager/projects/${id}/tasks`)
                        }>
                        <ListTodo className="mr-2 h-4 w-4" />
                        Show Tasks
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-700"
                        onClick={() =>
                          navigate(`/projectmanager/projects/${id}/addtask`)
                        }
                      >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        Schedule Task
                      </Button>
                    </CardFooter>
                  </Card>

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
                            {project.projectManager?.profileImage ? (
                              <AvatarImage
                                src={project.projectManager.profileImage}
                                alt={project.projectManager.name}
                              />
                            ) : (
                              <AvatarFallback className="bg-blue-600 text-white">
                                {project.projectManager?.name.charAt(0) || "PM"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">
                              {project.projectManager?.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {project.projectManager?.email}
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
                        >
                          <MessageSquare className="mr-2 h-4 w-4 text-blue-400" />
                          Add Comment
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-700 text-white hover:bg-gray-700"
                        >
                          <Briefcase className="mr-2 h-4 w-4 text-purple-400" />
                          Update Status
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Tabs defaultValue="comments" className="w-full">
                  <TabsList className="bg-[#252b3b] border-gray-700">
                    <TabsTrigger
                      value="comments"
                      className="data-[state=active]:bg-gray-700"
                    >
                      Comments ({project.comments?.length || 0})
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
                        {project.comments && project.comments.length > 0 ? (
                          <div className="space-y-4">
                            {project.comments.map((comment) => (
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
              </>
            ) : (
              <Card className="bg-[#252b3b] border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center text-gray-400 py-8">
                    <p>Project not found</p>
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

export default ProjectDetails;
