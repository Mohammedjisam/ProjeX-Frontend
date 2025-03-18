import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, CreditCard, Building } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../../utils/AxiosConfig";
import { useSelector } from "react-redux";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51R3bqVHFwsFl0yfuPNKLqJnlw6OEG6zalVVCxndzAgyVzBGgBo032gSZXsjeay5K1ivUulgmchXSP3gqCaERKt4f00GUut0vRp");

const CheckoutForm = ({ selectedPlan, companyData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [setupIntent, setSetupIntent] = useState("");
  const [tempCompanyData, setTempCompanyData] = useState(null);
  const companyAdminData = useSelector((state) => state.companyAdmin.companyAdminData);

  useEffect(() => {
    if (selectedPlan) {
      // Initialize subscription
      const initializeSubscription = async () => {
        try {
          const response = await axiosInstance.post("/payment/subscribe", {
            planId: selectedPlan.id,
            companyData,
            userId: companyAdminData.id
          });
          
          setSetupIntent(response.data.setupIntent);
          setTempCompanyData(response.data.companyData);
        } catch (err) {
          setError("Failed to initialize subscription. Please try again.");
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

    if (!stripe || !elements || !setupIntent || !tempCompanyData) {
      setLoading(false);
      return;
    }

    // Get a reference to the CardElement
    const cardElement = elements.getElement(CardElement);

    try {
      // Confirm the setup
      const { error: setupError, setupIntent: confirmedSetupIntent } = await stripe.confirmCardSetup(
        setupIntent,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: companyData.companyName,
              address: {
                line1: companyData.address,
                city: companyData.city,
                state: companyData.state,
                postal_code: companyData.zip,
                country: companyData.country,
              },
            },
          },
        }
      );

      if (setupError) {
        setError(setupError.message);
        setLoading(false);
        return;
      }

      if (confirmedSetupIntent.status === "succeeded") {
        // Complete the subscription
        try {
          const response = await axiosInstance.post("/payment/complete-subscription", {
            companyData: tempCompanyData,
            setupIntentId: confirmedSetupIntent.id
          });
          
          // Redirect to success page
          navigate("/payment-success", { 
            state: { 
              plan: selectedPlan,
              companyName: companyData.companyName
            } 
          });
        } catch (err) {
          console.error("Error completing subscription:", err);
          setError("Payment method was set up, but we couldn't complete your subscription. Please contact support.");
        }
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("An error occurred while processing your payment. Please try again.");
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
  const [companyData, setCompanyData] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCompanyData({
      ...companyData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error for the field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["companyName", "address", "city", "state", "zip", "country"];
    
    requiredFields.forEach(field => {
      if (!companyData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    
    if (!companyData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleChangePlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="font-sans bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-foreground/70 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </button>

          <div className="glass-morphism p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h1>
            
            {/* Progress Steps */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-border"></div>
              <div className={`relative z-10 flex flex-col items-center ${step >= 1 ? "text-primary" : "text-foreground/50"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-background border border-border"}`}>
                  <Building className="h-4 w-4" />
                </div>
                <span className="mt-2 text-sm font-medium">Company Info</span>
              </div>
              <div className={`relative z-10 flex flex-col items-center ${step >= 2 ? "text-primary" : "text-foreground/50"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-background border border-border"}`}>
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

            {step === 1 ? (
              /* Company Information Form */
              <div>
                <h2 className="text-lg font-medium mb-4">Company Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={companyData.companyName}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.companyName ? "border-red-500" : "border-border"
                      } bg-background`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={companyData.address}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.address ? "border-red-500" : "border-border"
                      } bg-background`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={companyData.city}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors.city ? "border-red-500" : "border-border"
                        } bg-background`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={companyData.state}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors.state ? "border-red-500" : "border-border"
                        } bg-background`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium mb-1">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={companyData.zip}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors.zip ? "border-red-500" : "border-border"
                        } bg-background`}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={companyData.country}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors.country ? "border-red-500" : "border-border"
                        } bg-background`}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start mt-6">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={companyData.agreeTerms}
                      onChange={handleInputChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="agreeTerms" className="text-sm">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>
                  )}
                  
                  <button
                    onClick={handleContinue}
                    className="w-full py-3 mt-6 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Form with Stripe */
              <Elements stripe={stripePromise}>
                <CheckoutForm 
                  selectedPlan={selectedPlan} 
                  companyData={companyData} 
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;