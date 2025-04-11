import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserInfo } from '../services/auth';
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
                    clearAuthToken();
                }
            }
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}