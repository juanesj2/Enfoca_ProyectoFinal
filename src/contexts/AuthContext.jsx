import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Obtenemos los datos frescos del usuario
                const response = await axios.get('/usuario');
                setUser(response.data.data || response.data);
            } catch (error) {
                console.error("Error cargando el usuario", error);
                localStorage.removeItem('auth_token');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('auth_token', token);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.post('/logout');
        } catch (e) {
            // Ignorar si falla, igual cerramos sesión localmente
        }
        localStorage.removeItem('auth_token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
