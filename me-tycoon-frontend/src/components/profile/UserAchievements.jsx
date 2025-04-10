import { useEffect, useState, useRef } from "react";
import { getUserAchievements } from "../../api/achievements";
import ThemedCard from "../common/ThemedCard";
import AchievementUnlockEffect from "../effects/AchievementUnlockEffect";

export default function UserAchievements({ refreshKey }) {
  const [achievements, setAchievements] = useState([]);
  const[unlockedAchievements, setUnlockedAchievements] = useState([]);
  const prevAchievementsRef = useRef([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getUserAchievements();
        setAchievements(data);

        // 업적 새로 해금됐는지 확인
        const prevUnlockedIds = prevAchievementsRef.current.map(a => a.id);
        const newUnlocked = data.filter(a => !prevUnlockedIds.includes(a.id));

        if (newUnlocked.length > 0) {
          setUnlockedAchievements(newUnlocked.map(a => a.achievement.name));
        }

        prevAchievementsRef.current = data;
      } catch (err) {
        console.error("🏆 업적 불러오기 실패:", err);
      }
    };

    fetchAchievements();
  }, [refreshKey]);

  const handleEffectComplete = (achievementName) => {
    setUnlockedAchievements(prev => prev.filter(name => name !== achievementName));
  };

  if (achievements.length === 0) return null;

  return (
    <div className="mb-8 relative">
      {unlockedAchievements.map((name) => (
        <AchievementUnlockEffect
          key={name}
          achievement={name}
          onComplete={() => handleEffectComplete(name)}
        />
      ))}

      <h2 className="text-xl font-bold mb-2">🏆 해금한 업적</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((entry) => (
          <ThemedCard key={entry.id}>
            <div className="font-bold text-lg">{entry.achievement.name}</div>
            <div className="text-sm text-gray-600">{entry.achievement.description}</div>
            <div className="text-xs text-gray-400 mt-1">
              해금일: {new Date(entry.unlocked_at).toLocaleString()}
            </div>
          </ThemedCard>
        ))}
      </ul>
    </div>
  );
}