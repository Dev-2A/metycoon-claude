import React, { useState, useEffect } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { getUserStats } from '../../services/stats';

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
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
            <Header stats={stats} />
            <main className="flex-grow p-4">
                {children}
            </main>
            <BottomNavigation currentView={currentView} onNavigate={onNavigate} />
        </div>
    );
};

export default Layout;