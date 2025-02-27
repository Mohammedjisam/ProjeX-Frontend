"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { Input } from "../components/ui/input"

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
  error?: string;
}

const OTPModal: React.FC<OTPModalProps> = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  onResend,
  error: propError 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Display either prop error or local error
  const displayError = propError || localError;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown, canResend]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input after entering a digit
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const completeOtp = otp.join("");
    if (completeOtp.length !== 6) {
      setLocalError("Please enter a valid 6-digit code");
      return;
    }

    try {
      setIsVerifying(true);
      setLocalError("");
      const success = await onVerify(completeOtp);
      
      if (success) {
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (err) {
      setLocalError("Invalid verification code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!onResend) return;
    
    try {
      setIsLoading(true);
      await onResend();
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setLocalError("");
    } catch (err) {
      setLocalError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Verify OTP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-300">
            We've sent a verification code to your email. Please enter it below to complete your registration.
          </p>
          
          {displayError && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {displayError}
            </div>
          )}
          
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center bg-gray-700 border-gray-600 text-white focus:border-blue-500"
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              disabled={!canResend || isLoading || !onResend}
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : canResend ? (
                "Resend code"
              ) : (
                `Resend code in ${countdown}s`
              )}
            </Button>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleVerify} 
                disabled={otp.join("").length !== 6 || isVerifying}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;