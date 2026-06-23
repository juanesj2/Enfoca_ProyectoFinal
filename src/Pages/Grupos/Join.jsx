import React, { useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import axios from '../../lib/axios';

export default function Join() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Unirse a Grupo - Enfoca";
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        codigo_invitacion: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/grupos/unirse', {
            onSuccess: () => navigate('/grupos')
        });
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Alerta Error general (desde form errors) */}
                {errors.general && (
                    <div className="mb-8 p-4 bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-2xl backdrop-blur-sm animate-fade-in flex items-center gap-3 shadow-lg">
                        <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-medium">{errors.general}</span>
                    </div>
                )}

                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl animate-scale-up">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 sm:p-10 relative overflow-hidden">
                        {/* Patrón de fondo sutil */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                        
                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Unirse con Código</h1>
                                <p className="text-blue-100 max-w-md">
                                    Introduce el código de 6 caracteres proporcionado por el creador del grupo para acceder a su contenido.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body Form */}
                    <div className="p-8 sm:p-10 bg-white dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-8">
                            
                            {/* Input Código */}
                            <div className="max-w-xs mx-auto">
                                <label className="block text-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Código de Invitación <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={data.codigo_invitacion}
                                    onChange={e => setData('codigo_invitacion', e.target.value.toUpperCase())}
                                    className={`w-full text-center text-3xl tracking-[0.25em] font-mono uppercase bg-gray-50 dark:bg-gray-950 border ${errors.codigo_invitacion ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500'} rounded-2xl px-4 py-5 shadow-inner transition-colors dark:text-white dark:placeholder-gray-600`}
                                    placeholder="XXXXXX"
                                    maxLength="6"
                                    required
                                />
                                {errors.codigo_invitacion && <p className="text-red-500 text-sm mt-3 text-center font-medium">{errors.codigo_invitacion}</p>}
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800" />

                            {/* Acciones */}
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-2">
                                <Link 
                                    to="/grupos" 
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Cancelar y Volver
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing || data.codigo_invitacion.length < 6}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verificando...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                            Unirse al Grupo
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}