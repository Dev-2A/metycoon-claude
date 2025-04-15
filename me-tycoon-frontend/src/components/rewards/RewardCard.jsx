import React from 'react';
import { formatDate } from '../../utils/helpers';
import styles from './RewardCard.module.css';

const RewardCard = ({ reward, affordability, onPurchase, onUse, purchaseMode, purchaseDate }) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{reward.name}</h3>
                    <p className={styles.description}>{reward.description}</p>
                    {purchaseMode ? (
                        <div className={styles.cost}>
                            {reward.cost} 코인
                        </div>
                    ) : (
                        <div className={styles.purchaseDate}>
                            구매일: {formatDate(purchaseDate)}
                        </div>
                    )}
                </div>
                {purchaseMode ? (
                    <button
                        onClick={onPurchase}
                        disabled={!affordability}
                        className={affordability ? styles.buyButton : styles.disabledBuyButton}
                    >
                        구매
                    </button>
                ) : (
                    <button
                        onClick={onUse}
                        className={styles.useButton}
                    >
                        사용
                    </button>
                )}
            </div>
        </div>
    );
};

export default RewardCard;