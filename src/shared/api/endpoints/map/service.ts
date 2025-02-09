import { Place } from '@/shared/api/endpoints/map/entities';
import {
  displayCurrentLocationMarker,
  displaySearchResultMarker,
} from '@/shared/lib/map';

export interface MapService {
  initializeMap: ({ node }: { node: HTMLDivElement }) => any;
  getPlaceList: ({
    map,
    keyword,
  }: {
    map: any;
    keyword: string;
  }) => Promise<Place[]>;
}

export const createMapService = (): MapService => ({
  initializeMap: ({ node }) => {
    const kakao = window.kakao;

    const DEFAULT_LAT = 33.450701;
    const DEFAULT_LON = 126.570667;
    const options = {
      center: new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LON),
      level: 3,
    };

    const map = new kakao.maps.Map(node, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon);
        displayCurrentLocationMarker(map, locPosition, '현 위치');
      });
    }
    const locPosition = new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LAT);
    displayCurrentLocationMarker(map, locPosition, '현 위치');

    return map;
  },
  getPlaceList: ({ map, keyword }: { map: any; keyword: string }) => {
    const ps = new window.kakao.maps.services.Places();

    return new Promise((resolve, reject) => {
      const placesSearchCB = (data: Place[], status: 'ZERO_RESULT' | 'OK') => {
        if (status === 'ZERO_RESULT') {
          alert('검색 결과가 없습니다.');
          resolve([]);
          return;
        }

        if (status !== 'OK') {
          alert('오류가 발생했습니다.');
          reject(new Error('오류가 발생했습니다.'));
          return;
        }

        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displaySearchResultMarker(map, data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        resolve(data);
      };

      ps.keywordSearch(keyword, placesSearchCB);
    });
  },
});
