import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import FloatingWidget from '../Components/FloatingWidget';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
            {/* Header / Navbar con Glassmorphism */}
            <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo / Título */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/fotografias" className="flex items-center gap-2">
                                <img src="/imagenes/logo_ENFOKA-sin-fondo.ico" alt="Logo Enfoca" className="w-8 h-8" />
                                <span className="text-2xl font-bold text-gradient">
                                    Enfoca
                                </span>
                            </Link>
                        </div>

                        {/* Navegación Centrada */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/fotografias" className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                Inicio
                            </Link>
                            
                            {/* Usamos etiqueta <a> estándar para vistas no migradas a React (Blade) */}
                            <a href="/fotografias/create" className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                                Crear
                            </a>
                            
                            <a href="/desafios" className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                                Desafíos
                            </a>

                            <div className="relative group">
                                <button className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    Grupos
                                </button>
                                {/* Dropdown de Grupos */}
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <a href="/grupos" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Mis grupos</a>
                                    <a href="/grupos/create" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Crear grupo</a>
                                    <a href="/grupos/unirse" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Unirse a grupo</a>
                                </div>
                            </div>

                            {auth?.user?.rol === 'admin' && (
                                <a href="/admin" className="flex items-center text-yellow-600 hover:text-yellow-500 px-3 py-2 text-sm font-bold transition-colors">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                                    Admin
                                </a>
                            )}
                        </nav>

                        {/* Perfil de Usuario / Autenticación */}
                        <div className="flex items-center space-x-4">
                            {auth && auth.user ? (
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition-colors focus:outline-none"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:inline-block">{auth.user.name}</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                                    </button>

                                    {/* Menú de Perfil */}
                                    {showProfileMenu && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                                            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Mi perfil</a>
                                            <a href="/mis-fotografias" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Mis publicaciones</a>
                                            <a href="/mis-desafios" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Mis desafios</a>
                                            <a href="/grupos" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Mis grupos</a>
                                            <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                            <button 
                                                onClick={() => router.post('/logout')}
                                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-x-4">
                                    <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                        Entrar
                                    </a>
                                    <a href="/register" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover-lift">
                                        Registrarse
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
                {children}
            </main>

            {/* Footer Minimalista */}
            <footer className="glass border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Enfoca. Todos los derechos reservados. Creado con MUCHO cariño por <a href="https://github.com/juanesj2" target='_blank'>Juanes😎</a>
                </div>
            </footer>
            
            <FloatingWidget />
        </div>
    );
}
