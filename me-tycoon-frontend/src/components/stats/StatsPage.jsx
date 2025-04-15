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
import styles from './StatsPage.module.css';

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
        if (!weeklyHistory || Object.keys(weeklyHistory).length === 0) return [];

        return Object.entries(weeklyHistory).map(([date, count]) => ({
            date: new Date(date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
            count: count || 0
        }));
    };

    // 퀘스트 타입별 통계를 차트 데이터로 변환
    const getQuestTypeChartData = () => {
        if (!questTypeStats || Object.keys(questTypeStats).length === 0) return [];

        const typeLabels = {
            'daily': '일일',
            'weekly': '주간',
            'monthly': '월간',
            'event': '이벤트'
        };

        return Object.entries(questTypeStats).map(([typeKey, typeValue]) => ({
            type: typeLabels[typeKey] || typeKey,
            count: typeValue || 0
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>통계</h2>
                <button onClick={() => onNavigate('dashboard')} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>

            {isLoading ? (
                <div className={styles.loading}>로딩 중...</div>
            ) : (
                <div className={styles.content}>
                    {/* 요약 통계 */}
                    {summaryStats && (
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>총 통계</h3>
                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>완료한 퀘스트</p>
                                    <p className={styles.statValue}>{summaryStats.total_quests}</p>
                                </div>
                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>획득한 경험치</p>
                                    <p className={styles.statValue}>{summaryStats.total_exp}</p>
                                </div>
                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>사용한 코인</p>
                                    <p className={styles.statValue}>{summaryStats.total_coin_spent}</p>
                                </div>
                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>획득한 업적</p>
                                    <p className={styles.statValue}>{summaryStats.total_achievements}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 주간 완료 기록 */}
                    {weeklyHistory && (
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>주간 퀘스트 완료</h3>
                            <div className={styles.chartContainer}>
                                <StatChart
                                    data={getWeeklyChartData()}
                                    xKey="date"
                                    yKey="count"
                                    barColor="#3f51b5"
                                />
                            </div>
                        </div>
                    )}

                    {/* 퀘스트 타입별 통계 */}
                    {questTypeStats && (
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>퀘스트 타입별 완료</h3>
                            <div className={styles.chartContainer}>
                                <StatChart
                                    data={getQuestTypeChartData()}
                                    xKey="type"
                                    yKey="count"
                                    barColor="#8b5cf6"
                                />
                            </div>
                        </div>
                    )}

                    {/* 최다 완료 퀘스트 */}
                    {topQuests && topQuests.length > 0 &&(
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>최다 완료 퀘스트</h3>
                            <div className={styles.questList}>
                                {topQuests.map((quest, index) => (
                                    <div key={index} className={styles.questItem}>
                                        <div className={styles.questHeader}>
                                            <h4 className={styles.questTitle}>{quest.title}</h4>
                                            <span className={styles.questCount}>{quest.count}회</span>
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