import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import ThemedCard from "../components/common/ThemedCard";
import ThemedButton from "../components/common/ThemedButton";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register/", { username, password });

      alert("🎉 회원가입 성공!");
      navigate("/login"); 
    } catch (err) {
      const errorMsg = err.response?.data?.error || "알 수 없는 오류가 발생했습니다.";
      alert("❌ 회원가입 실패: " + errorMsg);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <ThemedCard as="form" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4">회원가입</h2>
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
          회원가입
        </ThemedButton>
      </ThemedCard>
    </div>
  );
}