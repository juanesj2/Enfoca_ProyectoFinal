import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import FloatingWidget from '../Components/FloatingWidget';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showGruposMenu, setShowGruposMenu] = useState(false);

    // Obtenemos la ruta actual para marcar el tab activo en móvil
    const currentPath = window.location.pathname;
    const isActive = (path) => currentPath.startsWith(path);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
            {/* ====================================================
                HEADER: solo visible en pantallas medianas y grandes
            ==================================================== */}
            <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/fotografias" className="flex items-center gap-2">
                                <img src="/imagenes/logo_ENFOKA-sin-fondo.ico" alt="Logo Enfoca" className="w-8 h-8" />
                                <span className="text-2xl font-bold text-gradient">Enfoca</span>
                            </Link>
                        </div>

                        {/* Navegación Central — solo en Desktop (md+) */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/fotografias" className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                Inicio
                            </Link>

                            <a href="/fotografias/create" className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                                Crear
                            </a>

                            <a href="/desafios" className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                                Desafíos
                            </a>

                            {/* Dropdown Grupos en Desktop */}
                            <div className="relative group">
                                <button className="flex items-center text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    Grupos
                                </button>
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

                        {/* Avatar / Botones de Auth — siempre visibles */}
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

            {/* ====================================================
                CONTENIDO PRINCIPAL
                En móvil añadimos padding-bottom para que el tab bar
                no tape el contenido de abajo
            ==================================================== */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8 animate-fade-in-up">
                {children}
            </main>

            {/* Footer — oculto en móvil para no acumularlo con el tab bar */}
            <footer className="hidden md:block glass border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Enfoca. Todos los derechos reservados. Creado con MUCHO cariño por <a href="https://github.com/juanesj2" target="_blank">Juanes😎</a>
                </div>
            </footer>

            {/* ====================================================
                TAB BAR INFERIOR — solo en móvil (md:hidden)
                Estilo Instagram / app nativa
            ==================================================== */}
            <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-gray-200 dark:border-gray-800"
                 style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
                {/* Versión oscura vía CSS variable */}
                <div className="dark:bg-gray-900/85 absolute inset-0 -z-10 dark:block hidden" />

                <div className="flex items-center justify-around h-16 px-2">

                    {/* Tab: Inicio */}
                    <a href="/fotografias" className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors ${isActive('/fotografias') && !isActive('/fotografias/create') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        <svg className="w-6 h-6" fill={isActive('/fotografias') && !isActive('/fotografias/create') ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span className="text-[10px] font-medium">Inicio</span>
                    </a>

                    {/* Tab: Desafíos */}
                    <a href="/desafios" className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors ${isActive('/desafios') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        <svg className="w-6 h-6" fill={isActive('/desafios') ? 'none' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                        </svg>
                        <span className="text-[10px] font-medium">Retos</span>
                    </a>

                    {/* Tab: CREAR (botón central destacado, estilo Instagram) */}
                    <a href="/fotografias/create" className="flex flex-col items-center gap-0.5 px-2 py-1 -mt-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 transition-all hover:scale-105 active:scale-95">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                    </a>

                    {/* Tab: Grupos */}
                    <a href="/grupos" className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors ${isActive('/grupos') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span className="text-[10px] font-medium">Grupos</span>
                    </a>

                    {/* Tab: Perfil */}
                    {auth && auth.user ? (
                        <a href="/profile" className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors ${isActive('/profile') || isActive('/mis-') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm ${isActive('/profile') ? 'ring-2 ring-indigo-500 ring-offset-1' : ''}`}>
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-[10px] font-medium">Perfil</span>
                        </a>
                    ) : (
                        <a href="/login" className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-gray-500 dark:text-gray-400 transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            <span className="text-[10px] font-medium">Entrar</span>
                        </a>
                    )}
                </div>
            </nav>

            <FloatingWidget />
        </div>
    );
}
