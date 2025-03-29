import { User, Mail, AlertCircle } from "lucide-react";

interface AdminCardProps {
  admin: {
    name: string;
    email: string;
  } | null;
  loading: boolean;
  hasPaymentAdmin: boolean;
}

export function AdminCard({ admin, loading, hasPaymentAdmin }: AdminCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          Company Admin
        </h3>
        <div className="space-y-4">
          {admin ? (
            <>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white">{admin.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{admin.email}</p>
                </div>
              </div>
            </>
          ) : loading ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            </div>
          ) : hasPaymentAdmin ? (
            <div className="flex items-center gap-2 bg-blue-900/30 border border-blue-800 text-blue-300 p-4 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <p>Admin details could not be loaded. Please refresh to try again.</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-yellow-900/30 border border-yellow-800 text-yellow-300 p-4 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <p>No admin assigned to this company.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}