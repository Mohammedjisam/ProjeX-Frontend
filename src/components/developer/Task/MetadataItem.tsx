import { ReactNode } from "react";

interface MetadataItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  isError?: boolean;
}

const MetadataItem = ({ icon, label, value, isError = false }: MetadataItemProps) => (
  <div className="flex items-start space-x-3">
    <div className="h-5 w-5 mt-0.5">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`${isError ? 'text-red-400' : 'text-white'}`}>{value}</p>
    </div>
  </div>
);

export default MetadataItem;