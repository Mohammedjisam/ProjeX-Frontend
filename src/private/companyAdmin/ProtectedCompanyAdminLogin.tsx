import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedCompanyAdminLogin: React.FC<Props> = ({ children }) => {
  const companyAdminData = useSelector((state: RootState) => state.companyAdmin.companyAdminData);

  if (companyAdminData) {
    return <Navigate to="/companyadmin/dashboard" />;
  }
  return children;
};

export default ProtectedCompanyAdminLogin;