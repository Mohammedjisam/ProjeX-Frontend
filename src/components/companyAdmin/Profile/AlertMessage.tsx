// src/pages/companyadmin/profile/components/AlertMessage.tsx
import React from 'react';
import { Alert, AlertDescription } from "../../ui/alert";

interface AlertMessageProps {
  type: 'error' | 'success';
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  if (!message) return null;

  return (
    <Alert 
      variant={type} 
      className={`mb-6 ${
        type === 'error' 
          ? 'bg-red-900/20 border-red-800 text-red-200' 
          : 'bg-emerald-900/20 border-emerald-800 text-emerald-200'
      }`}
    >
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;