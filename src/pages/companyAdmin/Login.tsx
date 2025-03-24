// src/pages/companyadmin/CompanyAdminLogin.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ILoginData } from "../../types/User";
import { 
  useCompanyAdminLoginMutation, 
  useCompanyAdminGoogleLoginMutation 
} from "../../hooks/useLogin";
import SignIn from "../../components/auth/CompanyAdminSignIn";

const CompanyAdminLogin = () => {
  const navigate = useNavigate();
  
  const { 
    mutate: loginCompanyAdmin, 
    isPending: isLoginPending, 
    error: loginError 
  } = useCompanyAdminLoginMutation();
  
  const { 
    mutate: googleLoginCompanyAdmin, 
    isPending: isGoogleLoginPending 
  } = useCompanyAdminGoogleLoginMutation();

  const handleLoginSubmit = (data: ILoginData) => {
    loginCompanyAdmin(data, {
      onSuccess: (response) => {
        if (response?.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("companyAdminData", JSON.stringify(response.user));
          
          toast.success("Login successful!", {
            style: { 
              backgroundColor: "#34D399", 
              color: "white" 
            },
            duration: 1500,
            onAutoClose: () => {
              navigate("/companyadmin/dashboard", { replace: true });
            }
          });
        } else {
          toast.error(response?.message || "Login failed");
        }
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "Login failed";
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
    if (!credentialResponse?.credential) {
      toast.error("Google authentication failed");
      return;
    }

    googleLoginCompanyAdmin(credentialResponse.credential, {
      onSuccess: (response) => {
        if (response?.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("companyAdminData", JSON.stringify(response.user));
          
          toast.success("Google login successful!", {
            style: { 
              backgroundColor: "#34D399", 
              color: "white" 
            },
            duration: 1500,
            onAutoClose: () => {
              navigate("/companyadmin/dashboard", { replace: true });
            }
          });
        } else {
          toast.error(response?.message || "Google login failed");
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

  const errorMessage = (loginError as any)?.response?.data?.message || "";

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
          userType="Company Admin"
          onSubmit={handleLoginSubmit}
          isLoading={isLoginPending || isGoogleLoginPending}
          error={errorMessage}
          onGoogleSuccess={handleGoogleLoginSuccess}
          onGoogleError={handleGoogleLoginError}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CompanyAdminLogin;