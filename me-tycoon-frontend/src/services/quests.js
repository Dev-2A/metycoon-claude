import { fetchWithAuth } from './api';

export const getAllQuests = async () => {
    try {
        const response = await fetchWithAuth('/quests/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('퀘스트 목록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch quests', error);
        throw error;
    }
};

export const getQuestCompletions = async () => {
    try {
        const response = await fetchWithAuth('/quest-completions/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('퀘스트 완료 목록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch quest completions:', error);
        throw error;
    }
};

export const completeQuest = async (questId) => {
    try {
        const response = await fetchWithAuth('/quest-completions/', {
            method: 'POST',
            body: JSON.stringify({ quest: questId }),
        });

        if (response.ok) {
            return await response.json();
        }

        const errorData = await response.json();
        throw new Error(errorData.error || '퀘스트 완료에 실패했습니다.');
    } catch (error) {
        console.error('Error completing quest:', error);
        throw error;
    }
};

export const getQuestStats = async () => {
    try {
        const response = await fetchWithAuth('/quest-stats/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('퀘스트 통계를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch quest stats:', error);
    }
};