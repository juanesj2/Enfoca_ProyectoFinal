import Axios from 'axios';

// Usamos la variable de entorno si existe, sino caemos en el localhost por defecto
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axios = Axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

// Interceptor para añadir el token a cada petición
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores globales (ej. Token expirado)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
