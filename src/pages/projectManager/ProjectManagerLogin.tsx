// src/pages/projectmanager/ProjectManagerLogin.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ILoginData } from "../../types/User";
import { 
  useProjectManagerLoginMutation,
  useProjectManagerGoogleLoginMutation 
} from "../../hooks/useLogin";
import SignIn from "../../components/auth/ProjectManagerSignIn";

const ProjectManagerLogin = () => {
  const navigate = useNavigate();
  const { mutate: loginProjectManager, isPending, error } = useProjectManagerLoginMutation();
  const { mutate: googleLoginProjectManager, isPending: isGoogleLoginPending } = useProjectManagerGoogleLoginMutation();

  const handleLoginSubmit = (data: ILoginData) => {
    loginProjectManager(data, {
      onSuccess: (response) => {
        if (response.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("projectManagerData", JSON.stringify(response.user));
          
          toast.success("Login successful!", {
            style: { 
              backgroundColor: "#34D399", 
              color: "white" 
            }
          });
          
          navigate("/projectmanager/dashboard");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "An error occurred during login";
        toast.error(errorMessage, {
          style: { 
            backgroundColor: "#EF4444", 
            color: "white" 
          }
        });
      }
    });
  };

  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    googleLoginProjectManager(credentialResponse.credential, {
      onSuccess: (response) => {
        if (response.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("projectManagerData", JSON.stringify(response.user));
          
          toast.success("Google authentication successful!", {
            style: { 
              backgroundColor: "#34D399", 
              color: "white" 
            }
          });
          
          navigate("/projectmanager/dashboard");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "Google authentication failed";
        toast.error(errorMessage, {
          style: { 
            backgroundColor: "#EF4444", 
            color: "white" 
          }
        });
      }
    });
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.", {
      style: { 
        backgroundColor: "#EF4444", 
        color: "white" 
      }
    });
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
          userType="projectManager"
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

export default ProjectManagerLogin;