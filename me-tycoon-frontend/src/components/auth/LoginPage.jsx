// import React, { useState } from 'react';
// import { getUserInfo, login } from '../../services/auth';
// import { useAuth } from '../../contexts/AuthContext';

// const LoginPage = ({ onSwitchToRegister }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const { setUser, setIsAuthenticated } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             const result = await login(username, password);
//             if (result.success) {
//                 const userInfo = await getUserInfo();
//                 setUser(userInfo);
//                 setIsAuthenticated(true);
//             } else {
//                 setError(result.message);
//             }
//         } catch (error) {
//             setError('로그인 중 오류가 발생했습니다.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
//             <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Me Tycoon</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium">사용자 이름</label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full p-3 bg-gray-700 rounded-lg text-white"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label className="block mb-2 text-sm font-medium">비밀번호</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 bg-gray-700 rounded-lg text-white"
//                   required
//                 />
//               </div>
//               {error && (
//                 <div className="mb-4 p-3 bg-red-900 rounded-lg text-sm">{error}</div>
//               )}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
//               >
//                 {isLoading ? '로그인 중...' : '로그인'}
//               </button>
//             </form>
//             <div className="mt-4 text-center">
//               <button
//                 onClick={onSwitchToRegister}
//                 className="text-blue-400 hover:underline text-sm"
//               >
//                 계정이 없으신가요? 회원가입하기
//               </button>
//             </div>
//           </div>
//         </div>
//       );
// };

// export default LoginPage;

import React, { useState } from 'react';

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await onLogin(username, password);
      if (!success) {
        setError('로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하세요.');
      }
    } catch (error) {
      setError('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #121212, #1a237e)',
    padding: '20px'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#3f51b5'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2c2c2c',
    border: '1px solid #444',
    borderRadius: '4px',
    color: 'white',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: '0.7',
    cursor: 'not-allowed'
  };

  const errorStyle = {
    padding: '10px',
    backgroundColor: 'rgba(211, 47, 47, 0.2)',
    border: '1px solid #d32f2f',
    borderRadius: '4px',
    color: '#f44336',
    marginBottom: '20px',
    fontSize: '14px'
  };

  const linkStyle = {
    marginTop: '15px',
    textAlign: 'center'
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#7986cb',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Me Tycoon</h1>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>사용자 이름</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          {error && (
            <div style={errorStyle}>{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            style={isLoading ? disabledButtonStyle : buttonStyle}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div style={linkStyle}>
          <button
            onClick={onSwitchToRegister}
            style={linkButtonStyle}
          >
            계정이 없으신가요? 회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;