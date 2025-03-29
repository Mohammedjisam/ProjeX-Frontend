import { useState, useEffect } from "react";
import { fetchTaskDetails } from "../../services/developer/task.services";
import { TaskDetails } from "../../types/developer/task";

export const useTaskDetails = (taskId?: string) => {
  const [task, setTask] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTaskDetails = async () => {
      if (!taskId) {
        setError("No task ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetchTaskDetails(taskId);
        if (response.success) {
          setTask(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch task details");
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    getTaskDetails();
  }, [taskId]);

  return { task, loading, error };
};