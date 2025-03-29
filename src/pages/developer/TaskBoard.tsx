"use client";

import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/developer/Sidebar";
import { useNavigate } from "react-router-dom";
import { useTaskBoard } from "../../hooks/developer/useTaskBoard";
import { Skeleton } from "../../components/ui/skeleton";
import { TaskCard } from "../../components/developer/Task/TaskCard";
import { Badge } from "../../components/ui/badge";

const TaskBoard = () => {
  const navigate = useNavigate();
  const { columns, isLoading, fetchTasks, handleStatusUpdate, setColumns } = useTaskBoard();

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const draggedTask = sourceColumn.tasks[source.index];

    if (!draggedTask) return;

    // Optimistic update
    const newColumns = { ...columns };
    
    // Remove from source
    newColumns[source.droppableId] = {
      ...sourceColumn,
      tasks: sourceColumn.tasks.filter((_, i) => i !== source.index),
    };

    // Add to destination
    newColumns[destination.droppableId] = {
      ...destColumn,
      tasks: [
        ...destColumn.tasks.slice(0, destination.index),
        { ...draggedTask, status: destination.droppableId as "pending" | "in-progress" | "completed" | "on-hold" },
        ...destColumn.tasks.slice(destination.index),
      ],
    };

    setColumns(newColumns);

    try {
      await handleStatusUpdate(draggedTask._id, destination.droppableId);
    } catch (error) {
      console.error('Drag operation failed:', error);
      // Revert UI if the API call fails
      fetchTasks();
    }
  };

  const columnColors = {
    pending: "border-yellow-500",
    "in-progress": "border-blue-500",
    completed: "border-green-500",
  };

  return (
    <div className="flex h-screen">
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
          <div className="flex flex-wrap -mx-2">
            {isLoading ? (
              Object.values(columns).map((column) => (
                <div key={`skeleton-${column.id}`} className="w-full md:w-1/3 p-2">
                  <div className={`bg-card rounded-md shadow-md border-t-4 ${columnColors[column.id]}`}>
                    <div className="p-4 border-b border-border">
                      <h2 className="font-bold text-lg flex items-center">
                        {column.title}
                        <Badge variant="secondary" className="ml-2">0</Badge>
                      </h2>
                    </div>
                    <div className="p-3 min-h-[300px]">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 w-full mb-3 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              Object.values(columns).map((column) => (
                <div key={column.id} className="w-full md:w-1/3 p-2">
                  <div className={`bg-card rounded-md shadow-md border-t-4 ${columnColors[column.id]}`}>
                    <div className="p-4 border-b border-border">
                      <h2 className="font-bold text-lg flex items-center">
                        {column.title}
                        <Badge variant="secondary" className="ml-2">
                          {column.tasks.length}
                        </Badge>
                      </h2>
                    </div>
                    <Droppable 
                      droppableId={column.id}
                      mode="virtual" // Add virtual mode for better performance
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`p-3 min-h-[300px] max-h-[calc(100vh-220px)] overflow-y-auto ${
                            snapshot.isDraggingOver ? "bg-muted/50" : ""
                          }`}
                        >
                          {column.tasks.map((task, index) => (
                            <Draggable 
                              key={task._id} 
                              draggableId={task._id} 
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                  }}
                                >
                                  <TaskCard 
                                    task={task} 
                                    onViewDetails={() => navigate(`/developer/tasks/${task._id}`)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              ))
            )}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;