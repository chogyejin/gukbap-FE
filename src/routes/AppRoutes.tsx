import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router';

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
        <Route path="*" element={<>에러!</>} />
      </Routes>
    </BrowserRouter>
  );
};
