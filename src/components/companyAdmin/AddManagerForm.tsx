"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { UserPlus, Mail, Phone, Save, X } from "lucide-react"
import axios from "axios"
import axiosInstance from "../../utils/AxiosConfig"

interface FormData {
  name: string
  email: string
  phoneNumber: string
}

interface AddManagerFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const AddManagerForm: React.FC<AddManagerFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Manager name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[^\d]/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error message when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Create manager without password - password setup email will be sent
      // Fix the API endpoint to match the backend route
      const response = await axiosInstance.post("/api/companyadmin/addnewmanager", formData)

      if (response.data.success) {
        toast.success("Manager added successfully. Password setup email sent.")

        // Reset form
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
        })

        // Call success callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast.error(response.data.message || "Failed to add manager")
      }
    } catch (err) {
      let errorMessage = "Failed to add manager"

      if (axios.isAxiosError(err)) {
        // Add more detailed error logging
        console.error("Axios error details:", {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers,
          config: err.config,
        })
        errorMessage = err.response?.data?.message || errorMessage
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      toast.error(errorMessage)
      console.error("Error adding manager:", err)
    } finally {
      setLoading(false)
    }
  }

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
          <button onClick={onCancel} className="text-white hover:text-gray-200 transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-200">
            Manager Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserPlus className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`bg-[#272D3D] text-white pl-10 pr-3 py-3 block w-full rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="Enter manager name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email Address
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-[#272D3D] text-white pl-10 pr-3 py-3 block w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="Enter email address"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200">
            Phone Number
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`bg-[#272D3D] text-white pl-10 pr-3 py-3 block w-full rounded-md border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="Enter phone number"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

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
  )
}

export default AddManagerForm

