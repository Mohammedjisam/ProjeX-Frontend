import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDeveloperTasks, updateTaskStatus } from "../../services/developer/task.services";
import { ReduxState, ColumnsState, Column } from "../../types/developer/task";

const initialColumns: ColumnsState = {
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
};

export const useTaskBoard = () => {
  const developerData = useSelector((state: ReduxState) => state.developer.developerData);
  const [columns, setColumns] = useState<ColumnsState>(initialColumns);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    if (!developerData?.id) return;
    
    setIsLoading(true);
    try {
      const response = await fetchDeveloperTasks(developerData.id);
      const allTasks = response.data;

      setColumns({
        pending: {
          ...initialColumns.pending,
          tasks: allTasks.filter((task) => task.status === "pending"),
        },
        "in-progress": {
          ...initialColumns["in-progress"],
          tasks: allTasks.filter((task) => task.status === "in-progress"),
        },
        completed: {
          ...initialColumns.completed,
          tasks: allTasks.filter((task) => task.status === "completed"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: string) => {
    try {
      const response = await updateTaskStatus(taskId, newStatus);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      console.error('Status update failed:', error);
      // Revert the UI if the update fails
      fetchTasks();
      throw error; // Re-throw to handle in component if needed
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [developerData]);

  return { 
    columns, 
    isLoading, 
    fetchTasks, 
    handleStatusUpdate,
    setColumns // Make sure to expose setColumns
  };
};