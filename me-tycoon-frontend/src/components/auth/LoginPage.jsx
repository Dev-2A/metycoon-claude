import React, { useState } from 'react';
import { getUserInfo, login } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = ({ onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser, setIsAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await login(username, password);
            if (result.success) {
                const userInfo = await getUserInfo();
                setUser(userInfo);
                setIsAuthenticated(true);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Me Tycoon</h1>
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
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-900 rounded-lg text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={onSwitchToRegister}
                className="text-blue-400 hover:underline text-sm"
              >
                계정이 없으신가요? 회원가입하기
              </button>
            </div>
          </div>
        </div>
      );
};

export default LoginPage;