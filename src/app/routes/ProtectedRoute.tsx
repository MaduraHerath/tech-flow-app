import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { decodeJWT } from '../../util/generateFakeJWT';

// Example helpers to get auth token and user role.
// Replace with your real auth logic (e.g., context, redux, JWT decode).
const getAuthToken = (): string | null => localStorage.getItem('token');

export function getUserRole(): string | null {
  const token = getAuthToken();
  if (!token) return null;

  const decoded = decodeJWT(token);
  return decoded?.role ?? null;
}

type ProtectedRouteProps = {
  allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const token = getAuthToken();
  const userRole = getUserRole();

  if (!token) {
    // Not logged in: redirect to login, preserve attempted location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log(userRole)
    // Logged in but unauthorized role
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
