// src/components/stats/QuestHistoryChart.jsx
import { useEffect, useState } from "react";
import { getQuestHistory } from '../../api/stats';
import ThemedCard from "../common/ThemedCard";

export default function QuestHistoryChart({ refreshKey }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getQuestHistory();
        setData(res);
      } catch (err) {
        console.error("❌ 퀘스트 기록 불러오기 실패:", err);
      }
    };
    fetch();
  }, [refreshKey]);

  if (!data) {
    return (
      <ThemedCard>
        <h2 className="text-lg font-bold mb-2">📅 최근 7일 퀘스트 완료 기록</h2>
        <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
      </ThemedCard>
    );
  }

  return (
    <ThemedCard>
      <h2 className="text-lg font-bold mb-2">📅 최근 7일 퀘스트 완료 기록</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {Object.entries(data).map(([date, count]) => (
          <div key={date}>
            <div className="text-sm text-gray-500">{date.slice(5)}</div>
            <div className="h-20 flex items-end justify-center">
              <div
                className="w-4 bg-blue-500 rounded"
                style={{ height: `${count * 20}px` }}
                title={`${count}개 완료`}
              />
            </div>
            <div className="text-xs mt-1">{count}개</div>
          </div>
        ))}
      </div>
    </ThemedCard>
  );
}