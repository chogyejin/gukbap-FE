import { PlaceData } from '@/pages/Home/ui/SearchForm';
import { Map, Place } from '@/shared/api/endpoints/map/entities';

export const displaySearchResultMarker = (
  map: Map,
  place: Place,
  onPlaceClick: (place: PlaceData) => void
) => {
  const infowindow = new window.kakao.maps.InfoWindow({
    zIndex: 100,
    removable: true,
  });

  const marker = new window.kakao.maps.Marker({
    map,
    position: new window.kakao.maps.LatLng(place.y, place.x),
  });

  window.kakao.maps.event.addListener(marker, 'click', () => {
    const id = place.x + place.y;
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;min-height:60px;max-height:100px;width:180px">' +
        '<div>' +
        place.place_name +
        '</div>' +
        '<div>' +
        place.road_address_name +
        '</div>' +
        '<div style="height:30px;display:flex;justify-content:center">' +
        `<button id="${id}" style="padding:8px;display:flex;align-items:center">` +
        '리뷰등록하기' +
        '</button>' +
        '</div>' +
        '</div>'
    );
    infowindow.open(map, marker);
    document.getElementById(id)?.addEventListener('click', () =>
      onPlaceClick({
        placeId: place.id,
        x: place.x,
        y: place.y,
        name: place.place_name,
      })
    );
  });

  return marker;
};
