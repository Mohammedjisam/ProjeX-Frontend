// src/pages/companyadmin/profile/components/ProfileForm.tsx
import React from 'react';
import { User, Phone, Mail } from 'lucide-react';
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ProfileData, ProfileFormValues } from '../../../types/Profile'

interface ProfileFormProps {
  profileData?: ProfileData;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (values: ProfileFormValues) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData,
  isEditing,
  isLoading,
  onSubmit
}) => {
  const [formValues, setFormValues] = React.useState<ProfileFormValues>({
    name: profileData?.name || '',
    email: profileData?.email || '',
    phoneNumber: profileData?.phoneNumber || ''
  });

  React.useEffect(() => {
    setFormValues({
      name: profileData?.name || '',
      email: profileData?.email || '',
      phoneNumber: profileData?.phoneNumber || '', // Ensure phoneNumber is initialized
      profileImageBase64: undefined
    });
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
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
              value={formValues.name}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white focus-visible:ring-indigo-500"
              required
            />
          ) : (
            <div className="px-3 py-2 rounded-md bg-slate-700/50 border border-slate-600 text-white">
              {profileData?.name || 'Not provided'}
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
              value={formValues.email}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white focus-visible:ring-indigo-500"
              required
            />
          ) : (
            <div className="px-3 py-2 rounded-md bg-slate-700/50 border border-slate-600 text-white">
              {profileData?.email || 'Not provided'}
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
              value={formValues.phoneNumber}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white focus-visible:ring-indigo-500"
            />
          ) : (
            <div className="px-3 py-2 rounded-md bg-slate-700/50 border border-slate-600 text-white">
              {profileData?.phoneNumber || 'Not provided'}
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
              Save Profile Information
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;