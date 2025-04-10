import { useProfile } from "../context/ProfileContext";
import ThemedCard from "../components/common/ThemedCard";
import ThemeShop from "../components/profile/ThemeShop";
import MyRewards from "../components/profile/MyRewards";
import UserTitles from "../components/profile/UserTitles";
import UserAchievements from "../components/profile/UserAchievements";
import ResetButton from "../components/settings/ResetButton";
import ProfileSettings from "../components/settings/ProfileSettings";

export default function ProfilePage() {
  const { user, refreshProfile } = useProfile();

  if (!user) {
    return (
      <ThemedCard>
        <p>🔄 사용자 정보를 불러오는 중입니다...</p>
      </ThemedCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* 내 프로필 */}
      <ThemedCard>
        <h2 className="text-xl font-bold mb-4">👤 내 프로필</h2>
        <div className="mb-2">
          <strong>아이디:</strong> {user.username}
        </div>
        <div className="mb-2">
          <strong>이메일:</strong> {user.email || "등록된 이메일 없음"}
        </div>
      </ThemedCard>

      {/* 보유 칭호 */}
      <UserTitles onChange={refreshProfile} />

      {/* 보유 보상 */}
      <MyRewards />

      {/* 해금 업적 */}
      <UserAchievements />
    </div>
  );
}