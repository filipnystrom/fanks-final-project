import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth0();
  if (!user && !isLoading) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;