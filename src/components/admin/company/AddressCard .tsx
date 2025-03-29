import { Company } from "../../../types/admin/company";
import { MapPin, Home, Navigation, Mailbox, Flag } from "lucide-react";

interface AddressCardProps {
  address: Company['address'];
}

export function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-400" />
          Address
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Building No</p>
                <p className="text-white">{address.buildingNo}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Navigation className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Street</p>
                <p className="text-white">{address.street}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">City</p>
                <p className="text-white">{address.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">State</p>
                <p className="text-white">{address.state}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Flag className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Country</p>
                <p className="text-white">{address.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mailbox className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Postal Code</p>
                <p className="text-white">{address.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}