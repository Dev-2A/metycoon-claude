import { useEffect, useState } from 'react';
import { getRewards, buyReward } from '../../api/rewards';
import ThemedCard from '../common/ThemedCard';
import ThemedButton from '../common/ThemedButton';
import CoinDecreaseEffect from "../effects/CoinDecreaseEffect";

export default function RewardShop({ onBuy }) {
  const [rewards, setRewards] = useState([]);
  const [coinDecrease, setCoinDecrease] = useState(null);

  const fetchRewards = async () => {
    const data = await getRewards();
    setRewards(data);
  }

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleBuy = async (id, cost) => {
    const success = await buyReward(id);
    if (success) {
      setCoinDecrease(cost);
      onBuy?.();
      fetchRewards();
    }
  };

  return (
    <div className="mb-8 relative">
      {coinDecrease && (
        <CoinDecreaseEffect amount={coinDecrease} onComplete={() => setCoinDecrease(null)} />
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <ThemedCard key={reward.id}>
            <div className="font-bold text-lg">{reward.name}</div>
            <p className="text-sm text-gray-600">{reward.description}</p>
            <p className="text-sm text-gray-500 mt-1">💰 {reward.coin_cost} 코인</p>
            <ThemedButton className="mt-2" onClick={() => handleBuy(reward.id, reward.coin_cost)}>
              구매하기
            </ThemedButton>
          </ThemedCard>
        ))}
      </ul>
    </div>
  );
}