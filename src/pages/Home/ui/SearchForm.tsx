import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useMapService } from '@/shared/api/endpoints/map/context';
import { Map, Marker, UserPlace } from '@/shared/api/endpoints/map/entities';
import { RegisterModal } from '@/pages/Home/ui/RegisterModal';

export type PlaceData = {
  placeId: string;
  x: string;
  y: string;
  name: string;
} | null;

type SelectedPlace = {
  isModalOpen: boolean;
  data: PlaceData;
};

export const SearchForm = ({
  map,
  userPlaceList,
}: {
  map: Map;
  userPlaceList: UserPlace[] | undefined;
}) => {
  const mapService = useMapService();
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace>({
    isModalOpen: false,
    data: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mapService.removeMarkers({ markers });

    (async () => {
      const res = await mapService.searchPlaceList({
        map,
        keyword,
        userPlaceList: userPlaceList ?? [],
        onPlaceClick: (place: PlaceData) => {
          setSelectedPlace({
            isModalOpen: true,
            data: place,
          });
        },
      });

      setMarkers(res);
    })();
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <button className={styles.searchButton} type="submit">
            검색
          </button>
        </form>
      </div>
      {selectedPlace.isModalOpen && selectedPlace.data && (
        <RegisterModal
          place={selectedPlace.data}
          onClose={() =>
            setSelectedPlace({ ...selectedPlace, isModalOpen: false })
          }
        />
      )}
    </>
  );
};
