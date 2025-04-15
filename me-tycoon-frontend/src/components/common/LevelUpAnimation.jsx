import React, { useEffect, useState } from 'react';
import styles from './LevelUpAnimation.module.css';

const LevelUpAnimation = ({ level, onComplete }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  if (!visible) return null;
  
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.stars}></div>
        <div className={styles.levelUp}>LEVEL UP!</div>
        <div className={styles.level}>Lv.{level}</div>
        <div className={styles.message}>축하합니다! 새로운 레벨에 도달했습니다.</div>
      </div>
    </div>
  );
};

export default LevelUpAnimation;