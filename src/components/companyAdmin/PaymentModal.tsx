// src/components/company/PaymentModal.tsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useCompleteCompanyCreation } from '../../hooks/companyAdmin/useCompany';
import { toast } from 'sonner';
import { ICompanyFormData } from '../../types/CompanyAdmin/Company';
import { ICompanyRegistrationResponse } from '../../types/CompanyAdmin/Response';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe("pk_test_51R3bqVHFwsFl0yfuPNKLqJnlw6OEG6zalVVCxndzAgyVzBGgBo032gSZXsjeay5K1ivUulgmchXSP3gqCaERKt4f00GUut0vRp");

interface PaymentModalProps {
  clientSecret: string;
  companyData: ICompanyFormData;
  onClose: () => void;
  onSuccess: (response: ICompanyRegistrationResponse) => void;
}

const CheckoutForm = ({ 
  clientSecret,
  companyData,
  onClose,
  onSuccess
}: PaymentModalProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { mutate: completeCreation, isPending } = useCompleteCompanyCreation();
  const [error, setError] = React.useState<string | null>(null);
  const companyAdminData = useSelector((state: any) => state.companyAdmin.companyAdminData);
  console.log(companyAdminData)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
  
    setError(null);
    const loadingToast = toast.loading("Processing payment...");
  
    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: companyData.companyName,
              address: {
                line1: companyData.street,
                city: companyData.city,
                state: companyData.state,
                postal_code: companyData.postalCode,
                country: companyData.country,
              }
            }
          }
        }
      );
  
      if (stripeError) {
        throw stripeError;
      }
  
      if (paymentIntent?.status === 'succeeded') {
        toast.dismiss(loadingToast);
        
        // Ensure we have the customer ID before proceeding
        if (!companyAdminData.id) {
          throw new Error('Payment succeeded but no customer ID was returned');
        }
  
        completeCreation({
            companyData: {
              ...companyData,
              userId: companyAdminData?.id
            },
            paymentIntentId: paymentIntent.id
          }, {
          onSuccess: (response) => {
            onSuccess(response);
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to complete registration');
          }
        });
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
      setError(err.message || 'Payment failed');
      toast.error(err.message || 'Payment failed');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            disabled={isPending}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium">
            {companyData.companyName} - {companyData.planId.charAt(0).toUpperCase() + companyData.planId.slice(1)} Plan
          </h3>
          <p className="text-xl font-bold">
            ${companyData.planId === 'basic' ? '15' : companyData.planId === 'pro' ? '20' : '30'}
            <span className="text-sm font-normal text-gray-400">/month</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Card Information</label>
            <div className="p-3 border border-gray-600 rounded-md bg-gray-700">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#ff5252',
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={isPending}
          >
            {`Pay $${companyData.planId === 'basic' ? '15' : companyData.planId === 'pro' ? '20' : '30'}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

const PaymentModal = (props: PaymentModalProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret: props.clientSecret }}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default PaymentModal;