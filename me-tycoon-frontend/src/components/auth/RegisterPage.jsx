// src/components/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { register } from '../../services/auth';
import styles from './RegisterPage.module.css';
import buttonStyles from '../../styles/Button.module.css';

const RegisterPage = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await register(username, password);
            if (result.success) {
                setSuccess(result.message);
                setUsername('');
                setPassword('');
                // 3초 후 로그인 페이지로 자동 전환
                setTimeout(() => {
                    onSwitchToLogin();
                }, 3000);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('회원가입 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>회원가입</h1>
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
              <p className={styles.hint}>최소 6자 이상 입력해주세요</p>
            </div>
            {error && (
              <div className={styles.error}>{error}</div>
            )}
            {success && (
              <div className={styles.success}>{success}</div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`${buttonStyles.button} ${buttonStyles.primary} ${isLoading ? buttonStyles.disabled : ''} ${buttonStyles.full}`}
            >
              {isLoading ? '처리 중...' : '회원가입'}
            </button>
          </form>
          <div className={styles.switchLink}>
            <button
              onClick={onSwitchToLogin}
              className={buttonStyles.link}
            >
              이미 계정이 있으신가요? 로그인하기
            </button>
          </div>
        </div>
      </div>
  );
};

export default RegisterPage;