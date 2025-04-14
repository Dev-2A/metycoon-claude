import { fetchWithAuth, setAuthToken, clearAuthToken } from './api';

const API_BASE_URL = 'http://localhost:8000/api';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setAuthToken(data.access);
            return { success: true };
        } else {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.detail || '로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하세요.'
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: '서버 연결에 실패했습니다.' };
    }
};

export const register = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            return { success: true, message: '회원가입에 성공했습니다. 로그인해주세요.' };
        } else {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.username || errorData.password || '회원가입에 실패했습니다.'
            };
        }
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: '서버 연결에 실패했습니다.' };
    }
};

export const getUserInfo = async () => {
    try {
        const response = await fetchWithAuth('/user-info/');
        if (response.ok) {
            return await response.json();
        }
        throw new Error('사용자 정보를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        throw error;
    }
};

export const logout = () => {
    clearAuthToken();
}