import { useEffect, useState } from "react";
import { getTopQuests } from '../../api/stats';
import ThemedCard from "../common/ThemedCard";

export default function TopQuests({ refreshKey }) {
  const [top, setTop] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTopQuests();
        setTop(data);
      } catch (err) {
        console.error("🔥 Top 퀘스트 불러오기 실패:", err);
      }
    };
    fetch();
  }, [refreshKey]);

  if (top.length === 0) return null;

  const medalEmojis = ['🥇', '🥈', '🥉'];

  return (
    <ThemedCard>
      <h2 className="text-xl font-bold mb-4">🏅 가장 많이 완료한 퀘스트 TOP3</h2>
      <ul className="space-y-2">
        {top.map((entry, index) => (
          <li key={entry.title} className="flex items-center">
            <span className="text-2xl mr-3">{medalEmojis[index]}</span>
            <span className="flex-1 text-lg">{entry.title}</span>
            <span className="text-sm text-gray-600">({entry.count}회)</span>
          </li>
        ))}
      </ul>
    </ThemedCard>
  );
}