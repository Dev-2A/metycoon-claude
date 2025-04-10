import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo, login } from "../api/auth";
import ThemedCard from "../components/common/ThemedCard";
import ThemedButton from "../components/common/ThemedButton";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // JWT 토큰 저장
      const user = await fetchUserInfo(); // 사용자 정보 받아오기

      onLoginSuccess(user); // App에 알림 → 상태 업데이트
      alert("✅ 로그인 성공!");
      navigate("/"); // 홈으로 이동
    } catch (err) {
      alert("❌ 로그인 실패: " + (err.response?.data?.detail || "서버 오류"));
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <ThemedCard as="form" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">🔐 로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
        />
        <ThemedButton type="submit" className="w-full">
          로그인
        </ThemedButton>
      </ThemedCard>
    </div>
  );
}