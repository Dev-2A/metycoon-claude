import React from 'react';
import { Crown } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import styles from './TitleCard.module.css';

const TitleCard = ({ title, onEquip, onUnequip }) => {
    return (
        <div className={`${styles.card} ${title.equipped ? styles.equipped : ''}`}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.titleHeader}>
                        <h3 className={styles.titleName}>{title.title.name}</h3>
                        {title.equipped && (
                            <Crown size={16} className={styles.crownIcon} />
                        )}
                    </div>
                    <p className={styles.description}>{title.title.description}</p>
                    <div className={styles.date}>
                        획득일: {formatDate(title.unlocked_at)}
                    </div>
                </div>
                {title.equipped ? (
                    <button
                        onClick={onUnequip}
                        className={styles.unequipButton}
                    >
                        해제
                    </button>
                ) : (
                    <button
                        onClick={onEquip}
                        className={styles.equipButton}
                    >
                        착용
                    </button>
                )}
            </div>
        </div>
    );
};

export default TitleCard;