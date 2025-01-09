import { HttpClient } from '@/shared/api/client';

export interface AuthService {
  signIn: (body: {
    username: string;
    password: string;
  }) => Promise<{ token: string }>;
}

export const createAuthService = ({
  httpClient,
}: {
  httpClient: HttpClient;
}): AuthService => ({
  signIn: async (body) => {
    return (await httpClient.post<{ token: string }>('/users/sign-in', body))
      .data;
  },
});
