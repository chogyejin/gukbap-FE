import { AppRoutes } from '@/app/routes/AppRoutes';
import { Layout } from '@/shared/ui/Layout';
import './styles/reset.css';
import { API_BASE_URL } from '@/shared/api/config';
import { createAuthService } from '@/shared/api/endpoints/auth/service';
import { AuthServiceContext } from '@/shared/api/endpoints/auth/context';
import { createHttpClient } from '@/shared/api/client';
import { MapServiceContext } from '@/shared/api/endpoints/map/context';
import { createMapService } from '@/shared/api/endpoints/map/service';
import { getToken, setToken } from '@/shared/lib/storage';
import { useState } from 'react';

const App = () => {
  const [authToken, _setAuthToken] = useState(getToken('token'));

  const httpClient = createHttpClient({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'ngrok-skip-browser-warning': 'true',
    },
  });
  const authService = createAuthService({ httpClient });
  const mapService = createMapService({ httpClient });

  const setAuthToken = (key: string, value: string) => {
    setToken(key, value);
    _setAuthToken(value);
  };

  return (
    <AuthServiceContext.Provider value={{ ...authService, setAuthToken }}>
      <MapServiceContext.Provider value={mapService}>
        <Layout>
          <AppRoutes />
        </Layout>
      </MapServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
};

export default App;
