import React from 'react';
import { formatDate } from '../../utils/helpers';

const RewardCard = ({ reward, affordability, onPurchase, onUse, purchaseMode, purchaseDate }) => {
    return (
        <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-medium">{reward.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{reward.description}</p>
                    {purchaseMode ? (
                        <div className="mt-2 text-yellow-400 font-medium">
                            {reward.cost} 코인
                        </div>
                    ) : (
                        <div className="text-sm text-gray-400 mt-2">
                            구매일: {formatDate(purchaseDate)}
                        </div>
                    )}
                </div>
                {purchaseMode ? (
                    <button
                        onClick={onPurchase}
                        disabled={!affordability}
                        className={`'px-3 py-1 rounded text-sm font-medium self-start ${
                            affordability ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 cursor-not-allowed opacity-50'
                        }`}
                    >
                        구매
                    </button>
                ) : (
                    <button
                        onClick={onUse}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium self-start"
                    >
                        사용
                    </button>
                )}
            </div>
        </div>
    );
};

export default RewardCard;