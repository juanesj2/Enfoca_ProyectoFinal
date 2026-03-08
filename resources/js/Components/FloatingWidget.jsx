import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function FloatingWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState('normal');
    
    // Obtener auth del backend a través de Inertia
    const { auth } = usePage().props;

    // Inicializar estado del Dark Mode basándonos en la clase 'dark' en el html (Tailwind)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        }
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const toggleDarkMode = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const toggleFontSize = () => {
        if (fontSize === 'normal') {
            document.documentElement.style.fontSize = '115%'; // Aumenta el tamaño un poco
            setFontSize('large');
        } else {
            document.documentElement.style.fontSize = '100%';
            setFontSize('normal');
        }
    };

    return (
        <div className="fixed bottom-24 md:bottom-6 right-6 z-[100]">
            
            {/* Menú Desplegable Flotante */}
            <div 
                className={`absolute bottom-20 right-0 flex flex-col gap-2 p-3 rounded-2xl shadow-2xl border transition-all duration-300 origin-bottom-right w-[240px] ${
                    isOpen 
                        ? 'opacity-100 scale-100 pointer-events-auto shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]' 
                        : 'opacity-0 scale-90 pointer-events-none'
                } ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
            >
                {/* 1. Toggle Dark Mode */}
                <button 
                    onClick={toggleDarkMode}
                    className={`flex items-center gap-3 w-full text-left p-2.5 rounded-xl transition-colors ${
                        isDarkMode 
                            ? 'text-gray-200 hover:bg-gray-800' 
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    ) : (
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                    <span className="font-semibold text-sm">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>

                {/* 2. Toggle Font Size */}
                <button 
                    onClick={toggleFontSize}
                    className={`flex items-center gap-3 w-full text-left p-2.5 rounded-xl transition-colors ${
                        isDarkMode 
                            ? 'text-gray-200 hover:bg-gray-800' 
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={fontSize === 'normal' ? 'Aumentar tamaño de texto' : 'Restaurar tamaño de texto'}
                >
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" /></svg>
                    <span className="font-semibold text-sm">
                        {fontSize === 'normal' ? 'Texto más grande' : 'Texto normal'}
                    </span>
                </button>

                {/* 3. Links Auxiliares de Auth */}
                <hr className={`my-1 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />
                
                {auth?.user ? (
                    <>
                        {auth.user.rol === 'admin' && (
                            <Link 
                                href="/admin"
                                className={`flex items-center gap-3 w-full text-left p-2.5 rounded-xl transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="font-semibold text-sm">Ajustes Admin</span>
                            </Link>
                        )}
                        <Link 
                            href="/logout"
                            method="post"
                            as="button"
                            className={`flex items-center gap-3 w-full text-left p-2.5 rounded-xl transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            <span className="font-semibold text-sm">Cerrar Sesión</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link 
                            href="/login"
                            className={`flex items-center gap-3 w-full text-left p-2.5 rounded-xl transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                            <span className="font-semibold text-sm">Iniciar Sesión</span>
                        </Link>
                    </>
                )}
            </div>

            {/* Botón Principal de la Bola Flotante */}
            <button
                onClick={toggleOpen}
                className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{ zIndex: 110 }}
            >
                {/* Icono animado dependiendo del estado */}
                <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                </div>
            </button>
            
        </div>
    );
}
