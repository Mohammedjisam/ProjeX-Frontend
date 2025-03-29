import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/admin/Sidebar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useCompanyDetails } from "../../hooks/admin/useCompanyDetails";
import { CompanyHeader } from "../../components/admin/company/CompanyHeader";
import { CompanyInfoCard } from "../../components/admin/company/CompanyInfoCard";
import { AddressCard } from "../../components/admin/company/AddressCard ";
import { AdminCard } from "../../components/admin/company/AdminCard";
import { StatusAlert } from "../../components/admin/company/StatusAlert";

export default function ViewCompany() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    company,
    adminUser,
    loading,
    error,
    updating,
    updateSuccess,
    loadingAdmin,
    toggleVerification,
    refresh
  } = useCompanyDetails(id || '');

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/companies')}
            className="flex items-center text-gray-400 hover:text-white mr-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white">Company Details</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <StatusAlert 
            type="error" 
            message={error} 
            onRetry={refresh} 
          />
        ) : company ? (
          <div className="space-y-6">
            {updateSuccess && (
              <StatusAlert type="success" message={updateSuccess} />
            )}

            <CompanyHeader
              companyName={company.companyName}
              companyType={company.companyType}
              isVerified={company.adminVerification}
              onToggleVerification={toggleVerification}
              updating={updating}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CompanyInfoCard company={company} />
              <AddressCard address={company.address} />
              <AdminCard 
                admin={company.companyAdmin || adminUser} 
                loading={loadingAdmin} 
                hasPaymentAdmin={!!company.payment?.companyAdmin} 
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
            <p>Company not found</p>
          </div>
        )}
      </div>
    </div>
  );
}