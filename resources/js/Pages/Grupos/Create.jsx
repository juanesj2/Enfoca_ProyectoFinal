import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/grupos');
    };

    return (
        <MainLayout>
            <Head title="Crear Grupo" />

            <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl animate-fade-in-up">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 sm:p-10 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Crear Nuevo Grupo</h1>
                                <p className="text-indigo-100 max-w-lg">
                                    Inicia tu propia comunidad fotográfica. Invita a diseñadores, modelos u otros fotógrafos a colaborar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body Form */}
                    <div className="p-8 sm:p-10 bg-white dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Nombre del Grupo */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre del Grupo <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.nombre ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'} rounded-xl px-4 py-3 transition-colors dark:text-white dark:placeholder-gray-500 shadow-sm`}
                                    placeholder="Ej: Exploradores Urbanos Madrid"
                                    required
                                />
                                {errors.nombre && <p className="text-red-500 text-sm mt-2">{errors.nombre}</p>}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Descripción <span className="text-gray-400 font-normal">(Opcional)</span>
                                </label>
                                <textarea 
                                    value={data.descripcion}
                                    onChange={e => setData('descripcion', e.target.value)}
                                    rows="4"
                                    className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.descripcion ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'} rounded-xl px-4 py-3 transition-colors resize-y dark:text-white dark:placeholder-gray-500 shadow-sm`}
                                    placeholder="¿Cuál es el propósito de este grupo? ¿Qué tipo de fotografías se compartirán?"
                                />
                                {errors.descripcion && <p className="text-red-500 text-sm mt-2">{errors.descripcion}</p>}
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 my-8" />

                            {/* Acciones */}
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                                <Link 
                                    href="/grupos" 
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Cancelar y Volver
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creando...
                                        </span>
                                    ) : 'Crear Grupo'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
