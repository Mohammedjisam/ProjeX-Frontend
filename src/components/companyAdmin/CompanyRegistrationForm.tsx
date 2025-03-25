// src/components/company/CompanyRegistrationForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCreateCompanyPaymentIntent } from '../../hooks/companyAdmin/useCompany';
import { useSelector } from 'react-redux';
import PaymentModal from './PaymentModal';
import { ICompanyFormData } from '../../types/Company';
import { IPaymentIntentResponse } from '../../types/Response';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  companyType: yup.string().required('Company type is required'),
  companyDomain: yup.string().required('Company domain is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  buildingNo: yup.string().required('Building number is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required'),
  planId: yup.string().oneOf(['basic', 'pro', 'business']).required('Plan is required')
});

const CompanyRegistrationForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    watch 
  } = useForm<ICompanyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      planId: 'basic'
    }
  });
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate()
  const [paymentData, setPaymentData] = useState<{
    clientSecret: string;
    companyData: ICompanyFormData;
  } | null>(null);


  
  const companyAdminData = useSelector((state: any) => state.companyAdmin.companyAdminData);
  console.log(companyAdminData)
  const { mutate: createPaymentIntent, isPending } = useCreateCompanyPaymentIntent();
  
  const onSubmit = (data: ICompanyFormData) => {
    createPaymentIntent({ ...data, userId: companyAdminData?.id }, {
      onSuccess: (response: IPaymentIntentResponse) => {
        setPaymentData({
          clientSecret: response.clientSecret,
          companyData: response.companyData
        });
        setShowPaymentModal(true);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to initialize payment');
      }
    });
  };



  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    toast.success('Company registration completed successfully!');
    navigate('/companyadmin/dashboard')
  };

  const planId = watch('planId');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register Your Company
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  {...register('companyName')} 
                  error={errors.companyName?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="companyType">Company Type</Label>
                <Input 
                  id="companyType" 
                  {...register('companyType')} 
                  error={errors.companyType?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="companyDomain">Company Domain</Label>
                <Input 
                  id="companyDomain" 
                  {...register('companyDomain')} 
                  error={errors.companyDomain?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  {...register('phoneNumber')} 
                  error={errors.phoneNumber?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="buildingNo">Building Number</Label>
                <Input 
                  id="buildingNo" 
                  {...register('buildingNo')} 
                  error={errors.buildingNo?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="street">Street</Label>
                <Input 
                  id="street" 
                  {...register('street')} 
                  error={errors.street?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  {...register('city')} 
                  error={errors.city?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  {...register('state')} 
                  error={errors.state?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  {...register('country')} 
                  error={errors.country?.message}
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input 
                  id="postalCode" 
                  {...register('postalCode')} 
                  error={errors.postalCode?.message}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Subscription Plan</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['basic', 'pro', 'business'].map((plan) => (
                    <div
                      key={plan}
                      className={`p-4 border rounded-md cursor-pointer ${
                        planId === plan ? 'border-primary bg-primary/10' : 'border-gray-200'
                      }`}
                      onClick={() => setValue('planId', plan as 'basic' | 'pro' | 'business')}
                    >
                      <div className="font-medium capitalize">{plan}</div>
                      <div className="text-sm">
                        ${plan === 'basic' ? 15 : plan === 'pro' ? 20 : 30}/month
                      </div>
                    </div>
                  ))}
                </div>
                {errors.planId && (
                  <p className="text-sm text-red-500">{errors.planId.message}</p>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full" loading={isPending}>
              Continue to Payment
            </Button>
          </form>
        </CardContent>
      </Card>

      {showPaymentModal && paymentData && (
        <PaymentModal
          clientSecret={paymentData.clientSecret}
          companyData={paymentData.companyData}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default CompanyRegistrationForm;