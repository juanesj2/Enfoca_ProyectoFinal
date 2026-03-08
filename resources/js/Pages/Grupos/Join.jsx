import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Join() {
    const { data, setData, post, processing, errors } = useForm({
        codigo_invitacion: '',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post('/grupos/unirse');
    };

    return (
        <MainLayout>
            <Head title="Unirse a Grupo" />

            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Alerta Error */}
                {flash?.error && (
                    <div className="mb-8 p-4 bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-2xl backdrop-blur-sm animate-fade-in flex items-center gap-3 shadow-lg">
                        <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl animate-scale-up">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white p-8 sm:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white/5">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Unirse a un Grupo</h1>
                            <p className="text-gray-300 max-w-sm mx-auto">
                                Colabora y comparte tu pasión por la fotografía.
                            </p>
                        </div>
                    </div>

                    {/* Body Form */}
                    <div className="p-8 sm:p-10 bg-white dark:bg-gray-900 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                            Pide al administrador del grupo que te envíe el <strong className="text-gray-900 dark:text-white font-semibold">Código de Invitación</strong> y escríbelo a continuación.
                        </p>
                        
                        <form onSubmit={submit} className="max-w-sm mx-auto space-y-6">
                            
                            {/* Input Código */}
                            <div>
                                <input 
                                    type="text" 
                                    value={data.codigo_invitacion}
                                    onChange={e => setData('codigo_invitacion', e.target.value)}
                                    className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.codigo_invitacion ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500'} rounded-2xl px-4 py-4 text-center text-2xl font-mono tracking-widest text-gray-900 dark:text-white uppercase transition-all shadow-inner focus:outline-none focus:ring-2`}
                                    placeholder="X X X X X X"
                                    required
                                    autoComplete="off"
                                />
                                {errors.codigo_invitacion && <p className="text-red-500 text-sm mt-3 font-medium">{errors.codigo_invitacion}</p>}
                            </div>

                            {/* Botón Unirse */}
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift flex justify-center items-center gap-2 text-lg"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                {processing ? 'Verificando...' : 'Unirse Ahora'}
                            </button>
                            
                            <div className="pt-4">
                                <Link 
                                    href="/grupos" 
                                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors inline-flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Cancelar y volver a mis grupos
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
