/**
 * Protected Route Component
 * Purpose: Wrapper for routes that require authentication
 * Redirects to login if user is not authenticated
 */

import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  // TODO: Replace with real auth check from AuthContext
  const isAuthenticated = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('user_role'); // TODO: Get from JWT token

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoute = userRole === 'lecturer' ? ROUTES.LECTURER_DASHBOARD : ROUTES.STUDENT_DASHBOARD;
    return <Navigate to={dashboardRoute} replace />;
  }

  return children;
};

export default ProtectedRoute;
