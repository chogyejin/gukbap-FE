import { AppRoutes } from '@/app/routes/AppRoutes';
import { Layout } from '@/shared/ui/Layout';
import './styles/reset.css';
import { createClient } from '@/shared/api/client';
import { API_BASE_URL } from '@/shared/api/config';
import { createAuthService } from '@/shared/api/endpoints/auth/service';
import { AuthServiceContext } from '@/shared/api/endpoints/auth/context';

function App() {
  const httpClient = createClient({ baseURL: API_BASE_URL });
  const authService = createAuthService({ httpClient });

  return (
    <AuthServiceContext.Provider value={authService}>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthServiceContext.Provider>
  );
}

export default App;
