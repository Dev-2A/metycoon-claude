import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import QuestsPage from './components/quests/QuestsPage';
import RewardsPage from './components/rewards/RewardsPage';
import AchievementsPage from './components/achievements/AchievementsPage';
import TitlesPage from './components/titles/TitlesPage';
import StatsPage from './components/stats/StatsPage';
import ProfilePage from './components/profile/ProfilePage';
import styles from './App.module.css';
import responsiveStyles from './styles/responsive.module.css';

const AppContent = () => {
    const { isAuthenticated, user, setUser, setIsAuthenticated, isLoading } = useAuth();
    const [currentView, setCurrentView] = useState('dashboard');
    const [authView, setAuthView] = useState('login');

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setAuthView('login');
    };

    // 로그인 상태에 따라 뷰 설정
    useEffect(() => {
        if (isAuthenticated) {
            setCurrentView('dashboard');
        }
    }, [isAuthenticated]);

    if (isLoading) {
        return (
            <div className={`${styles.loadingContainer} ${responsiveStyles.container}`}>
                <div className={styles.loadingSpinner}></div>
                <div>로딩 중...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return authView === 'login' ? (
            <LoginPage onSwitchToRegister={() => setAuthView('register')} />
        ) : (
            <RegisterPage onSwitchToLogin={() => setAuthView('login')} />
        );
    }

    // 페이지 랜더링
    const renderContent = () => {
        switch (currentView) {
            case 'dashboard' :
                return <Dashboard onNavigate={setCurrentView} />
            case 'quests' :
                return <QuestsPage onNavigate={setCurrentView} />
            case 'rewards' :
                return <RewardsPage onNavigate={setCurrentView} />
            case 'achievements' :
                return <AchievementsPage onNavigate={setCurrentView} />
            case 'titles' :
                return <TitlesPage onNavigate={setCurrentView} />
            case 'stats' :
                return <StatsPage onNavigate={setCurrentView} />
            case 'profile' :
                return <ProfilePage user={user} onNavigate={setCurrentView} onLogout={handleLogout} />
            default:
                return <Dashboard onNavigate={setCurrentView} />
        }
    };

    return (
        <div className={`${styles.app} ${responsiveStyles.app}`}>
            <Layout currentView={currentView} onNavigate={setCurrentView}>
                {renderContent()}
            </Layout>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;