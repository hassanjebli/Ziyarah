
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = ['admin', 'staff', 'readonly'] }: ProtectedRouteProps) => {
  const { isAuthenticated, hasPermission, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasPermission(allowedRoles)) {
    // Redirect to unauthorized page if not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
