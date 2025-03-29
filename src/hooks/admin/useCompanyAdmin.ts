import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchCompanyAdmins,
  toggleCompanyAdminStatus,
  deleteCompanyAdmin,
} from "../../services/admin/companyAdmin.services";

export const useCompanyAdmins = () => {
  return useQuery({
    queryKey: ["companyAdmins"],
    queryFn: fetchCompanyAdmins,
    onError: (error) => {
      toast.error("Failed to load company admins");
      console.error(error);
    },
  });
};

export const useToggleCompanyAdminStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleCompanyAdminStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyAdmins"] });
      toast.success("Company admin status updated");
    },
    onError: (error) => {
      toast.error("Failed to update status");
      console.error(error);
    },
  });
};

export const useDeleteCompanyAdmin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCompanyAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyAdmins"] });
      toast.success("Company admin deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete company admin");
      console.error(error);
    },
  });
};