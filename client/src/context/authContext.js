import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [admin, setAdmin] = useState(null);
    const login = async (inputs) => {
        const res = await axios.post('/api/auth/login', inputs, {
            withCredentials: true,
        });
        setCurrentUser(res.data);
    };
    const loginAdmin = async (inputs) => {
        const res = await axios.post('/api/admin/login', inputs, {
            withCredentials: true,
        });
        setAdmin(res.data);
    };
    const logout = async () => {
        await axios.post('/api/auth/logout');
        setCurrentUser(null);
        // Lấy giá trị của 2 trường từ localStorage
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        const rememberedCheckbox = localStorage.getItem('rememberedCheckbox');

        // Xóa toàn bộ dữ liệu trong localStorage
        localStorage.clear();

        // Đặt lại 2 trường rememberedUsername và rememberedPassword
        localStorage.setItem('rememberedUsername', rememberedUsername);
        localStorage.setItem('rememberedPassword', rememberedPassword);
        localStorage.setItem('rememberedCheckbox', rememberedCheckbox);
    };
    const logoutAdmin = async () => {
        await axios.post('api/admin/logout');
        setAdmin(null);
    };
    const updateUserProfile = async (updatedUser) => {
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);
    return (
        <AuthContext.Provider value={{ currentUser, admin, loginAdmin, login, logout, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
