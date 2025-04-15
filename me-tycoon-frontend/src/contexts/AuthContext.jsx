import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserInfo, login as loginService } from '../services/auth';
import { getAuthToken, clearAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = getAuthToken();
            if (token) {
                try {
                    const userData = await getUserInfo();
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error checking auth status:', error);
                    clearAuthToken();
                }
            }
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    // 로그인 함수
    const login = async (username, password) => {
        try {
            const result = await loginService(username, password);

            if (result.success) {
                const userData = await getUserInfo();
                setUser(userData);
                setIsAuthenticated(true);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};