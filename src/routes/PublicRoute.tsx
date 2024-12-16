import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '@/redux/rootReducer';

import { ROUTES } from '.';

interface PublicRouteProps {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.access_token) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }
  return element;
};

export default PublicRoute;
