// src/components/auth/PasswordInput.tsx
import { ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggleVisibility: () => void;
  error?: string;
  note?: string;
  icon: ReactNode;
}

const PasswordInput = ({
  label,
  id,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  error,
  note,
  icon
}: PasswordInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#272D3D] pl-10 pr-12 py-3 block w-full rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={onToggleVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
    {note && (
      <p className="mt-1 text-xs text-gray-400">{note}</p>
    )}
  </div>
);

export default PasswordInput;