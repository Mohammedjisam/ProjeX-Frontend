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

interface LoginFormInputs {
  email: string
  password: string
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

const ProjectManagerLogin: React.FC = () => {
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
  })

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setError("")

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: data.email,
          password: data.password,
          role: "projectManager", // Add role parameter
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
        localStorage.setItem("projectManagerData", JSON.stringify(response.data.user))

        // Redirect to developer dashboard
        navigate("/projectmanager/dashboard")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during login"
      setError(errorMessage)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true)
      setError("")

      console.log("Google login response:", credentialResponse)

      // Send the credential token to your backend with the role
      const response = await axios.post("http://localhost:5000/api/auth/google/token", {
        credential: credentialResponse.credential,
        role: "projectManager", // Hardcode the role to match the component purpose
      })

      console.log("Google authentication successful:", response.data)

      // Save token and user data
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("projectManagerData", JSON.stringify(response.data.user))

      // Redirect to appropriate dashboard
      navigate("/projectmanager/dashboard")
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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Sign in to your Project Manager account</CardDescription>
        </CardHeader>

        {error && (
          <div className="px-6">
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
                <Input id="email" type="email" className="pl-10" placeholder="you@example.com" {...register("email")} />
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
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

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={() => navigate("/projectmanager/signup")}
            >
              Sign up
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProjectManagerLogin

