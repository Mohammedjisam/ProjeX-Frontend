import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ILoginData } from "../../types/User";

interface SignInProps {
  userType: "admin";
  onSubmit: (data: ILoginData) => void;
  isLoading: boolean;
  error?: string;
}

const signInSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn: React.FC<SignInProps> = ({ userType, onSubmit, isLoading, error }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(signInSchema),
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome back! 
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your {userType} account
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
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
              </div>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  placeholder="enter your password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="pl-10 pr-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-400 focus:outline-none focus:ring-0 bg-transparent"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-gray-800"
            >
              {isLoading ? "Signing in... ⏳" : "Sign in 🔐"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;