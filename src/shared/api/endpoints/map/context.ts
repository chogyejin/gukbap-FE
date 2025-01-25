import { createContext, useContext } from 'react';
import { MapService } from './service';

export const MapServiceContext = createContext<MapService | null>(null);

export const useMapService = (): MapService => {
  const service = useContext(MapServiceContext);

  if (!service) {
    throw new Error('useMapService must be used within an MapServiceProvider');
  }

  return service;
};
