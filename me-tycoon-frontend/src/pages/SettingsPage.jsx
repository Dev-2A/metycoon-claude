import ProfileSettings from "../components/settings/ProfileSettings";
import ResetButton from "../components/settings/ResetButton";
import QuestForm from "../components/settings/QuestForm";
import ThemedCard from "../components/common/ThemedCard";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* ✅ 프로필 설정 */}
            <ProfileSettings />

            {/* ✅ 퀘스트 생성 폼 */}
            <ThemedCard>
                <h2 className="text-xl font-bold mb-4">📝 새 퀘스트 생성</h2>
                <QuestForm onQuestCreated={() => alert("🎉 퀘스트가 생성되었습니다!")} />
            </ThemedCard>

            {/* ✅ 상태 초기화 */}
            <ResetButton onReset={() => window.location.reload()} />
        </div>
    )
}