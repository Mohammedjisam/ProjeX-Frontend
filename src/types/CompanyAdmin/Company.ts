// src/types/Company.ts
export interface ICompanyFormData {
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
    userId?: string;
    stripeCustomerId?: string;
  }
  
  export interface IPaymentIntentResponse {
    clientSecret: string;
    companyData?: Partial<ICompanyFormData>;
    stripeCustomerId?: string; // Add this

  }
  
  export interface ICompleteCompanyData extends ICompanyFormData {
    userId: string;
    paymentIntentId: string;
    stripeCustomerId?: string; // Add this

  }