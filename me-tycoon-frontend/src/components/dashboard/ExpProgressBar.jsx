// src/components/dashboard/ExpProgressBar.jsx
import React from 'react';
import styles from './ExpProgressBar.module.css';

const ExpProgressBar = ({ expProgress, stats }) => {
  if (!stats) return null;
  
  const currentLevel = stats.level;
  const nextLevelExp = ((currentLevel * (currentLevel + 1)) / 2) * 100;
  const prevLevelExp = (((currentLevel - 1) * currentLevel) / 2) * 100;
  const expNeeded = nextLevelExp - prevLevelExp;
  const currentLevelExp = stats.experience - prevLevelExp;
  
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <span className={styles.statText}>EXP: {stats.experience}</span>
        <span className={styles.statText}>{Math.round(currentLevelExp)}/{expNeeded}</span>
      </div>
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${expProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ExpProgressBar;