import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getTokenFromAS } from '@/utils/localStorage';

import { PUBLIC_ROUTES } from '.';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  const redirectPath = location.pathname;
  const token = getTokenFromAS();
  if (!token) {
    return (
      <Navigate to={PUBLIC_ROUTES.SIGNIN} state={{ from: redirectPath }} />
    );
  }
  return <div>{element}</div>;
};

export default ProtectedRoute;
