import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { AlertCircle, Mail, Lock, User, Phone, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react'
import OTPModal from '../../components/OTPModal'
import { GoogleLogin } from '@react-oauth/google'

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

const DeveloperSignup = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false)
  const [tempEmail, setTempEmail] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [otpError, setOtpError] = useState<string>("")
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setError('')
      
      const response = await axios.post('http://localhost:5000/api/auth/signup/initiate', {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: 'developer' 
      })

      if (response.data.success) {
        setTempEmail(data.email)
        setIsOTPModalOpen(true)
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during signup')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true)
      setError('')
      
      const response = await axios.post('http://localhost:5000/api/auth/google/token', {
        credential: credentialResponse.credential,
        role: 'developer'
      })
  
      localStorage.setItem('token', response.data.token)
      localStorage.setItem("developerData", JSON.stringify(response.data.user))
      
      navigate('/developer/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLoginError = () => {
    setError('Google login failed. Please try again.')
  }

  const handleOTPVerification = async (otp: string) => {
    try {
      setOtpError("")
      const response = await axios.post('http://localhost:5000/api/auth/signup/verify', {
        email: tempEmail,
        otp,
        role: 'developer'
      })
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem("developerData", JSON.stringify(response.data.user))
        navigate('/developer/dashboard')
        return true
      }
    } catch (error: any) {
      if (error.response) {
        setOtpError(error.response.data.message || 'Invalid OTP. Please try again.')
      } else if (error.request) {
        setOtpError('No response from server. Please check your connection.')
      } else {
        setOtpError('Error verifying OTP. Please try again later.')
      }
      return false
    }
    return true
  }

  const handleResendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup/resend', {
        email: tempEmail,
        role: 'developer'
      })
      
      return response.data.success
    } catch (error) {
      setOtpError('Failed to resend OTP. Please try again.')
      return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-slate-900/70 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Developer Sign Up</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Create your account and start building amazing projects
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-900/60 border border-red-700 text-red-100 px-4 py-3 rounded-md flex items-center text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 text-sm">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-slate-300 text-sm">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    {...register("phoneNumber")}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="1234567890"
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300 text-sm">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative my-4">
              <Separator className="bg-slate-700" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-xs text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="flex justify-center">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                  logo_alignment="center"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t border-slate-800 pt-4">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <span
                className="font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors"
                onClick={() => navigate("/developer")}
              >
                Sign in
              </span>
            </p>
          </CardFooter>
        </Card>
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

export default DeveloperSignup
