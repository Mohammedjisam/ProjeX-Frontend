import { CreditCard, Calendar, Layers, Users, PhoneCall ,AlertCircle} from "lucide-react";

interface SubscriptionCardProps {
  payment: {
    planId: string;
    subscriptionStatus: string;
    currentPeriodEnd: string;
    maxBranches: number;
    maxUsers: number;
    maxMeetingParticipants: number;
  } | null;
}

export function SubscriptionCard({ payment }: SubscriptionCardProps) {
  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'basic': return 'Basic';
      case 'pro': return 'Pro';
      case 'business': return 'Business';
      default: return planId ? planId.charAt(0).toUpperCase() + planId.slice(1) : 'No Plan';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-900/50 text-green-400 border-green-800';
      case 'trialing': return 'bg-blue-900/50 text-blue-400 border-blue-800';
      case 'past_due': return 'bg-yellow-900/50 text-yellow-400 border-yellow-800';
      case 'canceled':
      case 'incomplete': return 'bg-red-900/50 text-red-400 border-red-800';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-400" />
          Subscription & Plan
        </h3>
        {payment ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Plan</p>
                  <p className="text-white">{getPlanName(payment.planId)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`px-2 py-1 text-sm rounded-md border ${getStatusBadgeStyle(payment.subscriptionStatus)}`}>
                    {payment.subscriptionStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Current Period End</p>
                  <p className="text-white">{formatDate(payment.currentPeriodEnd)}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Plan Limits
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 p-3 rounded-md flex items-center gap-3">
                  <Home className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-xs">Branches</p>
                    <p className="text-white text-lg font-semibold">{payment.maxBranches}</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-md flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-xs">Users</p>
                    <p className="text-white text-lg font-semibold">{payment.maxUsers}</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-md flex items-center gap-3">
                  <PhoneCall className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-xs">Meeting Size</p>
                    <p className="text-white text-lg font-semibold">{payment.maxMeetingParticipants}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-yellow-900/30 border border-yellow-800 text-yellow-300 p-4 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <p>No subscription plan is active. The company needs to set up a payment plan.</p>
          </div>
        )}
      </div>
    </div>
  );
}