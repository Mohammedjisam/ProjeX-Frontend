import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface TenantFormData {
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
  paymentId?: string;
}

const Tenant: React.FC = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams<{ paymentId: string }>();
  const [formData, setFormData] = useState<TenantFormData>({
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
    paymentId: paymentId // Initialize with the URL parameter
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const companyAdminData = useSelector((state: any) => state.companyAdmin.companyAdminData);

  // Check if payment was completed and retrieve payment ID from URL params
  useEffect(() => {
    if (paymentId) {
      setFormData(prev => ({
        ...prev,
        paymentId
      }));
      console.log("Payment ID from URL:", paymentId);
    } else {
      setMessage({
        text: 'Payment ID is missing. Please complete the payment process first.',
        type: 'error'
      });
    }
  }, [paymentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    // Structure the data to match what the backend expects
    const requestData = {
      companyName: formData.companyName,
      companyType: formData.companyType,
      companyDomain: formData.companyDomain,
      phoneNumber: formData.phoneNumber,
      address: {
        buildingNo: formData.buildingNo,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode
      },
      paymentId: formData.paymentId, // Use payment ID from params
      userId: companyAdminData?.id
    };
    
    try {
      console.log("Sending data:", requestData);
      const response = await axiosInstance.post('/tenant/addtenant', requestData);
      
      if (response.data.success) {
        setMessage({
          text: 'Company details saved successfully!',
          type: 'success'
        });
        
        // Reset form after successful submission
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
          postalCode: ''
        });
        
        // Redirect to dashboard or home page
        setTimeout(() => navigate('/companyadmin/subscriptions'), 2000);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.response && error.response.data) {
        console.error('Server error details:', error.response.data);
      }
      setMessage({
        text: error.response?.data?.message || 'Failed to create tenant. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="w-full max-w-3xl p-8 bg-gray-900 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Enter Company Details</h1>
        
        {message && (
          <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {message.text}
          </div>
        )}
        
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
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting || !paymentId}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tenant;