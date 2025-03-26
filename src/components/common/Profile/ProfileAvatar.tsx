// src/pages/companyadmin/profile/components/ProfileAvatar.tsx
import React from 'react';
import { Upload } from 'lucide-react';
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";

interface ProfileAvatarProps {
  isEditing: boolean;
  currentImage?: string;
  previewImage: string | null;
  onImageChange: (file: File, preview: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  isEditing,
  currentImage,
  previewImage,
  onImageChange
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      onImageChange(file, preview);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32 border-4 border-slate-700 shadow-lg">
        {previewImage || currentImage ? (
          <AvatarImage 
            src={previewImage || currentImage} 
            alt="Profile" 
            className="object-cover" 
          />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-3xl font-bold">
            {currentImage ? currentImage.charAt(0).toUpperCase() : 'U'}
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
  );
};

export default ProfileAvatar;