import { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.css';
import { SearchForm } from './SearchForm';
import { useMapService } from '@/shared/api/endpoints/map/context';

export const HomePage = () => {
  const mapService = useMapService();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState();

  useEffect(() => {
    const container = mapRef.current;
    if (!container) {
      return;
    }

    const map = mapService.initializeMap({ node: container });
    setMap(map);
  }, [mapService]);

  return (
    <>
      <SearchForm map={map} />
      <div ref={mapRef} className={styles.map} />
    </>
  );
};
