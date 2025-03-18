import { useId, useState } from 'react';
import styles from './RegisterModal.module.css';
import { PlaceData } from '@/pages/Home/ui/SearchForm';
import { useMapService } from '@/shared/api/endpoints/map/context';

export const RegisterModal = ({
  place,
  onClose,
  onSaveSuccess,
}: {
  place: NonNullable<PlaceData>;
  onClose: () => void;
  onSaveSuccess: () => void;
}) => {
  const [review, setReview] = useState('');
  const id = useId();
  const textareaId = id + '-review';
  const mapService = useMapService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isSuccess } = await mapService.saveReview({ ...place, review });

    if (!isSuccess) {
      alert('리뷰 등록에 실패했어요.');
      return;
    }

    onSaveSuccess();
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
          autoFocus
        />
        <div className={styles.modalButtons}>
          <button onClick={onClose}>취소</button>
          <button>저장</button>
        </div>
      </form>
    </div>
  );
};
