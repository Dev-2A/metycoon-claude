import React from 'react';
import { formatDate } from '../../utils/helpers';

const AchievementCard = ({ achievement, unlockedAt }) => {
    return(
        <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
                    <div className="text-sm text-green-400 mt-2">
                        달성일: {formatDate(unlockedAt)}
                    </div>
                </div>
                <div className="bg-green-900 px-2 py-1 rounded text-xs font-medium self-start">
                    달성
                </div>
            </div>
        </div>
    );
};

export default AchievementCard;