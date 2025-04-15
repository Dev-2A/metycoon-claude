import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClass = styles[size] || styles.medium;
  const colorClass = styles[color] || styles.primary;
  
  return (
    <div className={`${styles.spinner} ${sizeClass} ${colorClass}`}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

export default Spinner;