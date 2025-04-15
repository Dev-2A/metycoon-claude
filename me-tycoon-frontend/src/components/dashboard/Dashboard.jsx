// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Award, Crown, ShoppingBag } from 'lucide-react';
import { getQuestStats, getAllQuests, getQuestCompletions } from '../../services/quests';
import { getUserTitles } from '../../services/titles';
import { getUserStats } from '../../services/stats';
import { calculateExpProgress } from '../../utils/helpers';
import ExpProgressBar from './ExpProgressBar';
import StatCard from './StatCard';
import styles from './Dashboard.module.css';
import cardStyles from '../../styles/Card.module.css';
import responsiveStyles from '../../styles/responsive.module.css';
import buttonStyles from '../../styles/Button.module.css';

const Dashboard = ({ onNavigate }) => {
    const [questStats, setQuestStats] = useState(null);
    const [dailyQuests, setDailyQuests] = useState([]);
    const [weeklyQuests, setWeeklyQuests] = useState([]);
    const [userTitles, setUserTitles] = useState([]);
    const [todayCompletions, setTodayCompletions] = useState([]);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 사용자 통계 데이터 가져오기
            const userStats = await getUserStats();
            setStats(userStats);

            // 퀘스트 통계 데이터 가져오기
            const statsData = await getQuestStats();
            setQuestStats(statsData);

            // 퀘스트 목록 가져오기
            const quests = await getAllQuests();
            setDailyQuests(quests.filter(q => q.quest_type === 'daily'));
            setWeeklyQuests(quests.filter(q => q.quest_type === 'weekly'));

            // 칭호 데이터 가져오기
            const titles = await getUserTitles();
            setUserTitles(titles.filter(t => t.equipped));

            // 오늘 완료한 퀘스트 가져오기
            const completions = await getQuestCompletions();
            const today = new Date().toISOString().split('T')[0];
            setTodayCompletions(
                completions.filter(c => c.completed_at.startsWith(today))
            );
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const expProgress = stats ? calculateExpProgress(stats) : 0;

    return (
        <div className={`${styles.container} ${responsiveStyles.container}`}>
            <div className={`${cardStyles.card} ${styles.profileCard}`}>
                <div className={`${styles.profileHeader} ${responsiveStyles.profileHeader}`}>
                    <div className={styles.profileInfo}>
                        <h2 className={styles.username}>{stats?.user}</h2>
                        {userTitles?.length > 0 && (
                            <p className={styles.title}>{userTitles[0].title.name}</p>
                        )}
                    </div>
                    <div className={styles.levelBadge}>
                        <span>Lv.{stats?.level}</span>
                    </div>
                </div>

                <ExpProgressBar expProgress={expProgress} stats={stats} />

                <div className={styles.statsGrid}>
                    <StatCard label="코인" value={stats?.coin || 0} />
                    <StatCard label="완료한 퀘스트" value={questStats?.completed_quests || 0} />
                </div>
            </div>

            <div className={styles.sectionGrid}>
                <div className={`${cardStyles.card} ${styles.sectionCard}`}>
                    <h3 className={cardStyles.cardTitle}>오늘의 퀘스트</h3>
                    <div className={styles.questList}>
                        {dailyQuests.slice(0, 3).map(quest => {
                            const isCompleted = todayCompletions.some(c => c.quest === quest.id);
                            return (
                                <div
                                    key={quest.id}
                                    className={`${styles.questItem} ${isCompleted ? styles.questCompleted : ''}`}
                                >
                                    <div className={styles.questInfo}>
                                        <h4 className={styles.questTitle}>{quest.title}</h4>
                                        <div className={styles.questRewards}>
                                            <span className={styles.expReward}>+{quest.experience} EXP</span>
                                            <span className={styles.coinReward}>+{quest.coin} 코인</span>
                                        </div>
                                    </div>
                                    {isCompleted && (
                                        <span className={styles.completedLabel}>완료됨</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`${cardStyles.card} ${styles.sectionCard}`}>
                    <h3 className={cardStyles.cardTitle}>주간 퀘스트</h3>
                    <div className={styles.questList}>
                        {weeklyQuests.slice(0, 3).map(quest => (
                            <div key={quest.id} className={styles.questItem}>
                                <div className={styles.questInfo}>
                                    <h4 className={styles.questTitle}>{quest.title}</h4>
                                    <div className={styles.questRewards}>
                                        <span className={styles.expReward}>+{quest.experience} EXP</span>
                                        <span className={styles.coinReward}>+{quest.coin} 코인</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.navigationGrid}>
                <button
                    onClick={() => onNavigate('achievements')}
                    className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.navButton} ${styles.achievements}`}
                >
                    <Award size={24} />
                    <p className={styles.navLabel}>업적</p>
                </button>
                <button
                    onClick={() => onNavigate('titles')}
                    className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.navButton} ${styles.titles}`}
                >
                    <Crown size={24} />
                    <p className={styles.navLabel}>칭호</p>
                </button>
                <button
                    onClick={() => onNavigate('rewards')}
                    className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.navButton} ${styles.rewards}`}
                >
                    <ShoppingBag size={24} />
                    <p className={styles.navLabel}>보상</p>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;