import { useState } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import { Search } from "lucide-react";
import { 
  useManagers, 
  useToggleManagerStatus, 
  useDeleteManager 
} from "../../hooks/admin/useManager";
import { UserTable } from "../../components/admin/common/UserTable";
import { PaginationControls } from "../../components/admin/common/PaginationControls";
import { Input } from "../../components/ui/input";
import { useDebounce } from "../../hooks/admin/useDebounce";

const MANAGERS_PER_PAGE = 6;

export function ManagerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const { data, isLoading, error } = useManagers();
  const toggleStatusMutation = useToggleManagerStatus();
  const deleteMutation = useDeleteManager();

  // Filter managers based on search term
  const filteredManagers = data?.data?.filter(manager => 
    manager.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    (manager.phoneNumber && manager.phoneNumber.includes(debouncedSearchTerm))
  ) || [];

  // Pagination
  const totalPages = Math.ceil(filteredManagers.length / MANAGERS_PER_PAGE);
  const paginatedManagers = filteredManagers.slice(
    (currentPage - 1) * MANAGERS_PER_PAGE,
    currentPage * MANAGERS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleStatus = (id: string) => {
    toggleStatusMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Manager Management</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search managers..."
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
          data={paginatedManagers}
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