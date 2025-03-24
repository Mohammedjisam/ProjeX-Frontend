import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowRight, X } from 'lucide-react';
import axiosInstance from '../../utils/AxiosInstance';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51R3bqVHFwsFl0yfuPNKLqJnlw6OEG6zalVVCxndzAgyVzBGgBo032gSZXsjeay5K1ivUulgmchXSP3gqCaERKt4f00GUut0vRp");

interface CompanyFormData {
  companyName: string;
  companyType: string;
  companyDomain: string;
  phoneNumber: string;
  buildingNo: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  planId: 'basic' | 'pro' | 'business';
}

const CheckoutForm = ({ 
  clientSecret,
  companyData,
  onSuccess,
  onClose
}: {
  clientSecret: string;
  companyData: CompanyFormData;
  onSuccess: (paymentIntentId: string) => void;
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const companyAdminData = useSelector((state: any) => state.companyAdmin.companyAdminData);

  const handleSubmit = async (event: React.FormEvent) => {
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
      
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement!,
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

      if (paymentError) throw paymentError;
      
      if (paymentIntent?.status === 'succeeded') {
        // Complete company creation after successful payment
        const response = await axiosInstance.post('/company/complete-creation', {
          companyData: {
            ...companyData,
            userId: companyAdminData?.id
          },
          paymentIntentId: paymentIntent.id
        });

        toast.dismiss(loadingToast);
        
        if (response.data.success) {
          toast.success('Company created successfully!');
          onSuccess(paymentIntent.id);
        } else {
          throw new Error(response.data.message || 'Failed to complete company creation');
        }
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
      setError(err.message);
      toast.error(err.message || 'An error occurred while processing your payment');
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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

          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-2 rounded-md font-medium transition-colors ${
              loading
                ? "bg-indigo-500/50 text-white cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Processing..." : `Pay $${companyData.planId === 'basic' ? '15' : companyData.planId === 'pro' ? '20' : '30'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const CompanyForm = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    companyType: '',
    companyDomain: '',
    phoneNumber: '',
    buildingNo: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    planId: 'basic'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const companyAdminData = useSelector((state: any) => state.companyAdmin.companyAdminData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await axiosInstance.post('/company/create-payment-intent', {
        ...formData,
        userId: companyAdminData?.id
      });
  
      console.log('Payment intent response:', response.data);
  
      if (response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
        // Update formData with any server-generated data
        setFormData(prev => ({
          ...prev,
          ...(response.data.companyData || {})
        }));
        setShowPaymentModal(true);
      } else {
        throw new Error('Missing client secret in response');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to initialize payment. Please try again.');
      console.error('Error creating payment intent:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setShowPaymentModal(false);
    // Reset form
    setFormData({
      companyName: '',
      companyType: '',
      companyDomain: '',
      phoneNumber: '',
      buildingNo: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      planId: 'basic'
    });
  };

  const plans = [
    { id: 'basic', name: 'Basic', price: 15 },
    { id: 'pro', name: 'Pro', price: 20 },
    { id: 'business', name: 'Business', price: 30 }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="w-full max-w-3xl p-8 bg-gray-900 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Enter Company Details</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="companyType" className="block mb-2">Company Type</label>
              <input
                type="text"
                id="companyType"
                name="companyType"
                placeholder="Enter Company Type"
                value={formData.companyType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="companyDomain" className="block mb-2">Company Domain</label>
              <input
                type="text"
                id="companyDomain"
                name="companyDomain"
                placeholder="Enter Company Domain"
                value={formData.companyDomain}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="buildingNo" className="block mb-2">Building No</label>
              <input
                type="text"
                id="buildingNo"
                name="buildingNo"
                placeholder="Enter Building No"
                value={formData.buildingNo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="street" className="block mb-2">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Enter Street"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block mb-2">State</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block mb-2">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="postalCode" className="block mb-2">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Enter Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">Subscription Plan</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.planId === plan.id 
                        ? 'border-indigo-500 bg-indigo-500/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, planId: plan.id as 'basic' | 'pro' | 'business' }))}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{plan.name}</h3>
                      {formData.planId === plan.id && (
                        <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded">Selected</span>
                      )}
                    </div>
                    <p className="mt-2 text-lg font-bold">${plan.price}<span className="text-sm font-normal text-gray-400">/month</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  Continue to Payment
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {showPaymentModal && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm 
              clientSecret={clientSecret}
              companyData={formData}
              onSuccess={handlePaymentSuccess}
              onClose={() => setShowPaymentModal(false)}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CompanyForm;