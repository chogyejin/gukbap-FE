import { HttpClient } from '@/shared/api/client';

export interface AuthService {
  signIn: (body: {
    username: string;
    password: string;
  }) => Promise<{ token: string }>;
  setAuthToken: (key: string, value: string) => void;
}

export const createAuthService = ({
  httpClient,
}: {
  httpClient: HttpClient;
}): AuthService => ({
  signIn: async (body) => {
    return (
      await httpClient.post<{ token: string }>('/api/v1/users/sign-in', body)
    ).data;
  },
  setAuthToken: () => {},
});
