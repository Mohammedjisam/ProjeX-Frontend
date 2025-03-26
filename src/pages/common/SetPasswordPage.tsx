import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import { usePasswordReset } from '../../hooks/common/usePasswordReset';
import PasswordInput from '../../components/common/Password/PasswordInput';
import SubmitButton from '../../components/common/Password/SubmitButton';

const SetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const { 
    validateToken, 
    reset, 
    isLoading,
    isTokenValid 
  } = usePasswordReset(token || '');

  const validateForm = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      reset.mutate(password);
    }
  };

  if (validateToken.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isTokenValid) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1A1F2C] rounded-xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-xl font-bold text-white">Set Your Password</h1>
          </div>
          
          <div className="p-6">
            {validateToken.data?.data && (
              <div className="mb-6 bg-indigo-900/30 p-4 rounded-lg">
                <p className="text-gray-300">
                  Welcome, <span className="font-semibold text-white">{validateToken.data.data.name}</span>!
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  You're setting up a password for {validateToken.data.data.email}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <PasswordInput
                label="New Password"
                id="password"
                value={password}
                onChange={setPassword}
                showPassword={showPassword}
                onToggleVisibility={() => setShowPassword(!showPassword)}
                error={errors.password}
                note="Password must be at least 6 characters long"
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />

              <PasswordInput
                label="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                showPassword={showConfirmPassword}
                onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />

              <SubmitButton
                submitting={reset.isLoading}
                icon={<Check className="h-5 w-5 mr-2" />}
                text="Set Password"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SetPasswordPage;