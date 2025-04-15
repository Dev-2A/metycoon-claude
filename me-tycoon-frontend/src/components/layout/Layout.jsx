// src/components/layout/Layout.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { getUserStats } from '../../services/stats';
import styles from './Layout.module.css';

const Layout = ({ children, currentView, onNavigate }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userStats = await getUserStats();
                setStats(userStats);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className={styles.layout}>
            <Header stats={stats} />
            <main className={styles.main}>
                {children}
            </main>
            <BottomNavigation currentView={currentView} onNavigate={onNavigate} />
        </div>
    );
};

export default Layout;