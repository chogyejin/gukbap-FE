import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useMapService } from '@/shared/api/endpoints/map/context';
import { Map, Marker, UserPlace } from '@/shared/api/endpoints/map/entities';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mapService.removeMarkers({ markers });

    (async () => {
      const res = await mapService.searchPlaceList({
        map,
        keyword,
        userPlaceList: userPlaceList ?? [],
      });

      setMarkers(res);
    })();
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <button className={styles.searchButton} type="submit">
          검색
        </button>
      </form>
    </div>
  );
};
