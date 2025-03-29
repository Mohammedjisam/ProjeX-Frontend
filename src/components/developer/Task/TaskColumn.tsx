import { Column } from "../../../types/developer/task";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";import { Badge } from "../../ui/badge";
import { TaskCard } from "./TaskCard";
import { memo } from "react";

interface TaskColumnProps {
  column: Column;
  onTaskClick: (taskId: string) => void;
}

const TaskColumn = memo(({ 
    column, 
    onTaskClick 
  }: TaskColumnProps) => {
    const columnColors = {
      pending: "border-yellow-500",
      "in-progress": "border-blue-500",
      completed: "border-green-500",
    };
  
    return (
      <div className="w-full md:w-1/3 p-2">
        <div className={`bg-card rounded-md shadow-md border-t-4 ${columnColors[column.id]}`}>
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
                {column.tasks.map((task, index) => (
                  <TaskCard 
                    key={task._id} 
                    task={task} 
                    onClick={onTaskClick}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  });
  
  export { TaskColumn };