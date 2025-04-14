import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
    getWeeklyQuestHistory,
    getMonthlyStats,
    getQuestTypeStats,
    getTopQuests,
    getSummaryStats
} from '../../services/stats';
import StatChart from './StatChart';

const StatsPage = ({ onNavigate }) => {
    const [weeklyHistory, setWeeklyHistory] = useState(null);
    const [monthlyStats, setMonthlyStats] = useState(null);
    const [questTypeStats, setQuestTypeStats] = useState(null);
    const [topQuests, setTopQuests] = useState(null);
    const [summaryStats, setSummaryStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setIsLoading(true);

            const [
                weeklyData,
                monthlyData,
                typeData,
                topQuestsData,
                summaryData
            ] = await Promise.all([
                getWeeklyQuestHistory(),
                getMonthlyStats(),
                getQuestTypeStats(),
                getTopQuests(),
                getSummaryStats()
            ]);

            setWeeklyHistory(weeklyData);
            setMonthlyStats(monthlyData);
            setQuestTypeStats(typeData);
            setTopQuests(topQuestsData);
            setSummaryStats(summaryData);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setIsLoading(false);
        }
    };

    // 주간 기록을 차트 데이터로 변환
    const getWeeklyChartData = () => {
        if (!weeklyHistory) return [];

        return Object.entries(weeklyHistory).map(([date, count]) => ({
            date: new Date(date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
            count
        }));
    };

    // 퀘스트 타입별 통계를 차트 데이터로 변환
    const getQuestTypeChartData = () => {
        if (!questTypeStats) return [];

        return Object.entries(questTypeStats).map(([typeKey, typeValue]) => {
            const typeLabels = {
                'daily': '일일',
                'weekly': '주간',
                'monthly': '월간',
                'event': '이벤트'
            };

            return {
                type: typeLabels[typeKey] || typeKey,
                count: typeValue
            };
        });
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">통계</h2>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400">
                    <X size={24} />
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-4">로딩 중...</div>
            ) : (
                <div className="space-y-6">
                    {/* 요약 통계 */}
                    {summaryStats && (
                        <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                            <h3 className="text-xl font-bold mb-4">총 통계</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-400">완료한 퀘스트</p>
                                    <p className="text-2xl font-bold">{summaryStats.total_quests}</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-400">획득한 경험치</p>
                                    <p className="text-2xl font-bold">{summaryStats.total_exp}</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-400">사용한 코인</p>
                                    <p className="text-2xl font-bold">{summaryStats.coin_spent}</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-400">획득한 업적</p>
                                    <p className="text-2xl font-bold">{summaryStats.total_achievements}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 주간 완료 기록 */}
                    {weeklyHistory && (
                        <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                            <h3 className="text-xl font-bold mb-4">주간 퀘스트 완료</h3>
                            <StatChart
                                data={getWeeklyChartData()}
                                xKey="date"
                                yKey="count"
                                barColor="#3B82F6"
                            />
                        </div>
                    )}

                    {/* 퀘스트 타입별 통계 */}
                    {questTypeStats && (
                        <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                            <h3 className="text-xl font-bold mb-4">퀘스트 타입별 완료</h3>
                            <StatChart
                                data={getQuestTypeChartData()}
                                xKey="type"
                                yKey="count"
                                barColor="#8B5CF6"
                            />
                        </div>
                    )}

                    {/* 최다 완료 퀘스트 */}
                    {topQuests && topQuests.length > 0 &&(
                        <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                            <h3 className="text-xl font-bold mb-4">최다 완료 퀘스트</h3>
                            <div className="space-y-3">
                                {topQuests.map((quest, index) => (
                                    <div key={index} className="bg-gray-700 p-3 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">{quest.title}</h4>
                                            <span className="bg-blue-900 px-2 py-1 rounded text-sm">{quest.count}회</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatsPage;