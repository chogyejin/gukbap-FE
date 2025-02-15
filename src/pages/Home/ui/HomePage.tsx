import { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.css';
import { SearchForm } from './SearchForm';
import { useMapService } from '@/shared/api/endpoints/map/context';
import { Map } from '@/shared/api/endpoints/map/entities';

export const HomePage = () => {
  const mapService = useMapService();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const container = mapRef.current;
    if (!container) {
      return;
    }

    const map = mapService.initializeMap({ node: container });
    setMap(map);
  }, [mapService]);

  useEffect(() => {
    if (!map) {
      return;
    }

    (async () => {
      const res = await mapService.getPlaceListByUsers();
      mapService.displayPlaceListByUsers({ map, placeList: res });
    })();
  }, [map, mapService]);

  return (
    <>
      <div ref={mapRef} className={styles.map} />
      {map && <SearchForm map={map} />}
    </>
  );
};
