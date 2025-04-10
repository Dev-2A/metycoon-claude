import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

// ✅ 요청마다 자동으로 access_token 포함
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ 토큰 만료 시 자동 갱신 처리 (나중에 추가 가능)
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = localStorage.getItem('refresh_token');
//                 const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
//                 const { access } = response.data;
//                 localStorage.setItem('access_token', access);
//                 originalRequest.headers.Authorization = `Bearer ${access}`;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 // 리프레시 토큰도 만료된 경우 로그아웃 처리
//                 localStorage.removeItem('access_token');
//                 localStorage.removeItem('refresh_token');
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;