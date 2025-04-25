
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// This is just a redirect component that sends users to the proper page based on auth status
const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    document.title = 'PTAMS - Pilgrimage & Travel Agency Management Suite';
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect based on authentication status
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default Index;
