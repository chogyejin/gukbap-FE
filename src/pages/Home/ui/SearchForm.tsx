import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useMapService } from '@/shared/api/endpoints/map/context';

export const SearchForm = ({ map }: { map: any }) => {
  const [keyword, setKeyword] = useState('');
  const mapService = useMapService();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mapService.getPlaceList({ map, keyword });
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
