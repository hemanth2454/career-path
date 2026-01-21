import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Ideally verify token with backend here, for now just decode or trust if exists
            // For simplicity in this demo, we'll assume valid if present, or fetch profile
            // But let's just set a dummy user or try to fetch profile if we had an endpoint for "me"
            // We'll rely on login to set user for now.
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (username, email, password) => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const updateUserProfile = async (profileData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.put('http://localhost:5000/api/profile', profileData, config);
            // Merge updated profile into user object
            const updatedUser = { ...user, profile: res.data.profile };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true, message: res.data.message };
        } catch (error) {
            console.error('Profile update error:', error);
            if (error.response?.status === 401) {
                logout();
                return { success: false, message: 'Your session has expired. Please login again.' };
            }
            return { success: false, message: error.response?.data?.message || 'Profile update failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, hasProfile: !!user?.profile, updateUserProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
