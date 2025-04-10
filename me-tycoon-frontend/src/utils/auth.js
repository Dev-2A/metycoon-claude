export const getToken = () => localStorage.getItem('access_token');

export const setToken = (token) => {
    if (token) {
        localStorage.setItem('access_token', token);
    } else {
        localStorage.removeItem('access_token');
    }
};

export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const setRefreshToken = (token) => {
    if (token) {
        localStorage.setItem('refresh_token', token);
    } else {
        localStorage.removeItem('refresh_token');
    }
};

export const isAuthenticated = () => !!getToken();