import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './LoginPage.module.css';
import { useAuthService } from '@/shared/api/endpoints/auth/context';

const FORM_FIELD = {
  id: 'id',
  password: 'password',
} as const;

export const LoginPage = () => {
  const authService = useAuthService();
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, password } = formValues;

    if (!id || !password) {
      return;
    }

    try {
      const { token } = await authService.signIn({
        username: id,
        password: password,
      });
      authService.setAuthToken('token', token);
      navigate('/');
    } catch (e) {
      let message = 'Unknown Error';
      if (e instanceof Error) {
        message = e.message;
      }
      alert(message);
    }
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
          autoComplete="username"
        />
        <input
          className={styles.loginInput}
          name={FORM_FIELD.password}
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className={styles.loginButton}>로그인하기</button>
      </form>
    </div>
  );
};
