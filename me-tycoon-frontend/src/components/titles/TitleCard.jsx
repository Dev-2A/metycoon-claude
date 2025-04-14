import React from 'react';
import { Crown } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const TitleCard = ({ title, onEquip, onUnequip }) => {
    return (
        <div className={`p-4 rounded-lg ${
            title.equipped ? 'bg-yellow-900/40' : 'bg-gray-700'
        }`}>
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center">
                        <h3 className="font-medium">{title.title.name}</h3>
                        {title.equipped && (
                            <Crown size={16} className="ml-2 text-yellow-400" />
                        )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{title.title.description}</p>
                    <div className="text-sm text-gray-400 mt-2">
                        획득일: {formatDate(title.unlocked_at)}
                    </div>
                </div>
                {title.equipped ? (
                    <button
                        onClick={onUnequip}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm font-medium self-start"
                    >
                        해제
                    </button>
                ) : (
                    <button
                        onClick={onEquip}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm font-medium self-start"
                    >
                        착용
                    </button>
                )}
            </div>
        </div>
    );
};

export default TitleCard;