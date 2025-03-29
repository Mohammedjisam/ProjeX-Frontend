import { Company } from "../../../types/admin/company";
import { Building2, Globe, Phone, Briefcase } from "lucide-react";

interface CompanyInfoCardProps {
  company: Pick<Company, 'companyName' | 'companyType' | 'companyDomain' | 'phoneNumber'>;
}

export function CompanyInfoCard({ company }: CompanyInfoCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-400" />
          Company Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Company Name</p>
                <p className="text-white">{company.companyName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Company Type</p>
                <p className="text-white">{company.companyType}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Domain</p>
                <p className="text-white">{company.companyDomain}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Phone Number</p>
                <p className="text-white">{company.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}