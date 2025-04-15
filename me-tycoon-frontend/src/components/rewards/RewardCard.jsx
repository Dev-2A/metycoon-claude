import React from 'react';
import { formatDate } from '../../utils/helpers';
import styles from './RewardCard.module.css';
import buttonStyles from '../../styles/Button.module.css';

const RewardCard = ({ reward, affordability, onPurchase, onUse, purchaseMode, purchaseDate }) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.title}>
                        <span className={styles.giftIcon}>🎁</span>
                        {reward.name}
                    </h3>
                    <p className={styles.description}>{reward.description}</p>
                    {purchaseMode ? (
                        <div className={styles.cost}>
                            <span className={styles.coinIcon}>💰</span>
                            {reward.cost} 코인
                        </div>
                    ) : (
                        <div className={styles.purchaseDate}>
                            <span className={styles.calendarIcon}>📅</span>
                            구매일: {formatDate(purchaseDate)}
                        </div>
                    )}
                </div>
                {purchaseMode ? (
                    <button
                        onClick={onPurchase}
                        disabled={!affordability}
                        className={`${buttonStyles.button} ${affordability ? buttonStyles.warning : buttonStyles.disabled} ${buttonStyles.small}`}
                    >
                        <span className={affordability ? styles.buyIcon : styles.lockIcon}>
                            {affordability ? '💰' : '🔒'}
                        </span>
                        구매
                    </button>
                ) : (
                    <button
                        onClick={onUse}
                        className={`${buttonStyles.button} ${buttonStyles.success} ${buttonStyles.small}`}
                    >
                        <span className={styles.checkIcon}>✓</span>
                        사용
                    </button>
                )}
            </div>
        </div>
    );
};

export default RewardCard;