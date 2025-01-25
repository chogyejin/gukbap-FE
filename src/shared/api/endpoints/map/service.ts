import {
  displayCurrentLocationMarker,
  displaySearchResultMarker,
} from '@/shared/lib/map';

export interface MapService {
  initializeMap: ({ node }: { node: HTMLDivElement }) => any;
  getPlaceList: ({ map, keyword }: { map: any; keyword: string }) => void;
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

    ps.keywordSearch(keyword, placesSearchCB);

    const placesSearchCB = (data: any, status: any) => {
      if (status === 'ZERO_RESULT') {
        alert('검색 결과가 없습니다.');
        return;
      }

      if (status !== 'OK') {
        alert('검색할 수 없습니다.');
      }

      const bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displaySearchResultMarker(map, data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      map.setBounds(bounds);
    };
  },
});
