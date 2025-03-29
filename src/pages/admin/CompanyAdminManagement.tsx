import { useState } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import { Search } from "lucide-react";
import { 
  useCompanyAdmins, 
  useToggleCompanyAdminStatus, 
  useDeleteCompanyAdmin 
} from "../../hooks/admin/useCompanyAdmin";
import { UserTable } from "../../components/admin/common/UserTable";
import { PaginationControls } from "../../components/admin/common/PaginationControls";
import { Input } from "../../components/ui/input";
import { useDebounce } from "../../hooks/admin/useDebounce";

const COMPANY_ADMINS_PER_PAGE = 6;

export function CompanyAdminManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const { data, isLoading, error } = useCompanyAdmins();
  const toggleStatusMutation = useToggleCompanyAdminStatus();
  const deleteMutation = useDeleteCompanyAdmin();

  // Filter company admins based on search term
  const filteredCompanyAdmins = data?.data?.filter(admin => 
    admin.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    (admin.phoneNumber && admin.phoneNumber.includes(debouncedSearchTerm))
  ) || [];

  // Pagination
  const totalPages = Math.ceil(filteredCompanyAdmins.length / COMPANY_ADMINS_PER_PAGE);
  const paginatedCompanyAdmins = filteredCompanyAdmins.slice(
    (currentPage - 1) * COMPANY_ADMINS_PER_PAGE,
    currentPage * COMPANY_ADMINS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleStatus = (id: string) => {
    toggleStatusMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this company admin?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Company Admin Management</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search company admins..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        
        <UserTable
          data={paginatedCompanyAdmins}
          loading={isLoading}
          error={error?.message}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
        
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}