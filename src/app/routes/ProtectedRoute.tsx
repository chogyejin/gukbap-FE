import { isAuthenticated } from '@/shared/lib/storage';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated('token') ? children : <Navigate replace to="/login" />;
};
