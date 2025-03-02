"use client"

import type * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Input } from "../components/ui/input"

interface OTPModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => Promise<boolean>
  onResend?: () => Promise<void>
  error?: string
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, onVerify, onResend, error: propError }) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [localError, setLocalError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const displayError = propError || localError

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [countdown, canResend])

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [isOpen])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerify = async () => {
    const completeOtp = otp.join("")
    if (completeOtp.length !== 6) {
      setLocalError("Please enter a valid 6-digit code")
      return
    }

    try {
      setIsVerifying(true)
      setLocalError("")
      const success = await onVerify(completeOtp)

      if (success) {
        setIsVerified(true)
        setTimeout(() => {
          onClose()
          setIsVerified(false)
          setOtp(["", "", "", "", "", ""])
        }, 2000)
      }
    } catch (err) {
      setLocalError("Invalid verification code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!onResend) return

    try {
      setIsLoading(true)
      await onResend()
      setCountdown(60)
      setCanResend(false)
      setOtp(["", "", "", "", "", ""])
      setLocalError("")
    } catch (err) {
      setLocalError("Failed to resend code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111122] text-white border-[#222236] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Verify OTP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-300">
            We've sent a verification code to your email. Please enter it below to complete your registration.
          </p>

          {displayError && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {displayError}
            </div>
          )}

          {isVerified && (
            <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Verification successful! Redirecting...
            </div>
          )}

          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center bg-[#0a0a16] border-[#222236] text-white focus:border-indigo-500 focus:ring-indigo-500"
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              disabled={!canResend || isLoading || !onResend}
              className="text-sm text-gray-400 hover:text-gray-300 hover:bg-[#1a1a2e]"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : canResend ? (
                "Resend code"
              ) : (
                `Resend code in ${countdown}s`
              )}
            </Button>

            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || isVerifying}
              className="bg-indigo-600 hover:bg-indigo-700"
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
      </DialogContent>
    </Dialog>
  )
}

export default OTPModal

