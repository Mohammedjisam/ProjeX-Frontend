import { Building, CheckCircle, XCircle,Loader2 } from "lucide-react";
import { Button } from "../../ui/button";

interface CompanyHeaderProps {
  companyName: string;
  companyType: string;
  isVerified: boolean;
  onToggleVerification: () => void;
  updating: boolean;
}

export function CompanyHeader({
  companyName,
  companyType,
  isVerified,
  onToggleVerification,
  updating
}: CompanyHeaderProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/50">
              <Building className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{companyName}</h2>
              <p className="text-gray-400">{companyType}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center">
              {isVerified ? (
                <span className="flex items-center text-green-400 bg-green-900/20 px-3 py-1 rounded-full text-sm border border-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </span>
              ) : (
                <span className="flex items-center text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full text-sm border border-yellow-800">
                  <XCircle className="h-4 w-4 mr-1" />
                  Pending Verification
                </span>
              )}
            </div>
            <Button
              onClick={onToggleVerification}
              disabled={updating}
              variant={isVerified ? "warning" : "success"}
              size="sm"
              className="flex items-center gap-1"
            >
              {updating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isVerified ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {updating ? "Processing" : isVerified ? "Revoke" : "Verify"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}