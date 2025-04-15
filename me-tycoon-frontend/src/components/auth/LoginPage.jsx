// src/components/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginPage.module.css';
import buttonStyles from '../../styles/Button.module.css';

const LoginPage = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // 직접 AuthContext의 login 함수 사용
      const success = await login(username, password);

      if (!success) {
        setError('로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Me Tycoon</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>사용자 이름</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          {error && (
            <div className={styles.error}>{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`${buttonStyles.button} ${buttonStyles.primary} ${isLoading ? buttonStyles.disabled : ''} ${buttonStyles.full}`}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className={styles.switchLink}>
          <button
            onClick={onSwitchToRegister}
            className={buttonStyles.link}
          >
            계정이 없으신가요? 회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;