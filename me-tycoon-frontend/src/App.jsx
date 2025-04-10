// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ThemedCard from './components/common/ThemedCard';
import ThemedButton from './components/common/ThemedButton';

// 임시 홈 페이지 컴포넌트
function HomePage() {
  return (
    <div>
      <ThemedCard>
        <h2 className="text-xl font-bold">홈페이지</h2>
        <p>Me Tycoon에 오신 것을 환영합니다!</p>
      </ThemedCard>
      
      <ThemedCard>
        <h2 className="text-xl font-bold">퀘스트 목록</h2>
        <ul className="space-y-2 mt-4">
          <li className="p-2 bg-gray-50 rounded">일일 퀘스트 1: 물 2L 마시기</li>
          <li className="p-2 bg-gray-50 rounded">일일 퀘스트 2: 30분 독서하기</li>
          <li className="p-2 bg-gray-50 rounded">주간 퀘스트: 주 3회 운동하기</li>
        </ul>
        <ThemedButton className="mt-4">퀘스트 완료</ThemedButton>
      </ThemedCard>
    </div>
  );
}

// 앱 컴포넌트
export default function App() {
  const [theme, setTheme] = useState('classic');
  
  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 p-4 theme-${theme}`}>
        <header className="max-w-4xl mx-auto mb-6">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Me Tycoon</h1>
            <nav className="space-x-4">
              <Link to="/" className="text-blue-500 hover:underline">홈</Link>
              <Link to="/shop" className="text-blue-500 hover:underline">상점</Link>
              <Link to="/profile" className="text-blue-500 hover:underline">프로필</Link>
            </nav>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<div>상점 페이지</div>} />
            <Route path="/profile" element={<div>프로필 페이지</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}