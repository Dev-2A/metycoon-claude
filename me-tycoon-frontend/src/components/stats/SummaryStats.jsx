import { useEffect, useState } from "react";
import { getSummaryStats } from '../../api/stats';
import ThemedCard from '../common/ThemedCard';

const statsConfig = [
  { key: 'total_quests', label: '완료한 퀘스트', icon: '✅' },
  { key: 'total_exp', label: '누적 경험치', icon: '⚡' },
  { key: 'total_coin_spent', label: '소비한 코인', icon: '💰' },
  { key: 'total_achievements', label: '해금 업적', icon: '🏆' },
];

export default function SummaryStats({ refreshKey }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSummaryStats();
        setStats(data);
      } catch (err) {
        console.error("요약 통계 불러오기 실패:", err);
      }
    };
    fetch();
  }, [refreshKey]);

  if (!stats) return null;

  return (
    <ThemedCard>
      <h2 className="text-xl font-bold mb-4">📦 요약 통계</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statsConfig.map(({ key, label, icon }) => (
          <div
            key={key}
            className="flex flex-col items-center bg-white bg-opacity-40 p-4 rounded shadow-sm"
          >
            <span className="text-3xl">{icon}</span>
            <span className="text-lg font-semibold mt-1">{stats[key]}</span>
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </ThemedCard>
  );
}