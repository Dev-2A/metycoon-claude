// src/components/layout/MainLayout.jsx
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ThemedButton from "../common/ThemedButton";

export default function MainLayout({ children, user, onLogout, isLoading }) {
  const { themeClass, themeColor } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  // 테마별 텍스트 색상 조정
  const isDarkTheme = ['dark', 'neon', 'matrix', 'galaxy'].includes(themeColor);
  const textColor = isDarkTheme ? 'text-white' : 'text-gray-800';

  if (isLoading) {
    return (
      <div className={`min-h-screen p-4 ${themeClass} flex items-center justify-center`}>
        <div className="animate-pulse text-xl font-bold">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${themeClass}`}>
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 md:mb-0 ${textColor}`}>
          <Link to="/">🧠 Me Tycoon</Link>
        </h1>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className={`font-semibold ${textColor}`}>👤 {user.username}</span>
              <ThemedButton onClick={onLogout}>로그아웃</ThemedButton>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                로그인
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </header>
      
      {user && (
        <div className="max-w-5xl mx-auto mb-6">
          <nav className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-lg p-2 shadow">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100 dark:hover:bg-blue-900 ' + textColor}`}
            >
              🏠 홈
            </Link>
            <Link 
              to="/shop" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/shop') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100 dark:hover:bg-blue-900 ' + textColor}`}
            >
              🛒 상점
            </Link>
            <Link 
              to="/profile" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/profile') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100 dark:hover:bg-blue-900 ' + textColor}`}
            >
              👤 프로필
            </Link>
            <Link 
              to="/stats" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/stats') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100 dark:hover:bg-blue-900 ' + textColor}`}
            >
              📊 통계
            </Link>
            <Link 
              to="/settings" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/settings') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100 dark:hover:bg-blue-900 ' + textColor}`}
            >
              ⚙️ 설정
            </Link>
          </nav>
        </div>
      )}
      
      <main className="max-w-5xl mx-auto">{children}</main>
    </div>
  );
}