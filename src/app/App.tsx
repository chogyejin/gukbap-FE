import { AppRoutes } from '@/app/routes/AppRoutes';
import { Layout } from '@/shared/ui/Layout';
import './styles/reset.css';
import { API_BASE_URL } from '@/shared/api/config';
import { createAuthService } from '@/shared/api/endpoints/auth/service';
import { AuthServiceContext } from '@/shared/api/endpoints/auth/context';
import { createHttpClient } from '@/shared/api/client';
import { MapServiceContext } from '@/shared/api/endpoints/map/context';
import { createMapService } from '@/shared/api/endpoints/map/service';

function App() {
  const httpClient = createHttpClient({ baseURL: API_BASE_URL });
  const authService = createAuthService({ httpClient });
  const mapService = createMapService();

  return (
    <AuthServiceContext.Provider value={authService}>
      <MapServiceContext.Provider value={mapService}>
        <Layout>
          <AppRoutes />
        </Layout>
      </MapServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
}

export default App;
