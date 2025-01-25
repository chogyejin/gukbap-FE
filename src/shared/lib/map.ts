export const displayCurrentLocationMarker = (
  map: any,
  locPosition: { La: number; Ma: number },
  message: string
) => {
  // 마커를 생성합니다
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  // 인포윈도우를 생성합니다
  const infowindow = new window.kakao.maps.InfoWindow({
    content: message,
    removable: true,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
};
