import { Company } from "../../../types/admin/company";

interface CompanyTableProps {
  companies: Company[];
  loading: boolean;
  error: string | null;
  onViewDetails: (companyId: string) => void;
}

export function CompanyTable({
  companies,
  loading,
  error,
  onViewDetails,
}: CompanyTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
        <p className="font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">NO</th>
              <th className="py-3 px-4 text-left">Company Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Domain</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Verification</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {companies.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-500 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="mt-2">No companies found</p>
                  </div>
                </td>
              </tr>
            ) : (
              companies.map((company, index) => (
                <tr
                  key={company._id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 font-medium">{company.companyName}</td>
                  <td className="py-4 px-4">{company.companyType}</td>
                  <td className="py-4 px-4">{company.companyDomain}</td>
                  <td className="py-4 px-4">{company.phoneNumber}</td>
                  <td className="py-4 px-4">
                    {company.address.city}, {company.address.country}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        company.adminVerification
                          ? "bg-green-500/20 text-green-400 border border-green-500"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                      }`}
                    >
                      {company.adminVerification ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => onViewDetails(company._id)}
                      className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}