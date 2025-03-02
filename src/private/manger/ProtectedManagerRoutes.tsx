import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedManagerRoutes: React.FC<Props> = ({ children }) => {
  const managerData = useSelector((state: RootState) => state.manager.managerData);

  if (!managerData) {
    return <Navigate to="/manager" />;
  }
  return children;
};

export default ProtectedManagerRoutes;