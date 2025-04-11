import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getAllQuests, getQuestCompletions, completeQuest } from '../../services/quests';
import { isQuestCompleted } from '../../utils/helpers';
import QuestCard from './QuestCard';

const QuestsPage = ({ onNavigate }) => {
    const [quests, setQuests] = useState([]);
    const [completions, setCompletions] = useState([]);
    const [activeType, setActiveType] = useState('daily');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchQuests();
    }, []);

    const fetchQuests = async () => {
        try{
            setIsLoading(true);

            // 모든 퀘스트 가져오기
            const questsData = await getAllQuests();
            setQuests(questsData);

            // 완료한 퀘스트 가져오기
            const completionsData = await getQuestCompletions();
            setCompletions(completionsData);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching quests:', error);
            setIsLoading(false);
        }
    };

    const handleCompleteQuest = async (questId) => {
        try {
            setIsLoading(true);
            setMessage('');

            const result = await completeQuest(questId);
            setMessage(result.message);
            fetchQuests(); // 퀘스트 목록 새로고침

            setIsLoading(false);
        } catch (error) {
            console.error('Error completing quest:', error);
            setMessage(error.message || '퀘스트 완료에 실패했습니다.');
            setIsLoading(false);
        }
    };

    const filteredQuests = quests.filter(quest => quest.quest_type === activeType);

    const questTypeLabels = {
        'daily': '일일 퀘스트',
        'weekly': '주간 퀘스트',
        'monthly': '월간 퀘스트',
        'event': '이벤트 퀘스트'
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">퀘스트</h2>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-4 mb-6">
                <div className="flex overflow-x-auto mb-4 pb-2">
                    {['daily', 'weekly', 'monthly', 'event'].map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 min-w-max ${
                                activeType === type
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {questTypeLabels[type]}
                        </button>
                    ))}
                </div>

                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-sm ${
                    message.includes('완료') ? 'bg-green-900/60' : 'bg-red-900/60'
                }`}>
                    {message}
                </div>
                )}

                {isLoading ? (
                    <div className="text-center py-4">로딩 중...</div>
                ) : (
                    <div className="space-y-3">
                        {filteredQuests.length > 0 ? (
                            filteredQuests.map(quest => (
                                <QuestCard
                                    key={quest.id}
                                    quest={quest}
                                    isCompleted={isQuestCompleted(quest, completions)}
                                    onComplete={handleCompleteQuest}
                                />
                            ))
                        ) : (
                            <div className="text-center py-4 text-gray-400">
                                {activeType} 퀘스트가 없습니다.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestsPage;