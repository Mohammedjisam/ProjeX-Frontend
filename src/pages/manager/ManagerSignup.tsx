"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  AlertCircle,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Separator } from "../../components/ui/separator";
import OTPModal from "../../components/OTPModal";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../utils/AxiosConfig";
import { toast } from "sonner";

interface SignupFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const ManagerSignup: React.FC = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setError("");

      const response = await axiosInstance.post(
        "/auth/signup/initiate",
        {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          role: "manager",
        }
      );

      if (response.data.success) {
        toast.success("Verification code sent to your email!", {
          style: { backgroundColor: "#34D399", color: "white" },
        });
        setTempEmail(data.email);
        setIsOTPModalOpen(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      setError(errorMessage);
      
      toast.error(errorMessage, {
        style: { backgroundColor: "#EF4444", color: "white" },
      });
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError("");

      console.log("Google login response:", credentialResponse);

      const response = await axiosInstance.post(
        "/auth/google/token",
        {
          credential: credentialResponse.credential,
          role: "manager", 
        }
      );

      console.log("Google authentication successful:", response.data);

      toast.success("Google authentication successful!", {
        style: { backgroundColor: "#34D399", color: "white" },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("managerData", JSON.stringify(response.data.user));

      navigate("/manager/dashboard");
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.response?.data?.message || "Google authentication failed");
      toast.error(err.response?.data?.message, {
        style: { backgroundColor: "#EF4444", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    const errorMessage = "Google login failed. Please try again.";
    setError(errorMessage);
    toast.error(errorMessage, {
      style: { backgroundColor: "#EF4444", color: "white" },
    });
  };

  const handleOTPVerification = async (otp: string) => {
    try {
      setOtpError(""); 
      const response = await axiosInstance.post(
        "/auth/signup/verify",
        {
          email: tempEmail,
          otp,
          role: "manager",
        }
      );

      if (response.data.success) {
        toast.success("Account verified successfully!", {
          style: { backgroundColor: "#34D399", color: "white" },
        });
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("managerData", JSON.stringify(response.data.user))
        navigate("/manager/dashboard"); 
        return true;
      }
    }catch (error: any) {
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message || "Invalid OTP. Please try again.";
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = "Error verifying OTP. Please try again later.";
      }
      
      setOtpError(errorMessage);
      
      toast.error(errorMessage, {
        style: { backgroundColor: "#EF4444", color: "white" },
      });
      
      return false;
    }
    return true;
  };

  const handleResendOTP = async () => {
    try {
      const response = await axiosInstance.post("/auth/signup/resend",
        {
          email: tempEmail,
          role: "manager",
        }
      );

      if (response.data.success) {
        toast.success("OTP resent successfully!", {
          style: { backgroundColor: "#34D399", color: "white" },
        });
      }
      
      return response.data.success;
    } catch (error: any) {
      const errorMessage = "Failed to resend OTP. Please try again.";
      setOtpError(errorMessage);
      
      toast.error(errorMessage, {
        style: { backgroundColor: "#EF4444", color: "white" },
      });
      
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-9000 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create Manager Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
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
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="name"
                  type="text"
                  className="pl-10"
                  placeholder="John Doe"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

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
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  className="pl-10"
                  placeholder="1234567890"
                  {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Corrected line
                  placeholder="Enter your password"
                  className="pl-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"} // Corrected line
                  placeholder="Enter your password"
                  className="pl-10"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
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
            Already have an account?{" "}
            <span
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={() => navigate("/manager")}
            >
              Sign in
            </span>
          </p>
        </CardFooter>
      </Card>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onVerify={handleOTPVerification}
        onResend={handleResendOTP}
        error={otpError}
      />
    </div>
  );
};

export default ManagerSignup;
