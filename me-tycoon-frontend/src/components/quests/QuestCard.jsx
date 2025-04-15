import React from 'react';
import styles from './QuestCard.module.css';
import buttonStyles from '../../styles/Button.module.css';

const QuestCard = ({ quest, isCompleted, onComplete }) => {
    // 퀘스트 타입에 따른 CSS 클래스 결정
    const typeClass = styles[quest.quest_type] || '';
    
    return (
        <div
            className={`${styles.card} ${isCompleted ? styles.completed : ''}`}
        >
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.title}>
                        {quest.title}
                        <span className={`${styles.typeTag} ${typeClass}`}>
                            {quest.quest_type === 'daily' && '일일'}
                            {quest.quest_type === 'weekly' && '주간'}
                            {quest.quest_type === 'monthly' && '월간'}
                            {quest.quest_type === 'event' && '이벤트'}
                        </span>
                    </h3>
                    <p className={styles.description}>{quest.description}</p>
                    <div className={styles.rewards}>
                        <span className={styles.expReward}>
                            <span className={styles.rewardIcon}>⚡</span>
                            +{quest.experience} EXP
                        </span>
                        <span className={styles.coinReward}>
                            <span className={styles.rewardIcon}>💰</span>
                            +{quest.coin} 코인
                        </span>
                    </div>
                </div>
                {isCompleted ? (
                    <div className={styles.completeLabel}>
                        <span className={styles.checkIcon}>✓</span>
                        완료됨
                    </div>
                ) : (
                    <button
                        onClick={() => onComplete(quest.id)}
                        className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.small}`}
                    >
                        완료
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestCard;