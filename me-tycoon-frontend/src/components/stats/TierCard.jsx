import { useProfile } from '../../context/ProfileContext';
import ThemedCard from '../common/ThemedCard';

export default function UserTierCard() {
  const { user } = useProfile();

  if (!user) return null;

  const level = user.level || 1;
  const currentExp = user.current_experience || 0;
  const requiredExp = user.required_experience || 100;

  const percentage = Math.min((currentExp / requiredExp) * 100, 100).toFixed(0);

  return (
    <ThemedCard className="tier-card">
      <h2 className="text-xl font-bold mb-4">🏆 나의 티어</h2>
      <div className="text-2xl font-extrabold mb-2">Lv. {level}</div>
      <div className="text-sm text-gray-600 mb-2">
        {currentExp} / {requiredExp} 경험치 ({percentage}%)
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </ThemedCard>
  );
}