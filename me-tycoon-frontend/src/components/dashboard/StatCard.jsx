import React from 'react';

const StatCard = ({ label, value }) => {
    return (
        <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
};

export default StatCard;