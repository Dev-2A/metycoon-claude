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

const AppContent = () => {
    const { isAuthenticated, user, setUser, setIsAuthenticated, isLoading } = useAuth();
    const [currentView, setCurrentView] = useState('dashboard');

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setCurrentView('login');
    };

    // 로그인 상태에 따라 뷰 설정
    useEffect(() => {
        if (isAuthenticated) {
            setCurrentView('dashboard');
        } else {
            setCurrentView('login');
        }
    }, [isAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
                <div className="text-xl">로딩 중...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return currentView === 'login' ? (
            <LoginPage onSwitchToRegister={() => setCurrentView('register')} />
        ) : (
            <RegisterPage onSwitchToRegister={() => setCurrentView('login')} />
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
        <Layout currentView={currentView} onNavigate={setCurrentView}>
            {renderContent()}
        </Layout>
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