import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Edit, Save } from 'lucide-react';
import Sidebar from '../../components/companyAdmin/Sidebar';
import { updateCompanyAdmin } from '../../redux/slice/CompanyAdminSlice';
import axiosInstance from '../../utils/AxiosConfig';

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

      // Make API call to update profile - using the correct endpoint
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
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] p-6">
        <div className="p-6 bg-gray-800 rounded-lg max-w-2xl mx-auto mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <button 
              onClick={() => isEditing ? handleSubmit({ preventDefault: () => {} } as React.FormEvent) : setIsEditing(true)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : isEditing ? (
                <>
                  <Save size={18} />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit size={18} />
                  <span>Edit</span>
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-md">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-200 rounded-md">
              {successMessage}
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden mb-3 flex items-center justify-center">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  /> 
                ) : (
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    {companyAdminData?.name ? companyAdminData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="cursor-pointer text-blue-400 hover:text-blue-300 text-sm">
                  Change Photo
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange} 
                  />
                </label>
              )}
            </div>
            
            <div className="flex-1 w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ) : (
                    <p className="text-white">{companyAdminData?.name || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ) : (
                    <p className="text-white">{companyAdminData?.email || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white">{companyAdminData?.phoneNumber || 'Not provided'}</p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;