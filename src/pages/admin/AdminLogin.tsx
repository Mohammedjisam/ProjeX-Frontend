import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SignIn from "../../components/auth/AdminSignIn";
import { useAdminLoginMutation } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ILoginData } from "../../types/common/User";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { mutate: loginAdmin, isPending, error } = useAdminLoginMutation();
  
  const handleLoginSubmit = (data: ILoginData) => {
    loginAdmin(
      { 
        email: data.email, 
        password: data.password
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("adminData", JSON.stringify(response.user));
            
            toast.success("Login successful! Redirecting to dashboard...", {
              style: { 
                backgroundColor: "#10B981", 
                color: "white" 
              }
            });
            
            navigate("/admin/dashboard");
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
      }
    );
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
          userType="admin"
          onSubmit={handleLoginSubmit}
          isLoading={isPending}
          error={errorMessage}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminLogin;