import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../services/admin/company.services";
import { FilterOptions } from "../../types/admin/company";

export const useCompanies = (
  page: number,
  limit: number,
  filters: FilterOptions
) => {
  return useQuery({
    queryKey: ["companies", page, filters],
    queryFn: () => fetchCompanies(page, limit, filters),
    keepPreviousData: true,
  });
};