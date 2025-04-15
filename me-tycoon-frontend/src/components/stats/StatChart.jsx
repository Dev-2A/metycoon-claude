import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './StatChart.module.css';

const StatChart = ({ data, xKey, yKey, barColor }) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.noData}>
        데이터가 없습니다.
      </div>
    );
  }
  
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey={xKey} stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              borderColor: '#374151',
              color: 'white',
            }}
          />
          <Bar dataKey={yKey} fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatChart;