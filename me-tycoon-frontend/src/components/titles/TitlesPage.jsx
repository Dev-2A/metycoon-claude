import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getUserTitles, equipTitle, unequipTitle } from '../../services/titles';
import TitleCard from './TitleCard';
import styles from './TitlesPage.module.css';
import cardStyles from '../../styles/Card.module.css';
import responsiveStyles from '../../styles/responsive.module.css';

const TitlesPage = ({ onNavigate }) => {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        fetchTitles();
    }, []);

    const fetchTitles = async () => {
        try {
            setIsLoading(true);
            const userTitles = await getUserTitles();
            setTitles(userTitles);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching titles:', error);
            setIsLoading(false);
        }
    };

    const handleEquipTitle = async (titleId) => {
        try {
            setIsLoading(true);
            setMessage('');

            const result = await equipTitle(titleId);
            setMessage(result.message);
            setMessageType('success');

            // 데이터 다시 가져오기
            fetchTitles();
        } catch (error) {
            console.error('Error equipping title:', error);
            setMessage(error.message || '칭호 착용에 실패했습니다.');
            setMessageType('error');
            setIsLoading(false);
        }
    };

    const handleUnequipTitle = async (titleId) => {
        try {
            setIsLoading(true);
            setMessage('');

            const result = await unequipTitle(titleId);
            setMessage(result.message);
            setMessageType('success');

            // 데이터 다시 가져오기
            fetchTitles();
        } catch (error) {
            console.error('Error unequipping title:', error);
            setMessage(error.message || '칭호 해제에 실패했습니다.');
            setMessageType('error');
            setIsLoading(false);
        }
    };

    return (
        <div className={`${styles.container} ${responsiveStyles.container}`}>
            <div className={styles.header}>
                <h2 className={`${styles.title} ${responsiveStyles.title}`}>칭호</h2>
                <button onClick={() => onNavigate('dashboard')} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>

            <div className={`${cardStyles.card} ${styles.contentCard} ${responsiveStyles.contentCard}`}>
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
                    <div className={styles.titleList}>
                        {titles.length > 0 ? (
                            titles.map(title => (
                                <TitleCard
                                    key={title.id}
                                    title={title}
                                    onEquip={() => handleEquipTitle(title.id)}
                                    onUnequip={() => handleUnequipTitle(title.id)}
                                />
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                아직 획득한 칭호가 없습니다.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TitlesPage;