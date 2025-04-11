import { fetchWithAuth } from './api';

export const getAllRewards = async () => {
    try {
        const response = await fetchWithAuth('/rewards/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('보상 목록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch rewards:', error);
        throw error;
    }
};

export const getUserRewards = async () => {
    try {
        const response = await fetchWithAuth('/user-rewards/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('사용자 보상 목록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch user rewards:', error);
        throw error;
    }
};

export const purchaseReward = async (rewardId) => {
    try {
        const response = await fetchWithAuth('/user-rewards/', {
            method: 'POST',
            body: JSON.stringify({ reward: rewardId }),
        });

        if (response.ok) {
            return await response.json();
        }

        const errorData = await response.json();
        throw new Error(errorData.error || '보상 구매에 실패했습니다.');
    } catch (error) {
        console.error('Error purchasing reward:', error);
        throw error;
    }
};

export const useReward = async (userRewardId) => {
    try {
        const response = await fetchWithAuth(`/user-rewards/${userRewardId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return { success: true };
        }

        throw new Error('보상 사용에 실패했습니다.');
    } catch (error) {
        console.error('Error using reward:', error);
        throw error;
    }
};