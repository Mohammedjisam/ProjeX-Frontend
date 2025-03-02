import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedProjectManagerLogin: React.FC<Props> = ({ children }) => {
  const projectManagerData = useSelector((state: RootState) => state.projectManager.projectManagerData);

  if (projectManagerData) {
    return <Navigate to="/project-manager/dashboard" />;
  }
  return children;
};

export default ProtectedProjectManagerLogin;
