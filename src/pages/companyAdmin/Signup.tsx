import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AlertCircle, Mail, Lock, User, Phone } from "lucide-react"
import OTPModal from '../../components/OTPModal';

interface SignupFormInputs {
  name: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})

const CompanyAdminSignup: React.FC = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  const [otpError, setOtpError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setError('');
      
      const response = await axios.post('http://localhost:5000/api/auth/signup/initiate', {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: 'companyAdmin' // Set role as companyadmin
      });

      if (response.data.success) {
        setTempEmail(data.email);
        setIsOTPModalOpen(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      setError(errorMessage);
    }
    
  };

  const handleOTPVerification = async (otp: string) => {
    try {
      setOtpError(""); // Clear previous OTP errors
      const response = await axios.post('http://localhost:5000/api/auth/signup/verify', {
        email: tempEmail,
        otp,
        role: 'companyAdmin' // Make sure role is passed in verification
      });
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/companyadmin/dashboard');
        return true;
      }
    } catch (error) {
      if (error.response) {
        setOtpError(error.response.data.message || 'Invalid OTP. Please try again.');
      } else if (error.request) {
        setOtpError('No response from server. Please check your connection.');
      } else {
        setOtpError('Error verifying OTP. Please try again later.');
      }
      return false;
    }
    return true;
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup/resend', {
        email: tempEmail,
        role: 'companyAdmin'
      });
      
      return response.data.success;
    } catch (error) {
      setOtpError('Failed to resend OTP. Please try again.');
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account 🚀</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/companyadmin/login" className="font-medium text-blue-500 hover:text-blue-400">
              Sign in
            </a>
          </p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email address
              </Label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-gray-300">
                Phone Number
              </Label>
              <div className="mt-1 relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1234567890"
                />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              disabled={isSubmitting || isOTPModalOpen}
              className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-gray-800"
            >
              {isSubmitting ? "Creating account... ⏳" : "Sign up 🎉"}
            </Button>
          </div>
        </form>
      </div>
      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onVerify={handleOTPVerification}
        onResend={handleResendOTP}
        error={otpError}
      />
    </div>
  )
}

export default CompanyAdminSignup