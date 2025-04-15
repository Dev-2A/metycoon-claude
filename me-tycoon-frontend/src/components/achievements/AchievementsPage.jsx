import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getUserAchievements } from '../../services/achievements';
import AchievementCard from './AchievementCard';
import styles from './AchievementsPage.module.css';
import cardStyles from '../../styles/Card.module.css';
import responsiveStyles from '../../styles/responsive.module.css';

const AchievementsPage = ({ onNavigate }) => {
    const [achievements, setAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            setIsLoading(true);
            const userAchievements = await getUserAchievements();
            setAchievements(userAchievements);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setIsLoading(false);
        }
    };

    const achievementsByType = {
        'quest_complete_count': '퀘스트 완료',
        'level_reach': '레벨',
        'reward_buy_count': '보상 구매',
        'coin_collect': '코인 수집',
        'daily_quest_count': '일일 퀘스트',
        'weekly_quest_count': '주간 퀘스트',
        'consecutive_days': '연속 접속'
    };

    // 업적 타입별로 그룹화
    const groupedAchievements = achievements.reduce((acc, achievement) => {
        const type = achievement.achievement.condition_type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(achievement);
        return acc;
    }, {});

    return (
        <div className={`${styles.container} ${responsiveStyles.container}`}>
            <div className={styles.header}>
                <h2 className={`${styles.title} ${responsiveStyles.title}`}>업적</h2>
                <button onClick={() => onNavigate('dashboard')} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>

            {isLoading ? (
                <div className={styles.loading}>로딩 중...</div>
            ) : (
                <div>
                    {Object.keys(achievementsByType).map(type => {
                        const typeAchievements = groupedAchievements[type] || [];

                        if (typeAchievements.length === 0) return null;

                        return (
                            <div key={type} className={styles.section}>
                                <h3 className={styles.sectionTitle}>{achievementsByType[type]} 업적</h3>
                                <div className={`${cardStyles.card} ${styles.achievementCard}`}>
                                    <div className={styles.achievementList}>
                                        {typeAchievements.map(achievement => (
                                            <AchievementCard
                                                key={achievement.id}
                                                achievement={achievement.achievement}
                                                unlockedAt={achievement.unlocked_at}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {achievements.length === 0 && (
                        <div className={`${cardStyles.card} ${styles.emptyState}`}>
                            <p className={styles.emptyTitle}>아직 달성한 업적이 없습니다.</p>
                            <p className={styles.emptyDescription}>퀘스트를 완료하고 레벨을 올려 업적을 달성해보세요!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AchievementsPage;