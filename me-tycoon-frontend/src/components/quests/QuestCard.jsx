import React from 'react';
import styles from './QuestCard.module.css';

const QuestCard = ({ quest, isCompleted, onComplete }) => {
    return (
        <div
            className={`${styles.card} ${isCompleted ? styles.completed : ''}`}
        >
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{quest.title}</h3>
                    <p className={styles.description}>{quest.description}</p>
                    <div className={styles.rewards}>
                        <span className={styles.expReward}>+{quest.experience} EXP</span>
                        <span className={styles.coinReward}>+{quest.coin} 코인</span>
                    </div>
                </div>
                {isCompleted ? (
                    <div className={styles.completeLabel}>완료됨</div>
                ) : (
                    <button
                        onClick={() => onComplete(quest.id)}
                        className={styles.completeButton}
                    >
                        완료
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestCard;