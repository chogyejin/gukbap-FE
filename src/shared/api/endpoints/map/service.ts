import { HttpClient } from '@/shared/api/client';
import { Map, Place, UserPlace } from '@/shared/api/endpoints/map/entities';
import { displaySearchResultMarker } from '@/shared/lib/map';

export interface MapService {
  initializeMap: ({ node }: { node: HTMLDivElement }) => Map;
  searchPlaceList: ({
    map,
    keyword,
  }: {
    map: Map;
    keyword: string;
  }) => Promise<Place[]>;
  getPlaceListByUsers: () => Promise<UserPlace[]>;
}

export const createMapService = ({
  httpClient,
}: {
  httpClient: HttpClient;
}): MapService => ({
  initializeMap: ({ node }) => {
    const kakao = window.kakao;

    const DEFAULT_LAT = 33.450701;
    const DEFAULT_LON = 126.570667;
    const options = {
      center: new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LON),
      level: 12,
    };

    const map = new kakao.maps.Map(node, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }

    const locPosition = new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LAT);
    map.setCenter(locPosition);

    return map;
  },
  searchPlaceList: ({ map, keyword }: { map: Map; keyword: string }) => {
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
  getPlaceListByUsers: async () => {
    return (await httpClient.get<UserPlace[]>('/restaurant')).data;
  },
});
