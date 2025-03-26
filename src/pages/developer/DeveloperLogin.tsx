// src/pages/developer/DeveloperLogin.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ILoginData } from "../../types/common/User";
import { 
  useDeveloperLoginMutation,
  useDeveloperGoogleLoginMutation 
} from "../../hooks/useLogin";
import SignIn from "../../components/auth/DeveloperSignIn";

const DeveloperLogin = () => {
  const navigate = useNavigate();
  const { mutate: loginDeveloper, isPending, error } = useDeveloperLoginMutation();
  const { mutate: googleLoginDeveloper, isPending: isGoogleLoginPending } = useDeveloperGoogleLoginMutation();

  const handleLoginSubmit = (data: ILoginData) => {
    loginDeveloper(data, {
      onSuccess: (response) => {
        if (response.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("developerData", JSON.stringify(response.user));
          
          toast.success("Login successful! Redirecting to dashboard...");
          navigate("/developer/dashboard");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "An error occurred during login";
        toast.error(errorMessage);
      }
    });
  };

  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    googleLoginDeveloper(credentialResponse.credential, {
      onSuccess: (response) => {
        if (response.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("developerData", JSON.stringify(response.user));
          
          toast.success("Google login successful! Redirecting to dashboard...");
          navigate("/developer/dashboard");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "Google authentication failed";
        toast.error(errorMessage);
      }
    });
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  const errorMessage = (error as any)?.response?.data?.message || "";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="login"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <SignIn
          userType="developer"
          onSubmit={handleLoginSubmit}
          isLoading={isPending || isGoogleLoginPending}
          error={errorMessage}
          onGoogleSuccess={handleGoogleLoginSuccess}
          onGoogleError={handleGoogleLoginError}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default DeveloperLogin;