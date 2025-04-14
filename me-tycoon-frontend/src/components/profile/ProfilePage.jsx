import React, { useState } from 'react';
import { X, LogOut } from 'lucide-react';
import { logout } from '../../services/auth';

const ProfilePage = ({ user, onNavigate, onLogout }) => {
    const [confirmLogout, setConfirmLogout] = useState(false);

    const handleLogout = () => {
        if(!confirmLogout) {
            setConfirmLogout(true);
            return;
        }

        logout();
        onLogout();
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">프로필</h2>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
                <div className="text-center mb-6">
                    <div className="inline-block bg-gray-700 p-6 rounded-full mb-3">
                        <span className="text-3xl">{user?.username?.charAt(0).toUpperCase()}</span>
                    </div>
                    <h3 className="text-xl font-bold">{user?.username}</h3>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                        <h4 className="text-sm text-gray-400 mb-1">사용자 이름</h4>
                        <p>{user?.username}</p>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg">
                        <h4 className="text-sm text-gray-400 mb-1">이메일</h4>
                        <p>{user?.email || '등록된 이메일이 없습니다.'}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center justify-center py-3 rounded-lg ${
                        confirmLogout
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    <LogOut size={18} className="mr-2" />
                    {confirmLogout ? '정말 로그아웃 하시겠습니까?' : '로그아웃'}
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;