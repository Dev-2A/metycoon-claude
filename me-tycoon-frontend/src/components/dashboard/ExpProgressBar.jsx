import React from 'react';

const ExpProgressBar = ({ expProgress, stats }) => {
    if (!stats) return null;

    const currentLevel = stats.level;
    const nextLevelExp = ((currentLevel * (currentLevel + 1)) / 2) * 100;
    const prevLevelExp = (((currentLevel - 1) * currentLevel) / 2) * 100;
    const expNeeded = nextLevelExp - prevLevelExp;
    const currentLevelExp = stats.experience - prevLevelExp;

    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm">EXP: {stats.experience}</span>
                <span className="text-sm">{Math.round(currentLevelExp)}/{expNeeded}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                    className="bg-blue-500 h-4 runded-full"
                    style={{ width: `${expProgress}` }}
                ></div>
            </div>
        </div>
    );
};

export default ExpProgressBar;