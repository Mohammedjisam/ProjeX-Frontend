import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../../utils/AxiosConfig";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51R3bqVHFwsFl0yfuPNKLqJnlw6OEG6zalVVCxndzAgyVzBGgBo032gSZXsjeay5K1ivUulgmchXSP3gqCaERKt4f00GUut0vRp");

const CheckoutForm = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [setupIntent, setSetupIntent] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const companyAdminData = useSelector((state) => state.companyAdmin.companyAdminData);

  useEffect(() => {
    if (selectedPlan) {
      // Initialize subscription
      const initializeSubscription = async () => {
        try {
          const response = await axiosInstance.post("/payment/subscribe", {
            planId: selectedPlan.id,
            userId: companyAdminData.id,
          });
          
          setSetupIntent(response.data.setupIntent);
          setPaymentData(response.data.paymentData);
        } catch (err) {
          setError("Failed to initialize subscription. Please try again.");
          toast.error("Failed to initialize subscription. Please try again.");
          console.error("Error initializing subscription:", err);
        }
      };
      
      initializeSubscription();
    }
  }, [selectedPlan]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements || !setupIntent || !paymentData) {
      setLoading(false);
      toast.error("Payment processing unavailable. Please try again later.");
      return;
    }

    // Start a loading toast
    const loadingToast = toast.loading("Processing your payment...");

    // Get a reference to the CardElement
    const cardElement = elements.getElement(CardElement);

    try {
      // Confirm the setup with minimal billing details
      const { error: setupError, setupIntent: confirmedSetupIntent } = await stripe.confirmCardSetup(
        setupIntent,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: companyAdminData.name || "Customer",
            },
          },
        }
      );

      if (setupError) {
        setError(setupError.message);
        toast.dismiss(loadingToast);
        toast.error(setupError.message);
        setLoading(false);
        return;
      }

      if (confirmedSetupIntent.status === "succeeded") {
        // Complete the subscription with payment data
        try {
          const response = await axiosInstance.post("/payment/complete-subscription", {
            paymentData: paymentData,
            setupIntentId: confirmedSetupIntent.id
          });
          
          toast.dismiss(loadingToast);
          toast.success(`Payment successful! Welcome to the ${selectedPlan.name} plan.`);
          
          // Pass the payment ID as a parameter to the tenant page
          const paymentId = response.data.payment._id;
          navigate(`/companyadmin/tenant/${paymentId}`);
        } catch (err) {
          console.error("Error completing subscription:", err);
          setError("Payment method was set up, but we couldn't complete your subscription. Please contact support.");
          toast.dismiss(loadingToast);
          toast.error("Payment method was set up, but we couldn't complete your subscription. Please contact support.");
        }
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("An error occurred while processing your payment. Please try again.");
      toast.dismiss(loadingToast);
      toast.error("An error occurred while processing your payment. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Card Information</label>
        <div className="p-4 border border-border rounded-md bg-background">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
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
        disabled={!stripe || loading || !setupIntent}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          loading || !setupIntent
            ? "bg-primary/50 text-primary-foreground cursor-not-allowed" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {loading ? "Processing..." : `Pay ₹${selectedPlan?.price || 0}`}
      </button>
      
      <div className="text-xs text-foreground/60 text-center">
        Your payment is secure. We use Stripe for secure payment processing.
      </div>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Plans data
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 1500,
      features: [
        "Up to 1 branch",
        "Unlimited tasks and projects",
        "Meeting with upto 3 persons",
        "Chat between employees",
        "Basic support",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: 2000,
      popular: true,
      features: [
        "Up to 3 branch",
        "Unlimited tasks and projects",
        "Meeting with upto 5 persons",
        "Chat between employees",
        "Expert support",
      ],
    },
    {
      id: "business",
      name: "Business",
      price: 3000,
      features: [
        "Up to 5 branch",
        "Unlimited tasks and projects",
        "Meeting with upto 10 persons",
        "Chat between employees",
        "Expert support",
      ],
    },
  ];

  useEffect(() => {
    // Check if a plan was selected from the previous page
    if (location.state?.plan) {
      const plan = plans.find(p => p.id === location.state.plan);
      setSelectedPlan(plan || plans[0]);
    } else {
      setSelectedPlan(plans[0]);
    }
  }, [location.state]);

  const handleChangePlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="font-sans bg-background text-foreground min-h-screen">
      {/* Sonner Toaster Component */}
      <Toaster position="top-right" richColors closeButton />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => {
              toast.info("Returning to home page");
              navigate(-1);
            }}
            className="flex items-center text-foreground/70 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </button>

          <div className="glass-morphism p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h1>
            
            {/* Progress Steps - Now single step for payment only */}
            <div className="flex justify-center mb-12 relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-border"></div>
              <div className="relative z-10 flex flex-col items-center text-primary">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>
            </div>

            {/* Selected Plan */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Selected Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id
                        ? "border-2 border-primary bg-primary/5"
                        : "border border-border bg-card"
                    }`}
                    onClick={() => handleChangePlan(plan)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{plan.name}</h3>
                      {selectedPlan?.id === plan.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="text-xl font-bold mb-2">₹{plan.price}<span className="text-sm font-normal text-foreground/70">/month</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form with Stripe */}
            <Elements stripe={stripePromise}>
              <CheckoutForm selectedPlan={selectedPlan} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;