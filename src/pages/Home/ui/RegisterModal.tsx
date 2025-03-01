import { useId, useState } from 'react';
import styles from './RegisterModal.module.css';
import { PlaceData } from '@/pages/Home/ui/SearchForm';

export const RegisterModal = ({
  place,
  onClose,
}: {
  place: PlaceData;
  onClose: () => void;
}) => {
  const [review, setReview] = useState('');
  const id = useId();
  const textareaId = id + '-review';

  const handleSubmit = () => {
    console.log(place);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <label htmlFor={textareaId}>리뷰 남기기</label>
        <textarea
          id={textareaId}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="리뷰를 남겨주세요."
        />
        <div className={styles.modalButtons}>
          <button onClick={onClose}>취소</button>
          <button>저장</button>
        </div>
      </form>
    </div>
  );
};
