import { fetchWithAuth } from './api';

export const getUserAchievements = async () => {
    try {
        const response = await fetchWithAuth('/user-achievements/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('업적 목록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch achievements:', error);
        throw error;
    }
};