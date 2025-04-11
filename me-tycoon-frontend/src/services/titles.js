import { fetchWithAuth } from "./api";

export const getUserTitles = async () => {
    try {
        const response = await fetchWithAuth('/user-titles/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('칭호 목록을 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch titles:', error);
        throw error;
    }
};

export const equipTitle = async (titleId) => {
    try {
        const response = await fetchWithAuth(`/user-titles/${titleId}/equip/`, {
            method: 'POST',
        });

        if (response.ok) {
            return await response.json();
        }

        const errorData = await response.json();
        throw new Error(errorData.error || '칭호 착용에 실패했습니다.');
    } catch (error) {
        console.error('Error equipping title:', error);
        throw error;
    }
};

export const unequipTitle = async (titleId) => {
    try {
        const response = await fetchWithAuth(`/user-titles/${titleId}/unequip/`, {
            method: 'POST',
        });

        if (response.ok) {
            return await response.json();
        }

        const errorData = await response.json();
        throw new Error(errorData.error || '칭호 해제에 실패했습니다.');
    } catch (error) {
        console.error('Error unequipping title:', error);
        throw error;
    }
};