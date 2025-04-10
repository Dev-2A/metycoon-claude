import { useEffect, useState } from 'react';
import { getUserRewards, useReward } from '../../api/rewards';
import ThemedCard from '../common/ThemedCard';
import ThemedButton from '../common/ThemedButton';

export default function MyRewards({ refreshKey }) {
  const [myItems, setMyItems] = useState([]);

  const fetchItems = async () => {
    const data = await getUserRewards();
    setMyItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [refreshKey]);

  const handleUse = async (id) => {
    if (confirm('보상을 사용하시겠습니까?')) {
      await useReward(id);
      await fetchItems();
    }
  };

  if (myItems.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">📦 내 보관함</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myItems.map((entry) => (
          <ThemedCard key={entry.id}>
            <div className="font-bold text-lg">{entry.reward.name}</div>
            <div className="text-sm text-gray-600">{entry.reward.description}</div>
            <div className="text-xs text-gray-400 mt-1">
              획득일: {new Date(entry.acquired_at).toLocaleString()}
            </div>
            <div className="mt-2">
              <ThemedButton onClick={() => handleUse(entry.id)} variant="danger">
                사용
              </ThemedButton>
            </div>
          </ThemedCard>
        ))}
      </ul>
    </div>
  );
}