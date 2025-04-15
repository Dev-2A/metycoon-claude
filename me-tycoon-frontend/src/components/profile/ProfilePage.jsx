import React, { useState } from 'react';
import { X, LogOut } from 'lucide-react';
import { logout } from '../../services/auth';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ user, onNavigate, onLogout }) => {
    const [confirmLogout, setConfirmLogout] = useState(false);

    const handleLogout = () => {
        if(!confirmLogout) {
            setConfirmLogout(true);
            return;
        }

        logout();
        onLogout();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>프로필</h2>
                <button onClick={() => onNavigate('dashboard')} className={styles.closeButton}>
                    <X size={24} />
                </button>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>
                        <span>{user?.username?.charAt(0).toUpperCase()}</span>
                    </div>
                    <h3 className={styles.username}>{user?.username}</h3>
                </div>

                <div className={styles.infoList}>
                    <div className={styles.infoItem}>
                        <h4 className={styles.infoLabel}>사용자 이름</h4>
                        <p className={styles.infoValue}>{user?.username}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <h4 className={styles.infoLabel}>이메일</h4>
                        <p className={styles.infoValue}>{user?.email || '등록된 이메일이 없습니다.'}</p>
                    </div>
                </div>
            </div>

            <div className={styles.logoutCard}>
                <button
                    onClick={handleLogout}
                    className={`${styles.logoutButton} ${
                        confirmLogout ? styles.confirmLogout : styles.normalLogout
                    }`}
                >
                    <LogOut size={18} className={styles.logoutIcon} />
                    {confirmLogout ? '정말 로그아웃 하시겠습니까?' : '로그아웃'}
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;