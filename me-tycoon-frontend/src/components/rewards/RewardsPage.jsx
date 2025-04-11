import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getAllRewards, getUserRewards, purchaseReward, useReward } from '../../services/rewards';
import { getUserStats } from '../../services/stats';
import RewardCard from './RewardCard';

const RewardsPage = ({ onNavigate }) => {
    const [availableRewards, setAvailableRewards] = useState([]);
    const [userRewards, setUserRewards] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('available');

    useEffect(() => {
        fetchRewards();
    }, []);

    const fetchRewards = async () => {
        try {
            setIsLoading(true);

            // 사용 가능한 보상 목록
            const rewards = await getAllRewards();
            setAvailableRewards(rewards);

            // 구매한 보상 목록
            const purchasedRewards = await getUserRewards();
            setUserRewards(purchasedRewards);

            // 사용자 통계 (코인 정보 필요)
            const userStats = await getUserStats();
            setStats(userStats);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching rewards:', error);
            setIsLoading(false);
        }
    };

    const handlePurchaseReward = async (rewardId) => {
        try {
            setIsLoading(true);
            setMessage('');

            const result = await purchaseReward(rewardId);
            setMessage(result.message);

            // 데이터 다시 가져오기
            fetchRewards();
        } catch (error) {
            console.error('Error purchasing reward:', error);
            setMessage(error.message || '보상 구매에 실패했습니다.');
            setIsLoading(false);
        }
    };

    const handleUseReward = async (userRewardId) => {
        try {
            setIsLoading(true);
            setMessage('');

            await useReward(userRewardId);
            setMessage('보상을 사용했습니다!');

            // 데이터 다시 가져오기
            fetchRewards();
        } catch (error) {
            console.error('Error using reward:', error);
            setMessage(error.message || '보상 사용에 실패했습니다.');
            setIsLoading(false);
        }
    };

    const canAfford = (reward) => {
        return stats && stats.coin >= reward.cost;
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">보상</h2>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'abailable'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            구매 가능한 보상
                        </button>
                        <button
                            onClick={() => setActiveTab('purchased')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'purchased'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            내 보상
                        </button>
                    </div>
                    {stats && (
                        <div className="text-yellow-400 font-bold">
                            {stats.coin} 코인
                        </div>
                    )}
                </div>

                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-sm ${
                        message.includes('완료') || message.includes('사용') ? 'bg-green-900/60' : 'bg-red-900/60'
                    }`}>
                        {message}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-4">로딩 중...</div>
                ) : (
                    <div className="space-y-3">
                        {activeTab === 'available' ? (
                            availableRewards.length > 0 ? (
                                availableRewards.map(reward => (
                                    <RewardCard
                                        key={reward.id}
                                        reward={reward}
                                        affordability={canAfford(reward)}
                                        onPurchase={() => handlePurchaseReward(reward.id)}
                                        purchaseMode={true}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-400">
                                    구매 가능한 보상이 없습니다.
                                </div>
                            )
                        ) : (
                            userRewards.length > 0 ? (
                                userRewards.map(userReward => (
                                    <RewardCard
                                        key={userReward.id}
                                        reward={userReward.reward}
                                        purchaseDate={userReward.acquired_at}
                                        onUse={() => handleUseReward(userReward.id)}
                                        purchaseMode={false}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-400">
                                    구매한 보상이 없습니다.
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RewardsPage;