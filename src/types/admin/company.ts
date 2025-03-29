export interface Address {
    buildingNo: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }
  
  export interface CompanyAdmin {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Company {
    _id: string;
    companyName: string;
    companyType: string;
    companyDomain: string;
    phoneNumber: string;
    address: Address;
    companyAdmin: CompanyAdmin|AdminUser;
    adminVerification: boolean;
    payment?:Payment | null;
  }
  
  export interface CompanyResponse {
    success: boolean;
    data: Company[];
    count: number;
    message?: string;
  }

  export interface AdminUser {
    _id: string;
    name: string;
    email: string;
  }

  export interface Payment {
    _id: string;
    planId: string;
    companyAdmin: string;
    subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';
    currentPeriodEnd: string;
    maxBranches: number;
    maxUsers: number;
    maxMeetingParticipants: number;
  }
  