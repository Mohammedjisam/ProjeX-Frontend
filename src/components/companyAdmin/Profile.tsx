import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Edit, Save, Upload, User, Phone, Mail, Loader2 } from 'lucide-react';
import Sidebar from './Sidebar';
import { updateCompanyAdmin } from '../../redux/slice/CompanyAdminSlice';
import axiosInstance from '../../utils/AxiosConfig';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const companyAdminData = useSelector((state: RootState) => state.companyAdmin.companyAdminData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: companyAdminData?.name || '',
    email: companyAdminData?.email || '',
    phoneNumber: companyAdminData?.phoneNumber || ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(companyAdminData?.profileImage || null);

  // Update form data when companyAdminData changes
  useEffect(() => {
    if (companyAdminData) {
      setFormData({
        name: companyAdminData.name || '',
        email: companyAdminData.email || '',
        phoneNumber: companyAdminData.phoneNumber || ''
      });
      setPreviewImage(companyAdminData.profileImage || null);
    }
  }, [companyAdminData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create preview
      setPreviewImage(URL.createObjectURL(file));
      
      // Convert to base64 for Cloudinary
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Prepare data
      const updateData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        profileImageBase64: profileImageBase64
      };

      // Make API call to update profile
      const response = await axiosInstance.put('/auth/profile', updateData);
      
      // Update Redux state with new user data
      dispatch(updateCompanyAdmin(response.data.user));
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clean up any object URLs to prevent memory leaks
      if (profileImage && previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
      
      // Reset state related to image upload
      setProfileImage(null);
      setProfileImageBase64(null);
      setPreviewImage(response.data.user.profileImage || null);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] p-6">
        <div className="max-w-3xl mx-auto mt-8">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-slate-700 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-white">My Profile</CardTitle>
                <Button 
                  onClick={() => isEditing ? handleSubmit({ preventDefault: () => {} } as React.FormEvent) : setIsEditing(true)}
                  disabled={isLoading}
                  variant={isEditing ? "default" : "outline"}
                  className={isEditing ? "bg-emerald-600 hover:bg-emerald-700" : "border-slate-600 text-slate-200"}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : isEditing ? (
                    <>
                      <Save size={18} className="mr-2" />
                      <span>Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Edit size={18} className="mr-2" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-800 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {successMessage && (
                <Alert className="mb-6 bg-emerald-900/20 border-emerald-800 text-emerald-200">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-slate-700 shadow-lg">
                    {previewImage ? (
                      <AvatarImage src={previewImage} alt="Profile" className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-3xl font-bold">
                        {companyAdminData?.name ? companyAdminData.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  {isEditing && (
                    <div className="w-full">
                      <Label htmlFor="profile-image" className="cursor-pointer">
                        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors text-sm">
                          <Upload size={16} />
                          <span>Upload Photo</span>
                        </div>
                        <Input 
                          id="profile-image"
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange} 
                        />
                      </Label>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                        <User size={16} className="text-slate-400" />
                        <span>Full Name</span>
                      </Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-slate-700 border-slate-600 text-white focus-visible:ring-indigo-500"
                          required
                        />
                      ) : (
                        <div className="px-3 py-2 rounded-md bg-slate-700/50 border border-slate-600 text-white">
                          {companyAdminData?.name || 'Not provided'}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                        <Mail size={16} className="text-slate-400" />
                        <span>Email Address</span>
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-slate-700 border-slate-600 text-white focus-visible:ring-indigo-500"
                          required
                        />
                      ) : (
                        <div className="px-3 py-2 rounded-md bg-slate-700/50 border border-slate-600 text-white">
                          {companyAdminData?.email || 'Not provided'}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-slate-300 flex items-center gap-2">
                        <Phone size={16} className="text-slate-400" />
                        <span>Phone Number</span>
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phoneNumber"
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="bg-slate-700 border-slate-600 text-white focus-visible:ring-indigo-500"
                        />
                      ) : (
                        <div className="px-3 py-2 rounded-md bg-slate-700/50 border border-slate-600 text-white">
                          {companyAdminData?.phoneNumber || 'Not provided'}
                        </div>
                      )}
                    </div>
                    
                    {isEditing && (
                      <>
                        <Separator className="my-4 bg-slate-700" />
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={18} className="mr-2 animate-spin" />
                              <span>Updating Profile...</span>
                            </>
                          ) : (
                            'Save Profile Information'
                          )}
                        </Button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
