import { fetchWithAuth, setAuthToken, clearAuthToken } from './api';

const API_BASE_URL = 'https://me-tycoon-backend.onrender.com/api';

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
            setAuthToken(data.access); // 액세스 토큰 저장
            localStorage.setItem('refreshToken', data.referesh); // 리프레시 토큰도 저장
            return { success: true };
        } else {
            const errorData = await response.json();
            console.error('Login error response:', errorData);
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

        const responseData = await response.json();

        if (response.ok) {
            console.log('Registration successful:', responseData);
            return { success: true, message: '회원가입에 성공했습니다. 로그인해주세요.' };
        } else {
            console.error('Registration failed:', responseData);
            // 응답 에러 메시지 처리
            let errorMessage = '회원가입에 실패했습니다.';
            if (responseData.username) {
                errorMessage = Array.isArray(responseData.username)
                    ? responseData.username[0]
                    : responseData.username;
            } else if (responseData.password) {
                errorMessage = Array.isArray(responseData.password)
                    ? responseData.password[0]
                    : responseData.password;
            } else if (responseData.non_field_errors) {
                errorMessage = Array.isArray(responseData.non_field_errors)
                    ? responseData.non_field_errors[0]
                    : responseData.non_field_errors;
            }

            return {success: false, message: errorMessage};
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

        console.error('Failed to fetch user info:', await response.text());
        throw new Error('사용자 정보를 불러오는데 실패했습니다.');
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        throw error;
    }
};

export const logout = () => {
    clearAuthToken();
    localStorage.removeItem('refreshToken');
};