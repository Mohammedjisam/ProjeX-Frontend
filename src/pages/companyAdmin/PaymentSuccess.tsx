// src/pages/companyAdmin/PaymentSuccess.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 mb-6">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Thank you for your payment. Your subscription is now active. You can now access all features of your plan.
      </p>
      <Button onClick={() => navigate('/companyadmin/dashboard')}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default PaymentSuccess;