import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getAllRewards, getUserRewards, purchaseReward, consumeReward } from '../../services/rewards';
import { getUserStats } from '../../services/stats';
import RewardCard from './RewardCard';
import styles from './RewardsPage.module.css';
import cardStyles from '../../styles/Card.module.css';
import responsiveStyles from '../../styles/responsive.module.css';

const RewardsPage = ({ onNavigate }) => {
    const [availableRewards, setAvailableRewards] = useState([]);
    const [userRewards, setUserRewards] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
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
            setMessageType('success');

            // 데이터 다시 가져오기
            fetchRewards();
        } catch (error) {
            console.error('Error purchasing reward:', error);
            setMessage(error.message || '보상 구매에 실패했습니다.');
            setMessageType('error');
            setIsLoading(false);
        }
    };

    const handleUseReward = async (userRewardId) => {
        try {
            setIsLoading(true);
            setMessage('');

            await consumeReward(userRewardId);
            setMessage('보상을 사용했습니다!');
            setMessageType('success');

            // 데이터 다시 가져오기
            fetchRewards();
        } catch (error) {
            console.error('Error using reward:', error);
            setMessage(error.message || '보상 사용에 실패했습니다.');
            setMessageType('error');
            setIsLoading(false);
        }
    };

    const canAfford = (reward) => {
        return stats && stats.coin >= reward.cost;
    };

    return (
        <div className={`${styles.container} ${responsiveStyles.container}`}>
            <div className={styles.header}>
                <h2 className={`${styles.title} ${responsiveStyles.title}`}>보상</h2>
                <button onClick={() => onNavigate('dashboard')} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>

            <div className={`${cardStyles.card} ${styles.contentCard} ${responsiveStyles.contentCard}`}>
                <div className={`${styles.topBar} ${responsiveStyles.tabButtons}`}>
                    <div className={styles.tabButtons}>
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`${styles.tabButton} ${
                                activeTab === 'available' ? styles.activeTab : ''
                            }`}
                        >
                            구매 가능한 보상
                        </button>
                        <button
                            onClick={() => setActiveTab('purchased')}
                            className={`${styles.tabButton} ${
                                activeTab === 'purchased' ? styles.activeTab : ''
                            }`}
                        >
                            내 보상
                        </button>
                    </div>
                    {stats && (
                        <div className={styles.coinDisplay}>
                            {stats.coin} 코인
                        </div>
                    )}
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
                    <div className={styles.rewardList}>
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
                                <div className={styles.emptyState}>
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
                                <div className={styles.emptyState}>
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