import { useEffect, useState } from "react";
import { getMonthlyStats } from '../../api/stats';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ThemedCard from "../common/ThemedCard";

export default function MonthlyStatsChart({ refreshKey }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const stats = await getMonthlyStats();
        if (Array.isArray(stats)) {
          setData(stats);
        }
      } catch (err) {
        console.error("📉 월간 통계 불러오기 실패:", err);
      }
    };
    fetch();
  }, [refreshKey]);

  if (!data || data.length === 0) {
    return (
      <ThemedCard>
        <h2 className="text-xl font-bold mb-4">📈 최근 30일 성장 통계</h2>
        <p className="text-gray-500">아직 데이터가 없습니다.</p>
      </ThemedCard>
    );
  }

  return (
    <ThemedCard>
      <h2 className="text-xl font-bold mb-4">📈 최근 30일 성장 통계</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quests_completed" stroke="#6366f1" name="퀘스트 완료 수" />
          <Line type="monotone" dataKey="exp_gained" stroke="#10b981" name="경험치 획득량" />
          <Line type="monotone" dataKey="coin_gained" stroke="#f59e0b" name="코인 획득량" />
        </LineChart>
      </ResponsiveContainer>
    </ThemedCard>
  );
}