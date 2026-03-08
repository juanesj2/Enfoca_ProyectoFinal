import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function UsuarioEdit({ usuario, estaVetado, tiempoRestante, vetadoHasta }) {
    const { data, setData, put, processing, errors } = useForm({
        name: usuario.name || '',
        email: usuario.email || '',
        rol: usuario.rol || 'usuario',
        vetado: 0, // Minutos de veto a añadir
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/usuarios/${usuario.id}`);
    };

    const handleAmnistia = () => {
        if (confirm('¿Estás seguro de que quieres quitar el veto a este usuario inmediatamente?')) {
            setData('vetado', 0);
            router.put(`/usuarios/${usuario.id}`, { ...data, vetado: 0 });
        }
    };

    return (
        <MainLayout>
            <Head title={`Editar Usuario: ${usuario.name}`} />

            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/controlUsuarios" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-xl transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
                        Editar Información de Usuario
                    </h1>
                </div>

                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl">
                    
                    {estaVetado && (
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex gap-4">
                                <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-2 rounded-full shrink-0 h-min">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-800 dark:text-red-400">Usuario actualmente restringido (Veto Muteado)</h3>
                                    <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                                        Estará vetado hasta el <strong>{vetadoHasta}</strong> (Faltan {tiempoRestante}).
                                    </p>
                                </div>
                            </div>
                            <button onClick={handleAmnistia} type="button" className="btn-primary-outline bg-white dark:bg-gray-800 text-red-600 hover:bg-red-50 border border-red-200 shrink-0 shadow-sm py-2 px-4 rounded-xl font-bold sm:self-center transition-colors">
                                Quitar Veto Ahora
                            </button>
                        </div>
                    )}

                    <div className="p-8 bg-white dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ID Solo lectura */}
                                <div className="md:col-span-2 relative">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-400 mb-2">ID Sistema (Solo lectura)</label>
                                    <input 
                                        type="text" 
                                        value={usuario.id} 
                                        disabled 
                                        className="w-full bg-gray-100 dark:bg-gray-800 border-none text-gray-500 dark:text-gray-500 rounded-2xl px-5 py-3 font-mono cursor-not-allowed select-none"
                                    />
                                    <div className="absolute top-10 right-4 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </div>
                                </div>

                                {/* Nombre */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre Alias</label>
                                    <input 
                                        id="name"
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.name ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500'} rounded-2xl px-5 py-3 transition-colors text-gray-900 dark:text-white font-medium`}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Correo Electrónico</label>
                                    <input 
                                        id="email"
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)} 
                                        className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.email ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500'} rounded-2xl px-5 py-3 transition-colors text-gray-900 dark:text-white font-medium`}
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Rol */}
                                <div>
                                    <label htmlFor="rol" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Privilegios (Rol)</label>
                                    <div className="relative">
                                        <select 
                                            id="rol"
                                            value={data.rol} 
                                            onChange={e => setData('rol', e.target.value)} 
                                            className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.rol ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500'} rounded-2xl px-5 py-3 transition-colors text-gray-900 dark:text-white font-medium`}
                                            required
                                        >
                                            <option value="usuario">Usuario Estándar</option>
                                            <option value="admin">Administrador Total</option>
                                        </select>
                                    </div>
                                    {errors.rol && <p className="text-red-500 text-sm mt-1">{errors.rol}</p>}
                                </div>

                                {/* Vetado Input */}
                                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                                    <label htmlFor="vetado" className="block text-sm font-bold text-orange-800 dark:text-orange-400 mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Aplicar Nuevo Veto (Minutos)
                                    </label>
                                    <input 
                                        id="vetado"
                                        type="number" 
                                        min="0"
                                        value={data.vetado} 
                                        onChange={e => setData('vetado', e.target.value)} 
                                        className={`w-full bg-white dark:bg-gray-900 border ${errors.vetado ? 'border-red-400' : 'border-orange-200 dark:border-orange-800/50'} rounded-xl px-5 py-3 transition-colors text-gray-900 dark:text-white font-mono`}
                                    />
                                    <p className="text-xs text-orange-600 dark:text-orange-500 mt-2 italic">
                                        Ingresa los minutos de sanción desde el momento exacto en que guardes cambios. Poner "0" no elimina el veto actual, usar el botón de arriba sí.
                                    </p>
                                    {errors.vetado && <p className="text-red-500 text-sm mt-1">{errors.vetado}</p>}
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 my-8" />

                            <div className="flex justify-end gap-4">
                                <Link 
                                    href="/admin/controlUsuarios"
                                    className="px-6 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancelar
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-8 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Guardando...' : 'Aplicar Cambios'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
