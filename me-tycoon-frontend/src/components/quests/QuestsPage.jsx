import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getAllQuests, getQuestCompletions, completeQuest } from '../../services/quests';
import { isQuestCompleted } from '../../utils/helpers';
import QuestCard from './QuestCard';
import styles from './QuestsPage.module.css';

const QuestsPage = ({ onNavigate }) => {
    const [quests, setQuests] = useState([]);
    const [completions, setCompletions] = useState([]);
    const [activeType, setActiveType] = useState('daily');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

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
            setMessageType('success');
            fetchQuests(); // 퀘스트 목록 새로고침

            setIsLoading(false);
        } catch (error) {
            console.error('Error completing quest:', error);
            setMessage(error.message || '퀘스트 완료에 실패했습니다.');
            setMessageType('error');
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
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>퀘스트</h2>
                <button onClick={() => onNavigate('dashboard')} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>

            <div className={styles.contentCard}>
                <div className={styles.tabsContainer}>
                    {['daily', 'weekly', 'monthly', 'event'].map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`${styles.tab} ${
                                activeType === type ? styles.activeTab : ''
                            }`}
                        >
                            {questTypeLabels[type]}
                        </button>
                    ))}
                </div>

                {message && (
                    <div className={`${styles.message} ${
                        messageType === 'success' ? styles.success : styles.error
                    }`}>
                        {message}
                    </div>
                )}

                {isLoading ? (
                    <div className={styles.loading}>로딩 중...</div>
                ) : (
                    <div className={styles.questList}>
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
                            <div className={styles.emptyState}>
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