// src/pages/companyadmin/profile/Profile.tsx
import React, { useState } from 'react';
import Sidebar from '../../components/manager/Sidebar';
import { useProfile } from '../../hooks/manager/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"
import ProfileForm from '../../components/common/Profile/ProfileForm';
import ProfileAvatar from '../../components/common/Profile/ProfileAvatar';
import AlertMessage from '../../components/common/Profile/AlertMessage';
import EditButton from '../../components/common/Profile/EditButton';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    
    const { 
      profileData,
      loading,
      error,
      success,
      submitProfileUpdate,
      clearMessages
    } = useProfile();
  
    const handleToggleEdit = () => {
      if (isEditing) {
        clearMessages();
      }
      setIsEditing(!isEditing);
    };
  
    const handleSubmit = async (formValues: ProfileFormValues) => {
      const success = await submitProfileUpdate({
        ...formValues,
        profileImageBase64: previewImage?.startsWith('data:image') ? previewImage : null
      });
      
      if (success) {
        setIsEditing(false);
        setImageFile(null);
      }
    };
  
    // Add loading state check
    if (loading && !profileData) {
      return (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-[240px] p-6">
          <div className="max-w-3xl mx-auto mt-8">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="border-b border-slate-700 pb-4">
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <Skeleton className="w-32 h-32 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[240px] p-6">
        <div className="max-w-3xl mx-auto mt-8">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-slate-700 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-white">My Profile</CardTitle>
                <EditButton 
                  isEditing={isEditing}
                  isLoading={loading}
                  onToggle={handleToggleEdit}
                />
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <AlertMessage type="error" message={error} />
              <AlertMessage type="success" message={success} />
              
              <div className="flex flex-col md:flex-row gap-8">
                <ProfileAvatar 
                  isEditing={isEditing}
                  currentImage={profileData?.profileImage}
                  previewImage={previewImage}
                  onImageChange={(file, preview) => {
                    setImageFile(file);
                    setPreviewImage(preview);
                  }}
                />
                
                <ProfileForm 
                  profileData={profileData}
                  isEditing={isEditing}
                  isLoading={loading}
                  onSubmit={handleSubmit}
                />
              </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;