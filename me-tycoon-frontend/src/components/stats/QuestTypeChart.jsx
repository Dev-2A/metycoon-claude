import { useEffect, useState } from "react";
import { getQuestTypeStats } from "../../api/stats";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, Legend
} from "recharts";
import ThemedCard from "../common/ThemedCard";
import ThemedButton from "../common/ThemedButton";
import clsx from "clsx";

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444']; // daily, weekly, monthly, event

export default function QuestTypeChart({ refreshKey }) {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("bar");

  useEffect(() => {
    const fetch = async () => {
      const res = await getQuestTypeStats();
      const formatted = Object.entries(res).map(([type, count]) => ({
        name: type,
        type,
        value: count,
        count: count,
      }));
      setData(formatted);
    };
    fetch();
  }, [refreshKey]);

  if (data.length === 0) return null;

  return (
    <ThemedCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📂 퀘스트 유형별 통계</h2>
        <div className="flex gap-2">
          <ThemedButton
            size="sm"
            onClick={() => setMode("bar")}
            className={clsx(mode === "bar" ? "bg-indigo-500 text-white" : "bg-gray-200")}
          >
            막대 차트
          </ThemedButton>
          <ThemedButton
            size="sm"
            onClick={() => setMode("pie")}
            className={clsx(mode === "pie" ? "bg-indigo-500 text-white" : "bg-gray-200")}
          >
            원형 차트
          </ThemedButton>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {mode === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" name="완료 수" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </ThemedCard>
  );
}