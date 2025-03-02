"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Separator } from "../../components/ui/separator"
import { GoogleLogin } from "@react-oauth/google"
import { motion } from "framer-motion"

interface LoginFormInputs {
  email: string
  password: string
  rememberMe?: boolean
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean().optional(),
})

const ManagerLogin: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  })

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setError("")
      setLoading(true)

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/login`,
        {
          email: data.email,
          password: data.password,
          role: "manager",
          rememberMe: data.rememberMe
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("managerData", JSON.stringify(response.data.user))

        // Redirect to manager dashboard
        navigate("/manager/dashboard")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during login"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true)
      setError("")

      // Send the credential token to your backend with the role
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/google/token`, 
        {
          credential: credentialResponse.credential,
          role: "manager",
        }
      )

      // Save token and user data
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("managerData", JSON.stringify(response.data.user))

      // Redirect to manager dashboard
      navigate("/manager/dashboard")
    } catch (err: any) {
      console.error("Google login error:", err)
      setError(err.response?.data?.message || "Google authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your Manager account</CardDescription>
          </CardHeader>

          {error && (
            <div className="px-6 mb-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="email" 
                    type="email" 
                    className="pl-10" 
                    placeholder="you@example.com" 
                    {...register("email")} 
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register("rememberMe")}
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                {(isSubmitting || loading) ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                useOneTap
                logo_alignment="center"
                text="continue_with"
                shape="rectangular"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <span
                className="font-medium text-primary hover:underline cursor-pointer"
                onClick={() => navigate("/manager/signup")}
              >
                Sign up
              </span>
            </p>
            <p className="text-xs text-center text-muted-foreground">
              Need help? <a href="/contact-support" className="text-primary hover:underline">Contact support</a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default ManagerLogin