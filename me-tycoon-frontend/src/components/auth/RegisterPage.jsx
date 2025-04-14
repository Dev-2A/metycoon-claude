import React, { useState } from 'react';
import { register } from '../../services/auth';

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
                setTimeout(() => {
                    onSwitchToLogin();
                }, 2000);
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">회원가입</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">사용자 이름</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  required
                />
                <p className="mt-1 text-sm text-gray-400">최소 6자 이상 입력해주세요</p>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-900 rounded-lg text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-900 rounded-lg text-sm">{success}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading ? '처리 중...' : '회원가입'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:underline text-sm"
          >
            이미 계정이 있으신가요? 로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;