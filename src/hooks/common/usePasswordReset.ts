import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  validatePasswordToken,
  resetPassword 
} from "../../services/auth/password.services";

export const usePasswordReset = (token: string) => {
  const navigate = useNavigate();
  
  const validateToken = useMutation({
    mutationFn: () => validatePasswordToken(token),
    onError: () => {
      toast.error('Password reset link is invalid or has expired');
      navigate('/manager/login');
    }
  });

  const reset = useMutation({
    mutationFn: (password: string) => resetPassword(token, { password }),
    onSuccess: () => {
      toast.success('Password set successfully!');
      setTimeout(() => navigate('/manager/login'), 1500);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to set password');
    }
  });

  return {
    validateToken,
    reset,
    isLoading: validateToken.isLoading || reset.isLoading,
    isTokenValid: validateToken.data?.success
  };
};