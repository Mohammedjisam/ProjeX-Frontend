import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedAdminRoutes: React.FC<Props> = ({ children }) => {
  const adminData = useSelector((state: RootState) => state.admin.adminData);

  if (!adminData) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedAdminRoutes;
