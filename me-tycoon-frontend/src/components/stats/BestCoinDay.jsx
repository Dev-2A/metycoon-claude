import { useEffect, useState } from "react";
import { getBestCoinSpentDay } from '../../api/stats';
import ThemedCard from '../common/ThemedCard';

export default function BestCoinDay({ refreshKey }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getBestCoinSpentDay();
        setData(result);
        setError(false);
      } catch (error) {
        console.error("❌ 코인 최고일 데이터를 불러오는 데 실패했어요:", error);
        setError(true);
      }
    };
    fetch();
  }, [refreshKey]);

  return (
    <ThemedCard>
      <h2 className="text-xl font-bold mb-2">💰 코인 소비 최고일</h2>
      {error || !data ? (
        <p className="text-gray-400">아직 데이터를 불러오는 중입니다...</p>
      ) : data.date ? (
        <p className="text-gray-700">
          <span className="font-semibold text-indigo-600">{data.date}</span> 에{' '}
          <span className="font-bold text-yellow-600">{data.coin} 코인</span>을 소비했어요!
        </p>
      ) : (
        <p className="text-gray-400">아직 보상을 구매한 기록이 없어요.</p>
      )}
    </ThemedCard>
  );
}