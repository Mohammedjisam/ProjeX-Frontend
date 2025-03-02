"use client"

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
import { AlertCircle, Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"

interface LoginFormInputs {
  email: string
  password: string
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

const DeveloperLogin = () => {
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
          role: "developer",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("developerData", JSON.stringify(response.data.user))
        navigate("/developer/dashboard")
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

      const response = await axios.post("http://localhost:5000/api/auth/google/token", {
        credential: credentialResponse.credential,
        role: "developer",
      })

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("developerData", JSON.stringify(response.data.user))
      navigate("/developer/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Google authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-slate-900/70 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <LogIn className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-slate-400">Sign in to your developer account</CardDescription>
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-slate-300 text-sm">
                    Password
                  </Label>
                  <a
                    href="/forgot-password"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <LogIn className="ml-2 h-4 w-4" />
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
              Don't have an account?{" "}
              <span
                className="font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors"
                onClick={() => navigate("/developer/signup")}
              >
                Sign up
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default DeveloperLogin

