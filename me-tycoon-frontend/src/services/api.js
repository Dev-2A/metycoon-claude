// 백엔드 API 연동을 위한 기본 설정
const API_BASE_URL = 'http://localhost:8000/api';

// 인증 토큰 관리
export const getAuthToken = () => localStorage.getItem('authToken');
export const setAuthToken = (token) => localStorage.setItem('authToken', token);
export const clearAuthToken = () => localStorage.removeItem('authToken');

// API 요청 함수
export const fetchWithAuth = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };

    console.log(`API 욫청: ${API_BASE_URL}${url}`, {
        headers,
        method: options.method || 'GET',
        body: options.body
    });

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers
        });

        if (response.status === 401) {
            console.error('인증 오류 발생 (401)')
            clearAuthToken();
            throw new Error('인증이 필요합니다.');
        }

        console.log(`API 응답: ${response.status}`, response.ok);
        return response;
    } catch (error) {
        console.error(`API 호출 오류: ${url}`, error);
        throw error;
    }
};