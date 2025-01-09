import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
