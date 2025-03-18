"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import { CreditCard, Calendar, Users, GitBranch, Video, CheckCircle, AlertCircle, Clock, XCircle, ArrowRight, CreditCardIcon, ReceiptIcon, HelpCircle } from 'lucide-react'
import type { RootState } from "../../redux/Store"
import Sidebar from "../../components/companyAdmin/Sidebar"
import axiosInstance from "../../utils/AxiosConfig"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Skeleton } from "../../components/ui/skeleton"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Progress } from "../../components/ui/progress"

interface PaymentMethod {
  brand: string
  last4: string
  expMonth: number
  expYear: number
}

interface Limits {
  maxBranches: number
  maxUsers: number
  maxMeetingParticipants: number
}

interface Subscription {
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete'
  currentPeriodEnd: string
  plan: 'basic' | 'pro' | 'business'
  paymentMethod: PaymentMethod
  limits: Limits
}

const Subscriptions = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const companyAdminData = useSelector((state: RootState) => state.companyAdmin.companyAdminData)
  
  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        
        const response = await axiosInstance.get(
          `/payment/subscription`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        
        if (response.data.success) {
          setSubscription(response.data.subscription)
        } else {
          setError("Failed to fetch subscription details")
        }
      } catch (err: any) {
        console.error("Subscription error:", err)
        setError(err.response?.data?.error || "An error occurred while fetching subscription details")
      } finally {
        setLoading(false)
      }
    }
    
    fetchSubscriptionDetails()
  }, [])
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
            <CheckCircle size={14} className="mr-1" />
            Active
          </Badge>
        )
      case 'trialing':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
            <Clock size={14} className="mr-1" />
            Trial
          </Badge>
        )
      case 'past_due':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
            <AlertCircle size={14} className="mr-1" />
            Past Due
          </Badge>
        )
      case 'canceled':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">
            <XCircle size={14} className="mr-1" />
            Canceled
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200">
            <AlertCircle size={14} className="mr-1" />
            {status}
          </Badge>
        )
    }
  }
  
  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'basic':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
            Basic
          </Badge>
        )
      case 'pro':
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-none">
            Pro
          </Badge>
        )
      case 'business':
        return (
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none">
            Business
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">
            {plan}
          </Badge>
        )
    }
  }
  
  const getCardIcon = (brand: string) => {
    // Simple icon display based on card brand
    switch (brand.toLowerCase()) {
      case 'visa':
        return <span className="font-bold text-blue-600">VISA</span>
      case 'mastercard':
        return <span className="font-bold text-red-600">MC</span>
      case 'amex':
        return <span className="font-bold text-blue-500">AMEX</span>
      default:
        return <span className="font-bold">{brand.toUpperCase()}</span>
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'MMM dd, yyyy')
  }
  
  return (
    <div className="flex h-screen ">
      <Sidebar />
      
      <main className="ml-[240px] flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white-900">Subscription Management</h1>
            {subscription && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Current Plan:</span>
                {getPlanBadge(subscription.plan)}
                {getStatusBadge(subscription.status)}
              </div>
            )}
          </div>
          
          {loading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-red-500">
                  <AlertCircle size={40} className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium">{error}</h3>
                  <p className="mt-2 text-gray-600">Please try again later or contact support.</p>
                </div>
              </CardContent>
            </Card>
          ) : subscription ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Plan Overview */}
              <Card className="col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Plan Overview</CardTitle>
                  </div>
                  <CardDescription>
                    Details about your current subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-md mr-4">
                        <CreditCard className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Plan</p>
                        <div className="mt-1 font-medium text-lg">{subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-md mr-4">
                        <Calendar className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Billing Date</p>
                        <p className="mt-1 font-medium text-lg">{formatDate(subscription.currentPeriodEnd)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-medium mb-4">Plan Features & Limits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-2">
                          <GitBranch size={18} className="text-primary mr-2" />
                          <h4 className="font-medium">Branches</h4>
                        </div>
                        <p className="text-2xl font-bold">{subscription.limits.maxBranches}</p>
                        <p className="text-sm text-muted-foreground">Maximum</p>
                        <Progress 
                          value={70} 
                          className="h-1.5 mt-2" 
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-2">
                          <Users size={18} className="text-primary mr-2" />
                          <h4 className="font-medium">Team Members</h4>
                        </div>
                        <p className="text-2xl font-bold">{subscription.limits.maxUsers}</p>
                        <p className="text-sm text-muted-foreground">Maximum</p>
                        <Progress 
                          value={45} 
                          className="h-1.5 mt-2" 
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-2">
                          <Video size={18} className="text-primary mr-2" />
                          <h4 className="font-medium">Meeting Participants</h4>
                        </div>
                        <p className="text-2xl font-bold">{subscription.limits.maxMeetingParticipants}</p>
                        <p className="text-sm text-muted-foreground">Per Meeting</p>
                        <Progress 
                          value={30} 
                          className="h-1.5 mt-2" 
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Your current payment information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="bg-muted/50 border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <CreditCardIcon size={20} className="mr-2 text-primary" />
                          {getCardIcon(subscription.paymentMethod.brand)}
                        </div>
                        <span className="text-muted-foreground font-mono">•••• {subscription.paymentMethod.last4}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expires: {subscription.paymentMethod.expMonth.toString().padStart(2, '0')}/{subscription.paymentMethod.expYear}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <CreditCardIcon size={16} className="mr-2" />
                    Update Payment Method
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Subscription Actions */}
              <Card className="col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Subscription Management</CardTitle>
                  <CardDescription>
                    Manage your subscription plan and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="w-full">
                      Upgrade Plan
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <ReceiptIcon size={16} className="mr-2" />
                      View Billing History
                    </Button>
                    
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                      <XCircle size={16} className="mr-2" />
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex items-start mt-2 text-sm text-muted-foreground">
                    <HelpCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      Need help with your subscription? Contact our support team at{' '}
                      <a href="mailto:support@projex.com" className="text-primary hover:underline">
                        support@projex.com
                      </a>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="bg-muted p-3 rounded-full inline-flex mb-4">
                    <AlertCircle size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Subscription Found</h3>
                  <p className="text-muted-foreground mb-6">You don't have an active subscription. Please subscribe to a plan.</p>
                  <Button>
                    View Available Plans
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default Subscriptions
