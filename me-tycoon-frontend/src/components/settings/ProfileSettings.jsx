import { useState } from "react";
import { changePassword, updateProfile } from "../../api/auth";
import { useProfile } from "../../context/ProfileContext";
import ThemedCard from "../common/ThemedCard";
import ThemedButton from "../common/ThemedButton";

export default function ProfileSettings() {
    const { user, refreshProfile } = useProfile();

    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({ email });
            alert("✅ 이메일이 업데이트되었습니다!");
            refreshProfile();
        } catch (err) {
            alert("❌ 이메일 업데이트 실패: " + (err.response?.data?.error || "알 수 없는 오류"));
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await changePassword(currentPassword, newPassword);
            alert("✅ 비밀번호가 변경되었습니다!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            alert("❌ 비밀번호 변경 실패: " + (err.response?.data?.error || "알 수 없는 오류"));
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">⚙️ 프로필 설정</h2>

            {/* 이메일 변경 */}
            <ThemedCard as="form" onSubmit={handleEmailUpdate}>
                <h3 className="font-semibold mb-2">이메일 변경</h3>
                <input
                    type="email"
                    placeholder="새 이메일 주소"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <ThemedButton type="submit" className="w-full">
                    이메일 변경
                </ThemedButton>
            </ThemedCard>

            {/* 비밀번호 변경 */}
            <ThemedCard as="form" onSubmit={handlePasswordChange} className="mt-4">
                <h3 className="font-semibold mb-2">비밀번호 변경</h3>
                <input
                    type="password"
                    placeholder="현재 비밀번호"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                />
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                />
                <ThemedButton type="submit" className="w-full">
                    비밀번호 변경
                </ThemedButton>
            </ThemedCard>
        </div>
    );
}