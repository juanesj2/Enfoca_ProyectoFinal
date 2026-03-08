import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

            {/* Fondo con el degradado premium del proyecto */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-950 dark:via-indigo-950/30 dark:to-gray-900 flex items-center justify-center p-4">

                {/* Decoraciones de fondo */}
                <div className="fixed top-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
                <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48" />

                <div className="w-full max-w-md animate-fade-in-up">
                    
                    {/* Logo y Título */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3 mb-4">
                            <img src="/imagenes/logo_ENFOKA-sin-fondo.ico" alt="Logo Enfoca" className="w-12 h-12" />
                            <span className="text-4xl font-extrabold text-gradient">Enfoca</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Tu comunidad fotográfica premium
                        </p>
                    </div>

                    {/* Tarjeta del formulario */}
                    <div className="glass-panel bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-gray-800 rounded-3xl shadow-2xl p-8">
                        
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Bienvenido de nuevo</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Inicia sesión para continuar explorando</p>

                        {/* Mensaje de estado (ej. contraseña restablecida) */}
                        {status && (
                            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl text-sm">
                                {status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Campo Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-4.5 h-4.5 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                                        placeholder="tu@email.com"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                            </div>

                            {/* Campo Contraseña */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full pl-11 pr-11 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                    />
                                    {/* Botón mostrar/ocultar contraseña */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            {/* Recordarme + Olvidé contraseña */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                        Recordarme
                                    </span>
                                </label>
                                <Link href="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Botón de Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    <>
                                        Iniciar Sesión
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Link al Registro */}
                    <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                            Regístrate gratis
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
