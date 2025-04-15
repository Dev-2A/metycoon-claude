import React from 'react';
import { formatDate } from '../../utils/helpers';
import styles from './AchievementCard.module.css';

const AchievementCard = ({ achievement, unlockedAt }) => {
    return(
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.title}>
                        <span className={styles.medal}>🏆</span>
                        {achievement.name}
                    </h3>
                    <p className={styles.description}>{achievement.description}</p>
                    <div className={styles.date}>
                        <span className={styles.clockIcon}>⏱️</span>
                        달성일: {formatDate(unlockedAt)}
                    </div>
                </div>
                <div className={styles.badge}>
                    <span className={styles.trophyIcon}>✓</span>
                    달성
                </div>
            </div>
        </div>
    );
};

export default AchievementCard;