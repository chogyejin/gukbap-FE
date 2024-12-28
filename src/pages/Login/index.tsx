import { useState } from 'react';
import styles from './Login.module.css';
import { useAuthService } from '@/shared/api/endpoints/auth/context';

const FORM_FIELD = {
  id: 'id',
  password: 'password',
} as const;

export const Login = () => {
  const authService = useAuthService();
  const [formValues, setFormValues] = useState<{
    id: string;
    password: string;
  }>({
    [FORM_FIELD.id]: '',
    [FORM_FIELD.password]: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>국밥여지도</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.loginInput}
          name={FORM_FIELD.id}
          placeholder="아이디"
          onChange={handleChange}
        />
        <input
          className={styles.loginInput}
          name={FORM_FIELD.password}
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <button className={styles.loginButton}>로그인하기</button>
      </form>
    </div>
  );
};
