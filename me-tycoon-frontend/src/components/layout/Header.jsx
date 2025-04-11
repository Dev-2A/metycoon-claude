import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ stats }) => {
    const { user } = useAuth();

    return (
        <header className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-400">Me Tycoon</h1>
                <div className="flex items-center space-x-4">
                    {stats && (
                        <>
                            <div className="flex items-center">
                                <span className="text-yellow-400 font-bold">Lv.{stats.level}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-400 font-bold">{stats.coin} 코인</span>
                            </div>
                        </>
                    )}
                    <div className="text-sm text-gray-300">
                        {user?.username}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;