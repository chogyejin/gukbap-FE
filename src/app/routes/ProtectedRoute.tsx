import { isAuthenticated } from '@/shared/lib/auth';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
