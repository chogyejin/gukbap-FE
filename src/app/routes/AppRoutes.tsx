import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { HomePage } from '@/pages/Home/ui/HomePage';
import { LoginPage } from '@/pages/Login/ui/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
