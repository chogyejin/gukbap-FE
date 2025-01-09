import { useState } from 'react';
import styles from './SearchForm.module.css';

export const SearchForm = () => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('검색');
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
