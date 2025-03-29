import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/admin/Sidebar";
import { useCompanies } from "../../hooks/admin/useCompany";
import { CompanyTable } from "../../components/admin/company/CompanyTable";


const COMPANY_PER_PAGE = 5;

export function CompanyManagement() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useCompanies(
    page, 
    COMPANY_PER_PAGE, 
  );

  const handleViewDetails = (companyId: string) => {
    navigate(`/admin/company/${companyId}`);
  };




  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Companies</h1>
         
        </div>

      

        <CompanyTable
          companies={data?.data || []}
          loading={isLoading}
          error={error?.message || null}
          page={page}
          totalPages={Math.ceil((data?.count || 0) / COMPANY_PER_PAGE)}
          onViewDetails={handleViewDetails}
          itemsPerPage={COMPANY_PER_PAGE}
        />
      </div>
    </div>
  );
}