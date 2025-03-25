// src/pages/companyadmin/profile/components/EditButton.tsx
import React from 'react';
import { Edit, Save, Loader2 } from 'lucide-react';
import { Button } from "../../ui/button";

interface EditButtonProps {
  isEditing: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  isEditing, 
  isLoading, 
  onToggle 
}) => {
  return (
    <Button 
      onClick={onToggle}
      disabled={isLoading}
      variant={isEditing ? "default" : "outline"}
      className={`flex items-center gap-2 ${
        isEditing 
          ? "bg-emerald-600 hover:bg-emerald-700" 
          : "border-slate-600 text-slate-200"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : isEditing ? (
        <>
          <Save size={18} />
          <span>Save Changes</span>
        </>
      ) : (
        <>
          <Edit size={18} />
          <span>Edit Profile</span>
        </>
      )}
    </Button>
  );
};

export default EditButton;