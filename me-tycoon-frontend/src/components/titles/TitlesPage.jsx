import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getUserTitles, equipTitle, unequipTitle } from '../../services/titles';
import TitleCard from './TitleCard';

const TitlesPage = ({ onNavigate }) => {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTitles();
    }, []);

    const fetchTitles = async () => {
        try {
            setIsLoading(true);
            const userTitles = await getUserTitles();
            setTitles(userTitles);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching titles:', error);
            setIsLoading(false);
        }
    };

    const handleEquipTitle = async (titleId) => {
        try {
            setIsLoading(true);
            setMessage('');

            const result = await equipTitle(titleId);
            setMessage(result.message);

            // 데이터 다시 가져오기
            fetchTitles();
        } catch (error) {
            console.error('Error equipping title:', error);
            setMessage(error.message || '칭호 착용에 실패했습니다.');
            setIsLoading(false);
        }
    };

    const handleUnequipTitle = async (titleId) => {
        try {
            setIsLoading(true);
            setMessage('');

            const result = await unequipTitle(titleId);
            setMessage(result.message);

            // 데이터 다시 가져오기
            fetchTitles();
        } catch (error) {
            console.error('Error unequipping title:', error);
            setMessage(error.message || '칭호 해제에 실패했습니다.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">칭호</h2>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-4 mb-6">
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-sm ${
                        message.includes('완료') ? 'bg-green-900/60' : 'bg-red-900/60'
                    }`}>
                        {message}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-4">로딩 중...</div>
                ) : (
                    <div className="space-y-3">
                        {titles.length > 0 ? (
                            titles.map(title => (
                                <TitleCard
                                    key={title.id}
                                    title={title}
                                    onEquip={() => handleEquipTitle(title.id)}
                                    onUnequip={() => handleUnequipTitle(title.id)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-4 text-gray-400">
                                아직 획득한 칭호가 없습니다.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TitlesPage;