import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import axiosInstance from "../../utils/AxiosInstance";

const stripePromise = loadStripe("pk_test_51R3bqVHFwsFl0yfuPNKLqJnlw6OEG6zalVVCxndzAgyVzBGgBo032gSZXsjeay5K1ivUulgmchXSP3gqCaERKt4f00GUut0vRp");

const CheckoutForm = ({ setupIntent, companyData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      toast.error("Payment processing unavailable. Please try again later.");
      return;
    }

    const loadingToast = toast.loading("Processing your payment...");

    try {
      const cardElement = elements.getElement(CardElement);
      const { error: setupError, setupIntent: confirmedSetupIntent } = await stripe.confirmCardSetup(
        setupIntent,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: companyData.companyName || "Customer",
            },
          },
        }
      );

      if (setupError) {
        throw setupError;
      }

      if (confirmedSetupIntent.status === "succeeded") {
        // Complete company creation with payment
        const response = await axiosInstance.post('/company/complete-creation', {
          companyData,
          setupIntentId: confirmedSetupIntent.id
        });

        toast.dismiss(loadingToast);
        
        if (response.data.success) {
          toast.success('Company created successfully!');
          navigate('/companyadmin/dashboard');
        } else {
          throw new Error(response.data.message || 'Failed to complete company creation');
        }
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      setError(err.message);
      toast.error(err.message || 'An error occurred while processing your payment');
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Card Information</label>
        <div className="p-4 border border-gray-600 rounded-md bg-gray-800">
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

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          loading
            ? "bg-indigo-500/50 text-white cursor-not-allowed" 
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {loading ? "Processing..." : `Pay $${companyData.planId === 'basic' ? '15' : companyData.planId === 'pro' ? '20' : '30'}`}
      </button>
      
      <div className="text-xs text-gray-400 text-center">
        Your payment is secure. We use Stripe for secure payment processing.
      </div>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setupIntent, companyData } = location.state || {};

  // Redirect if missing required data
  useEffect(() => {
    if (!setupIntent || !companyData) {
      toast.error('Missing required information');
      navigate('/companyadmin/create');
    }
  }, [setupIntent, companyData, navigate]);

  if (!setupIntent || !companyData) {
    return null; // Will redirect from useEffect
  }

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen">
      <Toaster position="top-right" richColors closeButton />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/companyadmin/create')}
            className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Company Details
          </button>

          <div className="bg-gray-800 p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Complete Payment</h1>
            
            <div className="flex justify-center mb-12 relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-700"></div>
              <div className="relative z-10 flex flex-col items-center text-indigo-400">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-600 text-white">
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>
            </div>

            <div className="mb-8 p-4 bg-gray-700 rounded-lg">
              <h2 className="text-lg font-medium mb-2">
                {companyData.companyName} - {companyData.planId.charAt(0).toUpperCase() + companyData.planId.slice(1)} Plan
              </h2>
              <p className="text-xl font-bold">
                ${companyData.planId === 'basic' ? '15' : companyData.planId === 'pro' ? '20' : '30'}
                <span className="text-sm font-normal text-gray-400">/month</span>
              </p>
            </div>

            <Elements stripe={stripePromise} options={{
              appearance: {
                theme: 'night',
                variables: {
                  colorPrimary: '#6366f1',
                  colorBackground: '#1f2937',
                  colorText: '#f3f4f6',
                  colorDanger: '#ef4444',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }
              }
            }}>
              <CheckoutForm setupIntent={setupIntent} companyData={companyData} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;