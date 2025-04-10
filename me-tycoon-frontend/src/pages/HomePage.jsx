import { useProfile } from "../context/ProfileContext";
import ThemedCard from "../components/common/ThemedCard";
import HeatmapChart from "../components/stats/HeatmapChart";
import TierCard from "../components/stats/TierCard";
import QuestList from "../components/quests/QuestList";
import { useState } from "react";

export default function HomePage() {
  const { user, heatmapData } = useProfile();
  const [questRefreshKey, setQuestRefreshKey] = useState(false);

  if (!user) {
    return (
      <ThemedCard>
        <p>🔄 사용자 정보를 불러오는 중입니다...</p>
      </ThemedCard>
    );
  }

  return (
    <div className="space-y-8">
      {/* 상단: 티어 + 히트맵 카드 */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <TierCard level={user.level} experience={user.experience} nextLevelExp={user.next_level_experience} />
        </div>
        <div className="flex-1">
          <HeatmapChart data={heatmapData} />
        </div>
      </div>

      {/* 하단: 퀘스트 목록 */}
      <QuestList 
        refreshKey={questRefreshKey}
        onComplete={() => setQuestRefreshKey(prev => !prev)}
        onDelete={() => setQuestRefreshKey(prev => !prev)}
      />
    </div>
  );
}