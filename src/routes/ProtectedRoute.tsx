import type { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/storeHooks';

const ProtectedRoute = (): ReactElement | null => {
  const isAuthenticated = !!useAppSelector((state) => state.auth.accessToken);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
