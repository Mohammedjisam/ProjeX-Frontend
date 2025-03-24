"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import Sidebar from "./Sidebar"
import { useNavigate } from "react-router-dom" // Add this import at the top
import developerAxiosInstance from "../../utils/DeveloperAxiosInstance"


// Define task interface
interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "on-hold"
  dueDate: string
  priority: "low" | "medium" | "high" | "urgent"
  project: {
    name: string
  }
  assignee: {
    name: string
    _id: string
    profileImage?: string
  }
}

// Define column interface
interface Column {
  id: string
  title: string
  tasks: Task[]
}

// Define columns state interface
interface ColumnsState {
  [key: string]: Column
}

// Define developer data interface
interface DeveloperData {
  id: string
  name?: string
  email?: string
  profileImage?: string
}

// Define redux state interface
interface ReduxState {
  developer: {
    developerData: DeveloperData
  }
}

const TaskBoard = () => {
  // Get developer data from Redux
  const developerData = useSelector((state: ReduxState) => state.developer.developerData)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [columns, setColumns] = useState<ColumnsState>({
    pending: {
      id: "pending",
      title: "Not started",
      tasks: [],
    },
    "in-progress": {
      id: "in-progress",
      title: "In progress",
      tasks: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      tasks: [],
    },
  })

  // Fetch tasks based on developer ID
  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      console.log("Developer data", developerData)

      // Use the new developer endpoint
      const response = await developerAxiosInstance.post(`/task/developer`, { developerId: developerData.id })

      // Get all tasks from the response
      const allTasks = response.data.data

      // Create new columns object to avoid state mutation
      const newColumns = {
        pending: {
          ...columns["pending"],
          tasks: allTasks.filter((task: Task) => task.status === "pending"),
        },
        "in-progress": {
          ...columns["in-progress"],
          tasks: allTasks.filter((task: Task) => task.status === "in-progress"),
        },
        completed: {
          ...columns["completed"],
          tasks: allTasks.filter((task: Task) => task.status === "completed"),
        },
      }

      setColumns(newColumns)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update task status
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await developerAxiosInstance.post("/task/updatestatus", {
        taskId,
        status: newStatus,
      })
      // Task status updated successfully
    } catch (error) {
      console.error("Error updating task status:", error)
      // If error, refetch tasks to reset board state
      fetchTasks()
    }
  }

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // If dropped outside the list
    if (!destination) {
      return
    }

    // If dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Find the task being dragged
    const sourceColumn = columns[source.droppableId]
    const draggedTask = sourceColumn.tasks[source.index]

    if (!draggedTask) return

    // Create new columns object
    const newColumns = { ...columns }

    // Remove the task from source column
    const sourceTasksNew = Array.from(sourceColumn.tasks)
    sourceTasksNew.splice(source.index, 1)
    newColumns[source.droppableId] = {
      ...sourceColumn,
      tasks: sourceTasksNew,
    }

    // Add task to destination column with updated status
    const destColumn = newColumns[destination.droppableId]
    const updatedTask = {
      ...draggedTask,
      status: destination.droppableId as "pending" | "in-progress" | "completed" | "on-hold",
    }
    const destTasksNew = Array.from(destColumn.tasks)
    destTasksNew.splice(destination.index, 0, updatedTask)

    newColumns[destination.droppableId] = {
      ...destColumn,
      tasks: destTasksNew,
    }

    // Update state
    setColumns(newColumns)

    // Update task status in backend
    updateTaskStatus(draggedTask._id, destination.droppableId)
  }

  // Fetch tasks on component mount
  useEffect(() => {
    if (developerData && developerData.id) {
      fetchTasks()
    }
  }, [developerData])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  // Get priority badge variant and icon
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return { variant: "destructive", icon: <AlertTriangle className="h-3 w-3 mr-1" /> }
      case "high":
        return { variant: "destructive", icon: null }
      case "medium":
        return { variant: "secondary", icon: null }
      case "low":
        return { variant: "outline", icon: null }
      default:
        return { variant: "outline", icon: null }
    }
  }

  // Get column header color
  const getColumnHeaderColor = (columnId: string) => {
    switch (columnId) {
      case "pending":
        return "border-yellow-500"
      case "in-progress":
        return "border-blue-500"
      case "completed":
        return "border-green-500"
      default:
        return "border-primary"
    }
  }

  // Render task card
  const renderTaskCard = (task: Task, index: number) => {
    const priorityBadge = getPriorityBadge(task.priority)

    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`mb-3 ${snapshot.isDragging ? "opacity-75" : ""}`}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  {task.project?.name || "No Project"}
                </div>
                <div className="font-semibold mb-2">{task.title}</div>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <Badge variant={priorityBadge.variant as any} className="capitalize flex items-center">
                    {priorityBadge.icon}
                    {task.priority}
                  </Badge>
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={task.assignee?.profileImage} alt={task.assignee?.name || "User"} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {task.assignee?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/developer/tasks/${task._id}`);
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }

  // Render column
  const renderColumn = (column: Column) => (
    <div key={column.id} className="w-full md:w-1/3 p-2">
      <div className={`bg-card rounded-md shadow-md border-t-4 ${getColumnHeaderColor(column.id)}`}>
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-lg flex items-center">
            {column.title}
            <Badge variant="secondary" className="ml-2">
              {column.tasks.length}
            </Badge>
          </h2>
        </div>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-3 min-h-[300px] max-h-[calc(100vh-220px)] overflow-y-auto ${
                snapshot.isDraggingOver ? "bg-muted/50" : ""
              }`}
            >
              {column.tasks.map((task, index) => renderTaskCard(task, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )

  // Render loading skeleton
  const renderSkeleton = () => (
    <div className="flex flex-wrap -mx-2">
      {Object.values(columns).map((column) => (
        <div key={`column-${column.id}`} className="w-full md:w-1/3 p-2">
          <div className={`bg-card rounded-md shadow-md border-t-4 ${getColumnHeaderColor(column.id)}`}>
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-lg flex items-center">
                {column.title}
                <Badge variant="secondary" className="ml-2">
                  0
                </Badge>
              </h2>
            </div>
            <div className="p-3 min-h-[300px]">
              {[1, 2, 3].map((i) => (
                <Card key={`skeleton-${column.id}-${i}`} className="mb-3 shadow-sm">
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-full mb-3" />
                    <Skeleton className="h-3 w-1/3 mb-3" />
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-7 w-7 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Tasks</h1>
          <Button onClick={fetchTasks} variant="default" className="gap-2">
            <Calendar className="h-4 w-4" />
            Refresh Tasks
          </Button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          {isLoading ? (
            renderSkeleton()
          ) : (
            <div className="flex flex-wrap -mx-2">{Object.values(columns).map((column) => renderColumn(column))}</div>
          )}
        </DragDropContext>
      </div>
    </div>
  )
}

export default TaskBoard

