import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedAdminLogin: React.FC<Props> = ({ children }) => {
  const adminData = useSelector((state: RootState) => state.admin.adminData);

  if (adminData) {
    return <Navigate to="/admin/dashboard" />;
  }
  return children;
};

export default ProtectedAdminLogin;