import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Sidebar } from "./Sidebar";
import adminAxiosInstance from "../../utils/AdminAxiosInstance";

interface Company {
  _id: string;
  companyName: string;
  companyType: string;
  companyDomain: string;
  phoneNumber: string;
  address: {
    buildingNo: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  companyAdmin: {
    _id: string;
    name: string;
    email: string;
  } | null;
  adminVerification: boolean;
  payment: {
    _id: string;
    planId: string;
    companyAdmin: string;
    subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';
    currentPeriodEnd: string;
    maxBranches: number;
    maxUsers: number;
    maxMeetingParticipants: number;
  } | null;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
}

export default function ViewCompany() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  useEffect(() => {
    // If company data is loaded and payment contains admin ID but companyAdmin is null
    if (company && !company.companyAdmin && company.payment?.companyAdmin) {
      fetchAdminDetails(company.payment.companyAdmin);
    }
  }, [company]);

  const fetchAdminDetails = async (adminId: string) => {
    try {
      setLoadingAdmin(true);
      const response = await adminAxiosInstance.get(`/user/${adminId}`);
      if (response.data.success) {
        setAdminUser(response.data.data);
      }
    } catch (err: any) {
      console.error("Error fetching admin details:", err);
      // Not setting global error since this is a secondary operation
    } finally {
      setLoadingAdmin(false);
    }
  };

  const fetchCompanyDetails = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await adminAxiosInstance.get(`/company/${id}`);
      
      if (response.data.success) {
        console.log('Company data received:', response.data.data);
        console.log('Payment data:', response.data.data.payment);
        setCompany(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || "Failed to fetch company details");
      }
    } catch (err: any) {
      console.error("Error fetching company details:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch company details");
    } finally {
      setLoading(false);
    }
  };

  const toggleVerification = async () => {
    if (!company || !id) return;
    
    try {
      setUpdating(true);
      const response = await adminAxiosInstance.patch(`/company/${id}/toggle-verification`);
      
      if (response.data.success) {
        // Create a new company object with the updated data
        const updatedCompany = {
          ...company,
          adminVerification: !company.adminVerification
        };
        
        // Update the state with the new company object
        setCompany(updatedCompany);
        setUpdateSuccess(response.data.message || 
          `Admin verification ${updatedCompany.adminVerification ? 'enabled' : 'disabled'} successfully`);
        
        setTimeout(() => {
          setUpdateSuccess(null);
        }, 3000);
      } else {
        throw new Error(response.data.message || "Failed to update verification status");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update verification status");
      console.error("Error updating verification status:", err);
      
      // Clear the error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'basic':
        return 'Basic';
      case 'pro':
        return 'Pro';
      case 'business':
        return 'Business';
      default:
        return planId ? planId.charAt(0).toUpperCase() + planId.slice(1) : 'No Plan';
    }
  };

  const getStatusBadgeStyle = (status: string = '') => {
    switch (status) {
      case 'active':
        return 'bg-green-900/50 text-green-400 border-green-800';
      case 'trialing':
        return 'bg-blue-900/50 text-blue-400 border-blue-800';
      case 'past_due':
        return 'bg-yellow-900/50 text-yellow-400 border-yellow-800';
      case 'canceled':
      case 'incomplete':
        return 'bg-red-900/50 text-red-400 border-red-800';
      default:
        return 'bg-gray-900/50 text-gray-400 border-gray-800';
    }
  };

  // Get admin details from either company.companyAdmin or the fetched adminUser
  const getAdminDetails = () => {
    if (company?.companyAdmin) {
      return company.companyAdmin;
    }
    return adminUser;
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/companies')}
            className="flex items-center text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white">Company Details</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
            <p>{error}</p>
            <button
              onClick={() => fetchCompanyDetails()}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            >
              Try again
            </button>
          </div>
        ) : company ? (
          <div className="space-y-6">
            {updateSuccess && (
              <div className="bg-green-900/30 border border-green-800 text-green-300 p-4 rounded-md">
                <p>{updateSuccess}</p>
              </div>
            )}

            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">{company.companyName}</h2>
                    <p className="text-gray-400">{company.companyType}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-300 mr-3">Verification Status:</span>
                    <div className="flex items-center mr-4">
                      {company.adminVerification ? (
                        <span className="flex items-center text-green-400">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-400">
                          <XCircle className="h-5 w-5 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                    <button
                      onClick={toggleVerification}
                      disabled={updating}
                      className={`px-3 py-1 rounded-md flex items-center text-sm ${
                        company.adminVerification
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-green-600 hover:bg-green-700"
                      } ${
                        updating ? "opacity-50 cursor-not-allowed" : ""
                      } text-white transition-colors`}
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : company.adminVerification ? (
                        <XCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      )}
                      {updating
                        ? "Processing..."
                        : company.adminVerification
                        ? "Revoke Verification"
                        : "Verify Company"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Company Name</p>
                        <p className="text-white">{company.companyName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Company Type</p>
                        <p className="text-white">{company.companyType}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Domain</p>
                        <p className="text-white">{company.companyDomain}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone Number</p>
                        <p className="text-white">{company.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Address</h3>
                  <div className="space-y-4">
                    {company.address && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Building No</p>
                            <p className="text-white">{company.address.buildingNo}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Street</p>
                            <p className="text-white">{company.address.street}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">City</p>
                            <p className="text-white">{company.address.city}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">State</p>
                            <p className="text-white">{company.address.state}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Country</p>
                            <p className="text-white">{company.address.country}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Postal Code</p>
                            <p className="text-white">{company.address.postalCode}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Company Admin</h3>
                  <div className="space-y-4">
                    {getAdminDetails() ? (
                      <>
                        <div>
                          <p className="text-gray-400 text-sm">Name</p>
                          <p className="text-white">{getAdminDetails()?.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-white">{getAdminDetails()?.email}</p>
                        </div>
                      </>
                    ) : loadingAdmin ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                      </div>
                    ) : company.payment?.companyAdmin ? (
                      <div className="bg-blue-900/30 border border-blue-800 text-blue-300 p-4 rounded-md">
                        <p>Admin details could not be loaded. Please refresh to try again.</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-900/30 border border-yellow-800 text-yellow-300 p-4 rounded-md">
                        <p>No admin assigned to this company.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Subscription & Plan</h3>
                  {company.payment ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Plan</p>
                          <p className="text-white">{getPlanName(company.payment.planId)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Status</p>
                          <span className={`px-2 py-1 text-sm rounded-md border ${getStatusBadgeStyle(company.payment.subscriptionStatus)}`}>
                            {company.payment.subscriptionStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Current Period End</p>
                          <p className="text-white">{formatDate(company.payment.currentPeriodEnd)}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <p className="text-gray-400 text-sm mb-2">Plan Limits</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-gray-400 text-xs">Branches</p>
                            <p className="text-white text-lg font-semibold">{company.payment.maxBranches}</p>
                          </div>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-gray-400 text-xs">Users</p>
                            <p className="text-white text-lg font-semibold">{company.payment.maxUsers}</p>
                          </div>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-gray-400 text-xs">Meeting Size</p>
                            <p className="text-white text-lg font-semibold">{company.payment.maxMeetingParticipants}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-900/30 border border-yellow-800 text-yellow-300 p-4 rounded-md">
                      <p>No subscription plan is active. The company needs to set up a payment plan.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
            <p>Company not found</p>
          </div>
        )}
      </div>
    </div>
  );
}