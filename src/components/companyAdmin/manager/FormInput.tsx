// src/pages/companyadmin/managers/add/components/FormInput.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  icon: LucideIcon;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  error,
  placeholder = '',
  type = 'text'
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`bg-[#272D3D] text-white pl-10 pr-3 py-3 block w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;