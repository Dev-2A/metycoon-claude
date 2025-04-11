import React from 'react';

const QuestCard = ({ quest, isCompleted, onComplete }) => {
    return (
        <div
            className={`p-4 rounded-lg ${
                isCompleted ? 'bg-green-900/40' : 'bg-gray-700'
            }`}
        >
            <div className="flex justify-between">
                <div>
                    <h3 className="font-medium">{quest.title}</h3>
                    <p className="tet-sm text-gray-400 mt-1">{quest.description}</p>
                    <div className="flex items-center mt-2 text-sm">
                        <span className="text-blue-400 mr-3">+{quest.experience} EXP</span>
                        <span className="text-yellow-400">+{quest.coin} 코인</span>
                    </div>
                </div>
                {isCompleted ? (
                    <div className="text-green-400 text-sm self-start">완료됨</div>
                ) : (
                    <button
                        onClick={() => onComplete(quest.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium self-start"
                    >
                        완료
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestCard;