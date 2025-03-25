// src/pages/companyadmin/managers/add/components/AddManagerForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { UserPlus, Mail, Phone, Save, X } from 'lucide-react';
import { useAddManager } from '../../../hooks/companyAdmin/useAddManager';
import FormInput from './FormInput';
import { ManagerFormData } from '../../../types/Manager';

interface AddManagerFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddManagerForm: React.FC<AddManagerFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<ManagerFormData>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submitManager, loading } = useAddManager();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Manager name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[^\d]/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { success } = await submitManager(formData);
    
    if (success) {
      toast.success("Manager added successfully. Password setup email sent.");
      setFormData({ name: "", email: "", phoneNumber: "" });
      onSuccess?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-md mx-auto bg-[#1A1F2C] rounded-xl shadow-lg overflow-hidden"
    >
      <div className="flex items-center justify-between bg-indigo-600 px-6 py-4">
        <div className="flex items-center">
          <UserPlus className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">Add New Manager</h2>
        </div>
        {onCancel && (
          <button 
            onClick={onCancel} 
            className="text-white hover:text-gray-200 transition-colors" 
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
        <FormInput
          label="Manager Name"
          name="name"
          icon={UserPlus}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter manager name"
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter email address"
        />

        <FormInput
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          icon={Phone}
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="Enter phone number"
        />

        <div className="pt-2 text-sm text-gray-400">
          <p>An email will be sent to the manager with instructions to set up their password.</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium rounded-md shadow-sm transition-colors duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Add Manager
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddManagerForm;