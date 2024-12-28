import { createContext, useContext } from 'react';
import { AuthService } from './service';

export const AuthServiceContext = createContext<AuthService | null>(null);

export const useAuthService = (): AuthService => {
  const service = useContext(AuthServiceContext);

  if (!service) {
    throw new Error(
      'useAuthService must be used within an AuthServiceProvider'
    );
  }

  return service;
};
