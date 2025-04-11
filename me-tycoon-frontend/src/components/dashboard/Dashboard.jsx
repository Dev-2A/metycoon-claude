import React, { useState, useEffect } from 'react';
import { Award, Crown, ShoppingBag } from 'lucide-react';
import { getQuestStats, getAllQuests, getQuestCompletions } from '../../services/quests';
import { getUserTitles } from '../../services/titles';
import { getUserStats } from '../../services/stats';
import { calculateExpProgress } from '../../utils/helpers';
import ExpProgressBar from './ExpProgressBar';
import StatCard from './StatCard';

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
        <div className="container mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-xl">
                <div className="flex items-center mb-4">
                    <div className="flext-1">
                        <h2 className="text-2xl font-bold">{stats?.user}</h2>
                        {userTitles?.length > 0 && (
                            <p className="text-yellow-400">{userTitles[0].title.name}</p>
                        )}
                    </div>
                    <div className="bg-gray-900 px-4 py-2 rounded-full">
                        <span className="text-yellow-400 font-bold">Lv.{stats?.level}</span>
                    </div>
                </div>

                <ExpProgressBar expProgress={expProgress} stats={stats} />

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <StatCard label="코인" value={stats?.coin || 0} />
                    <StatCard label="완료한 퀘스트" value={questStats?.completed_quests || 0} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">오늘의 퀘스트</h3>
                        <button
                            onClick={() => onNavigate('quests')}
                            className="text-blue-400 text-sm"
                        >
                            더 보기
                        </button>
                    </div>
                    {dailyQuests.slice(0, 3).map(quest => {
                        const isCompleted = todayCompletions.some(c => c.quest === quest.id);
                        return (
                            <div
                                key={quest.id}
                                className={`p-3 mb-2 rounded-lg flex items-center ${isCompleted ? 'bg-green-900/40' : 'bg-gray-700'}`}
                            >
                                <div className="flex-1">
                                    <h4 className="font-medium">{quest.title}</h4>
                                    <div className="flex items-center text-sm">
                                        <span className="text-blue-400 mr-2">+{quest.experience} EXP</span>
                                        <span className="text-yellow-400">+{quest.coin} 코인</span>
                                    </div>
                                </div>
                                {isCompleted && (
                                    <span className="text-green-400 text-sm">완료됨</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="felxt justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">주간 퀘스트</h3>
                        <button
                            onClick={() => onNavigate('quests')}
                            className="text-blue-400 text-sm"
                        >
                            더 보기
                        </button>
                    </div>
                    {weeklyQuests.slice(0, 3).map(quest => (
                        <div key={quest.id} className="p-3 mb-2 rounded-lg bg-gray-700">
                            <h4 className="font-medium">{quest.title}</h4>
                            <div className="flex items-center text-sm">
                                <span className="text-blue-400 mr-2">+{quest.experience} EXP</span>
                                <span className="text-yellow-400">+{quest.coin} 코인</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                    onClick={() => onNavigate('achievements')}
                    className="bg-purple-900 p-4 runded-lg text-center hover:bg-purple-800"
                >
                    <Award size={24} className="mx-auto mb-2" />
                    <p className="text-sm">업적</p>
                </button>
                <button
                    onClick={() => onNavigate('titles')}
                    className="bg-indigo-900 p-4 rounded-lg text-center hover:bg-indigo-800"
                >
                    <Crown size={24} className="mx-auto mb-2" />
                    <p className="text-sm">칭호</p>
                </button>
                <button
                    onClick={() => onNavigate('rewards')}
                    className="bg-blue-900 p-4 rounded-lg text-center hover:bg-blue-800"
                >
                    <ShoppingBag size={24} className="mx-auto mb-2" />
                    <p className="text-sm">보상</p>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;