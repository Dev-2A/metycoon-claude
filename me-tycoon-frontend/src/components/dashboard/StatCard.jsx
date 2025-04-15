// src/components/dashboard/StatCard.jsx
import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ label, value }) => {
    return (
        <div className={styles.card}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value}</p>
        </div>
    );
};

export default StatCard;