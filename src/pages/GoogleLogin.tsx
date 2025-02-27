import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginComponentProps {
  role: 'admin' | 'companyAdmin' | 'manager' | 'projectManager' | 'developer';
}

const GoogleLoginComponent: React.FC<GoogleLoginComponentProps> = ({ role }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Google login response:', credentialResponse);
      
      // Send the credential token and role to your backend
      const response = await axios.post('http://localhost:5000/api/auth/google/token', {
        credential: credentialResponse.credential,
        role: role, // Pass the role from props
      });

      console.log('Google authentication successful:', response.data);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.data.user.role === 'companyAdmin') {
        navigate('/company/dashboard');
      } else if (response.data.user.role === 'manager') {
        navigate('/manager/dashboard');
      } else if (response.data.user.role === 'projectManager') {
        navigate('/project-manager/dashboard');
      } else if (response.data.user.role === 'developer') {
        navigate('/developer/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.response?.data?.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div>
      <div className="google-login-container my-3">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          useOneTap
          logo_alignment="center"
          text="continue_with"
          shape="rectangular"
        />
      </div>
      
      {loading && <p className="text-center">Authenticating...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default GoogleLoginComponent;