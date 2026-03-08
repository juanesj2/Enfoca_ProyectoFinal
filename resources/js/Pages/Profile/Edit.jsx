import React, { useState, useRef } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // --- FORM 1: Información del Perfil ---
    const { 
        data: profileData, 
        setData: setProfileData, 
        patch: patchProfile, 
        errors: profileErrors, 
        processing: profileProcessing, 
        recentlySuccessful: profileSuccessful 
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const updateProfile = (e) => {
        e.preventDefault();
        patchProfile('/profile');
    };

    // --- FORM 2: Contraseña ---
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { 
        data: pwdData, 
        setData: setPwdData, 
        errors: pwdErrors, 
        put: putPassword, 
        processing: pwdProcessing, 
        recentlySuccessful: pwdSuccessful, 
        reset: resetPwd 
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        putPassword('/password', {
            preserveScroll: true,
            onSuccess: () => resetPwd(),
            onError: (errors) => {
                if (errors.password) {
                    resetPwd('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    resetPwd('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    // --- FORM 3: Eliminar Cuenta ---
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const deletePasswordInput = useRef();

    const { 
        data: delData, 
        setData: setDelData, 
        delete: destroyUser, 
        processing: delProcessing, 
        reset: resetDel, 
        errors: delErrors 
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
        setTimeout(() => deletePasswordInput.current?.focus(), 250);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroyUser('/profile', {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => deletePasswordInput.current?.focus(),
            onFinish: () => resetDel(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        resetDel();
    };

    return (
        <MainLayout>
            <Head title="Mi Perfil" />

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in-up">
                
                {/* Header Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-xl border-4 border-white dark:border-gray-800">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Mi Perfil
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                            Administra tu información personal y opciones de seguridad.
                        </p>
                    </div>
                </div>

                {/* Formulario 1: Actualizar Perfil */}
                <section className="glass-panel p-8 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white/50 dark:bg-gray-900/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    
                    <header className="mb-6 relative z-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            Información del Perfil
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Actualiza la información de tu cuenta y la dirección de correo electrónico.
                        </p>
                    </header>

                    <form onSubmit={updateProfile} className="space-y-6 relative z-10 max-w-xl">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                            <input
                                id="name"
                                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={profileData.name}
                                onChange={(e) => setProfileData('name', e.target.value)}
                                required
                                autoComplete="name"
                            />
                            {profileErrors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{profileErrors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={profileData.email}
                                onChange={(e) => setProfileData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            {profileErrors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{profileErrors.email}</p>}
                            
                            {mustVerifyEmail && user.email_verified_at === null && (
                                <div className="mt-2">
                                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                        Tu dirección de correo electrónico no está verificada.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                disabled={profileProcessing}
                                className="inline-flex items-center px-6 py-2.5 bg-indigo-600 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            >
                                Guardar Cambios
                            </button>

                            {profileSuccessful && (
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1 animate-fade-in">
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    Guardado.
                                </span>
                            )}
                        </div>
                    </form>
                </section>

                {/* Formulario 2: Actualizar Contraseña */}
                <section className="glass-panel p-8 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white/50 dark:bg-gray-900/50 shadow-sm relative overflow-hidden">
                    <header className="mb-6 relative z-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                            Actualizar Contraseña
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Asegúrate de usar una contraseña larga y aleatoria para mantener tu cuenta segura.
                        </p>
                    </header>

                    <form onSubmit={updatePassword} className="space-y-6 relative z-10 max-w-xl">
                        <div>
                            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña Actual</label>
                            <input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={pwdData.current_password}
                                onChange={(e) => setPwdData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                                autoComplete="current-password"
                            />
                            {pwdErrors.current_password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{pwdErrors.current_password}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nueva Contraseña</label>
                            <input
                                id="password"
                                ref={passwordInput}
                                value={pwdData.password}
                                onChange={(e) => setPwdData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                                autoComplete="new-password"
                            />
                            {pwdErrors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{pwdErrors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Contraseña</label>
                            <input
                                id="password_confirmation"
                                value={pwdData.password_confirmation}
                                onChange={(e) => setPwdData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                                autoComplete="new-password"
                            />
                            {pwdErrors.password_confirmation && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{pwdErrors.password_confirmation}</p>}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                disabled={pwdProcessing}
                                className="inline-flex items-center px-6 py-2.5 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-xl font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            >
                                Cambiar Contraseña
                            </button>

                            {pwdSuccessful && (
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1 animate-fade-in">
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    Actualizada.
                                </span>
                            )}
                        </div>
                    </form>
                </section>

                {/* Formulario 3: Eliminar Cuenta */}
                <section className="glass-panel p-8 border border-red-200 dark:border-red-900/50 rounded-3xl bg-red-50/30 dark:bg-red-900/10 shadow-sm relative overflow-hidden">
                    <header className="mb-6 relative z-10">
                        <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            Borrar Cuenta
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Una vez eliminada tu cuenta, todos tus recursos, publicaciones y datos se borrarán permanentemente.
                        </p>
                    </header>

                    <div className="relative z-10">
                        <button
                            onClick={confirmUserDeletion}
                            className="inline-flex items-center px-6 py-2.5 bg-red-600 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Eliminar Cuenta Definitivamente
                        </button>
                    </div>

                    {/* Modal Confirmación Borrado */}
                    {confirmingUserDeletion && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4 animate-fade-in">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
                                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    ¿Estás completamente seguro?
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                    Una vez eliminada tu cuenta, no hay marcha atrás. Por favor introduce tu contraseña para confirmar que deseas eliminar tu cuenta de forma permanente.
                                </p>

                                <form onSubmit={deleteUser}>
                                    <div className="mb-6">
                                        <label htmlFor="password_delete" className="sr-only">Contraseña</label>
                                        <input
                                            id="password_delete"
                                            ref={deletePasswordInput}
                                            value={delData.password}
                                            onChange={(e) => setDelData('password', e.target.value)}
                                            type="password"
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                                            placeholder="Contraseña Actual"
                                        />
                                        {delErrors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{delErrors.password}</p>}
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={delProcessing}
                                            className="px-6 py-2.5 bg-red-600 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                        >
                                            Eliminar Cuenta
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
}
