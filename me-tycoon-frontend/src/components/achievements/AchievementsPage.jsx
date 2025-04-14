import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getUserAchievements } from '../../services/achievements';
import AchievementCard from './AchievementCard';

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
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">업적</h2>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400">
                    <X size={24} />
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-4">로딩 중...</div>
            ) : (
                <div>
                    {Object.keys(achievementsByType).map(type => {
                        const typeAchievements = groupedAchievements[type] || [];

                        if (typeAchievements.length === 0) return null;

                        return (
                            <div key={type} className="mb-6">
                                <h3 className="text-xl font-bold mb-3">{achievementsByType[type]}업적</h3>
                                <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                                    <div className="space-y-3">
                                        {typeAchievements.map(achievement => (
                                            <AchievementCard
                                                key={achievement.id}
                                                achievement={achievement.achievement}
                                                unlockedat={achievement.unlocked_at}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {achievements.length === 0 && (
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                            <p className="text-gray-400">아직 달성한 업적이 없습니다.</p>
                            <p className="mt-2 text-sm text-gray-500">퀘스트를 완료하고 레벨을 올려 업적을 달성해보세요!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AchievementsPage;