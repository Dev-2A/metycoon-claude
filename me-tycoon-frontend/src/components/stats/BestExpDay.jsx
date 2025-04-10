import { useEffect, useState } from "react";
import { getBestExpDay } from '../../api/stats';
import ThemedCard from '../common/ThemedCard';

export default function BestExpDay({ refreshKey }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getBestExpDay();
        setData(result);
        setError(false);
      } catch (err) {
        console.error("❌ 경험치 최고일 데이터를 불러오는 데 실패했어요:", err);
        setError(true);
      }
    };
    fetch();
  }, [refreshKey]);

  return (
    <ThemedCard>
      <h2 className="text-xl font-bold mb-2">⚡ 경험치 최고일</h2>
      {error || !data ? (
        <p className="text-gray-400">아직 데이터를 불러오는 중입니다...</p>
      ) : data.date ? (
        <p className="text-gray-700">
          <span className="font-semibold text-indigo-600">{data.date}</span> 에{" "}
          <span className="font-bold text-green-600">{data.exp} EXP</span>를 획득했어요!
        </p>
      ) : (
        <p className="text-gray-400">아직 기록이 없어요.</p>
      )}
    </ThemedCard>
  );
}