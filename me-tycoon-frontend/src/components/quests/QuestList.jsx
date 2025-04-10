import { useEffect, useState } from 'react';
import { getQuests, completeQuest, deleteQuest } from '../../api/quests';
import ThemedCard from '../common/ThemedCard';
import ThemedButton from '../common/ThemedButton';

export default function QuestList({ onComplete, onDelete, refreshKey }) {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getQuests();
      setQuests(data);
    };
    fetch();
  }, [refreshKey]);

  const handleComplete = async (questId) => {
    try {
      const result = await completeQuest(questId);
      alert('✅ 퀘스트 완료!');
      onComplete(result); // 경험치/코인 갱신 + 업적/통계 갱신
    } catch (err) {
      alert(err.response?.data?.error || '퀘스트 완료 중 오류 발생');
    }
  };

  const handleDelete = async (questId) => {
    if (!window.confirm('정말로 이 퀘스트를 삭제할까요?')) return;
    await deleteQuest(questId);
    alert('🗑️ 퀘스트 삭제 완료!');
    onDelete(); // 통계 갱신 트리거
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📋 퀘스트 목록</h2>
      <div className="space-y-2">
        {quests.map((quest) => (
          <ThemedCard key={quest.id} className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{quest.title}</div>
              <div className="text-sm text-gray-500">{quest.description}</div>
              <div className="text-xs text-gray-400 mt-1">
                [{quest.quest_type}] 경험치 +{quest.experience}, 코인 +{quest.coin}
              </div>
            </div>
            <div className="flex gap-2">
              <ThemedButton onClick={() => handleComplete(quest.id)}>완료</ThemedButton>
              <ThemedButton onClick={() => handleDelete(quest.id)} variant="danger">
                삭제
              </ThemedButton>
            </div>
          </ThemedCard>
        ))}
      </div>
    </div>
  );
}