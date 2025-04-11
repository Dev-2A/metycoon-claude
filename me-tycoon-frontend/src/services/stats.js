import { fetchWithAuth } from './api';

export const getUserStats = async () => {
    try {
        const response = await fetchWithAuth('/stats/');
        if (response.ok) {
            const stats = await response.json();
            return stats[0]; // API가 배열로 반환하므로 첫 번째 항목 사용
        }
        throw new Error('사용자 통계를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch user stats:', error);
        throw error;
    }
};

export const getWeeklyQuestHistory = async () => {
    try {
        const response = await fetchWithAuth('/quest-history/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('주간 퀘스트 기록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch weekly quest history:', error);
        throw error;
    }
};

export const getMonthlyStats = async () => {
    try {
        const response = await fetchWithAuth('/monthly-stats/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('월간 통계를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch monthly stats:', error);
        throw error;
    }
};

export const getQuestTypeStats = async () => {
    try {
        const response = await fetchWithAuth('/quest-type-stats/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('퀘스트 유형별 통계를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch quest type stats:', error);
        throw error;
    }
};

export const getTopQuests = async () => {
    try {
        const response = await fetchWithAuth('/top-quests/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('최다 완료 퀘스트를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch top quests:', error);
        throw error;
    }
};

export const getSummaryStats = async () => {
    try {
        const response = await fetchWithAuth('/summary-stats/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('요약 통계를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch summary stats:', error);
        throw error;
    }
};