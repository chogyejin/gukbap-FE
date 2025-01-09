import { useEffect, useRef } from 'react';
import styles from './Home.module.css';
import { displayMarker } from '@/shared/lib/map';

export const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakao = window.kakao;
    const container = mapRef.current;

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        displayMarker(map, locPosition, '현 위치');
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

      displayMarker(map, locPosition, '현 위치');
    }
  }, []);

  return <div ref={mapRef} className={styles.map} />;
};
