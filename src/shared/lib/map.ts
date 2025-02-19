import { Map, Place } from '@/shared/api/endpoints/map/entities';

export const displaySearchResultMarker = (map: Map, place: Place) => {
  const infowindow = new window.kakao.maps.InfoWindow({
    zIndex: 100,
    removable: true,
  });

  const marker = new window.kakao.maps.Marker({
    map,
    position: new window.kakao.maps.LatLng(place.y, place.x),
  });

  window.kakao.maps.event.addListener(marker, 'click', () => {
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' +
        '<div>' +
        place.place_name +
        '<div>' +
        '<div>' +
        place.road_address_name +
        '<div>' +
        '</div>'
    );
    infowindow.open(map, marker);
  });

  return marker;
};
