import SummaryStats from '../components/stats/SummaryStats';
import QuestTypeChart from '../components/stats/QuestTypeChart';
import TopQuests from '../components/stats/TopQuests';
import BestExpDay from '../components/stats/BestExpDay';
import BestCoinDay from '../components/stats/BestCoinDay';
import MonthlyStatsChart from '../components/stats/MonthlyStatsChart';
import QuestHistoryChart from '../components/stats/QuestHistoryChart';

export default function StatsPage({ userStats }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">📊 통계 대시보드</h2>

      <SummaryStats />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <TopQuests />
        <BestExpDay />
        <BestCoinDay />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyStatsChart />
        <QuestHistoryChart />
      </div>

      <div className="mt-8">
        <QuestTypeChart />
      </div>
    </div>
  );
}