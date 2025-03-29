import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../../services/developer/dashboard.services";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "../../redux/Store";

export const useDashboard = () => {
  const developerData = useSelector((state: RootState) => state.developer.developerData);
  
  return useQuery({
    queryKey: ['dashboard', developerData?._id || developerData?.id],
    queryFn: async () => {
      if (!developerData || (!developerData._id && !developerData.id)) {
        throw new Error('User not authenticated');
      }
      
      const userId = developerData._id || developerData.id;
      return await fetchDashboardData(userId as string);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};