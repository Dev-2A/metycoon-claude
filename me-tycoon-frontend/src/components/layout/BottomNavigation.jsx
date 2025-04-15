// src/components/layout/BottomNavigation.jsx
import React from 'react';
import { User, ClipboardList, ShoppingBag, Award, Crown, BarChart2 } from 'lucide-react';
import styles from './BottomNavigation.module.css';
import responsiveStyles from '../../styles/responsive.module.css';

const BottomNavigation = ({ currentView, onNavigate }) => {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} ${responsiveStyles.container}`}>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`${styles.navButton} ${currentView === 'dashboard' ? styles.active : ''} ${responsiveStyles.navButton}`}
        >
          <User size={24} />
          <span>홈</span>
        </button>
        <button
          onClick={() => onNavigate('quests')}
          className={`${styles.navButton} ${currentView === 'quests' ? styles.active : ''} ${responsiveStyles.navButton}`}
        >
          <ClipboardList size={24} />
          <span>퀘스트</span>
        </button>
        <button
          onClick={() => onNavigate('rewards')}
          className={`${styles.navButton} ${currentView === 'rewards' ? styles.active : ''} ${responsiveStyles.navButton}`}
        >
          <ShoppingBag size={24} />
          <span>보상</span>
        </button>
        <button
          onClick={() => onNavigate('achievements')}
          className={`${styles.navButton} ${currentView === 'achievements' ? styles.active : ''} ${responsiveStyles.navButton}`}
        >
          <Award size={24} />
          <span>업적</span>
        </button>
        <button
          onClick={() => onNavigate('titles')}
          className={`${styles.navButton} ${currentView === 'titles' ? styles.active : ''} ${responsiveStyles.navButton}`}
        >
          <Crown size={24} />
          <span>칭호</span>
        </button>
        <button
          onClick={() => onNavigate('stats')}
          className={`${styles.navButton} ${currentView === 'stats' ? styles.active : ''} ${responsiveStyles.navButton}`}
        >
          <BarChart2 size={24} />
          <span>통계</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;