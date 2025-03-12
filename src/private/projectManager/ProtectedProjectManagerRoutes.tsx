import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface Props {
  children: JSX.Element;
}

const ProtectedProjectManagerRoutes: React.FC<Props> = ({ children }) => {
  const projectManagerData = useSelector((state: RootState) => state.projectManager.projectManagerData);

  if (!projectManagerData) {
    return <Navigate to="/projectmanager" />;
  }
  return children;
};

export default ProtectedProjectManagerRoutes;