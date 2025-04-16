import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './StatChart.module.css';

const StatChart = ({ data, xKey, yKey, barColor }) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.noData}>
        <div className={styles.noDataIcon}>📊</div>
        <div className={styles.noDataText}>데이터가 없습니다.</div>
      </div>
    );
  }
  
  // 커스텀 툴팁 컴포넌트
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipValue}>
            {payload[0].name}: <span>{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey={xKey} 
            stroke="rgba(255, 255, 255, 0.7)"
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)" 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
          />
          <Tooltip 
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
          />
          <Legend 
            wrapperStyle={{ 
              paddingTop: 10,
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 12
            }}
          />
          <Bar 
            dataKey={yKey} 
            fill={barColor}
            name="완료 수"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatChart;