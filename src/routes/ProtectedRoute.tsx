import { Navigate } from 'react-router';
import { isAuthenticated } from '../services/auth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
