// src/components/layout/Header.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';

const Header = ({ stats }) => {
    const { user } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>Me Tycoon</h1>
                <div className={styles.headerActions}>
                    {stats && (
                        <div className={styles.stats}>
                            <div className={styles.levelBadge}>
                                Lv.{stats.level}
                            </div>
                            <div className={styles.coinBadge}>
                                {stats.coin} 코인
                            </div>
                        </div>
                    )}
                    <div className={styles.userInfo}>
                        {user?.username}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;