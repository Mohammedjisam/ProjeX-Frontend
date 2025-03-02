import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedDeveloperRoutes: React.FC<Props> = ({ children }) => {
  const developerData = useSelector((state: RootState) => state.developer.developerData);

  if (!developerData) {
    return <Navigate to="/developer" />;
  }
  return children;
};

export default ProtectedDeveloperRoutes;