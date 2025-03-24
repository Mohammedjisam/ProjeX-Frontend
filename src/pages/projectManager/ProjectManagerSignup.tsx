// src/pages/projectmanager/ProjectManagerSignup.tsx
"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { 
  useInitiateProjectManagerSignup,
  useVerifyProjectManagerSignup,
  useResendProjectManagerOTP,
  useProjectManagerGoogleSignup
} from "../../hooks/useLogin";
import SignUpForm from "../../components/auth/ProjectManagerSignUpForm";
import OTPModal from "../../components/shared/OTPModal";

const ProjectManagerSignup = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const navigate = useNavigate();
  
  const { mutate: initiateSignup, error: signupError, isPending: isSigningUp } = useInitiateProjectManagerSignup();
  const { mutate: verifySignup, error: verifyError } = useVerifyProjectManagerSignup();
  const { mutate: resendOTP } = useResendProjectManagerOTP();
  const { mutate: googleSignup, isPending: isGoogleSigningUp } = useProjectManagerGoogleSignup();

  const handleSignupSubmit = (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    initiateSignup(data, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Verification code sent to your email!", {
            style: { backgroundColor: "#34D399", color: "white" },
          });
          setTempEmail(data.email);
          setIsOTPModalOpen(true);
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "An error occurred during signup";
        toast.error(errorMessage, {
          style: { backgroundColor: "#EF4444", color: "white" },
        });
      }
    });
  };

  const handleGoogleSignup = (credentialResponse: any) => {
    googleSignup(credentialResponse.credential, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Google authentication successful!", {
            style: { backgroundColor: "#34D399", color: "white" },
          });
          localStorage.setItem("token", response.token);
          localStorage.setItem("projectManagerData", JSON.stringify(response.user));
          navigate("/projectmanager/dashboard");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "Google authentication failed";
        toast.error(errorMessage, {
          style: { backgroundColor: "#EF4444", color: "white" },
        });
      }
    });
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed. Please try again.", {
      style: { backgroundColor: "#EF4444", color: "white" },
    });
  };

  const handleOTPVerification = async (otp: string) => {
    return new Promise<boolean>((resolve) => {
      verifySignup({ email: tempEmail, otp }, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Account verified successfully!", {
              style: { backgroundColor: "#34D399", color: "white" },
            });
            localStorage.setItem("token", response.token);
            localStorage.setItem("projectManagerData", JSON.stringify(response.user));
            navigate("/projectmanager/dashboard");
            resolve(true);
          }
        },
        onError: (error: any) => {
          let errorMessage = "";
          if (error.response) {
            errorMessage = error.response.data.message || "Invalid OTP. Please try again.";
          } else if (error.request) {
            errorMessage = "No response from server. Please check your connection.";
          } else {
            errorMessage = "Error verifying OTP. Please try again later.";
          }
          toast.error(errorMessage, {
            style: { backgroundColor: "#EF4444", color: "white" },
          });
          resolve(false);
        }
      });
    });
  };

  const handleResendOTP = async () => {
    return new Promise<boolean>((resolve) => {
      resendOTP(tempEmail, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("OTP resent successfully!", {
              style: { backgroundColor: "#34D399", color: "white" },
            });
            resolve(true);
          }
        },
        onError: () => {
          toast.error("Failed to resend OTP. Please try again.", {
            style: { backgroundColor: "#EF4444", color: "white" },
          });
          resolve(false);
        }
      });
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="signup"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <SignUpForm
          onSubmit={handleSignupSubmit}
          isLoading={isSigningUp || isGoogleSigningUp}
          error={(signupError as any)?.response?.data?.message || ""}
          onGoogleSuccess={handleGoogleSignup}
          onGoogleError={handleGoogleError}
        />
        
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          onVerify={handleOTPVerification}
          onResend={handleResendOTP}
          error={(verifyError as any)?.response?.data?.message || ""}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectManagerSignup;