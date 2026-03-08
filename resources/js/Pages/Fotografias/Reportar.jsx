import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Reportar({ fotografia }) {
    const { data, setData, post, processing, errors } = useForm({
        fotografia_id: fotografia.id,
        motivo: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reportes');
    };

    return (
        <MainLayout>
            <Head title="Reportar Fotografía" />

            <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="glass-panel overflow-hidden border border-red-200 dark:border-red-900/50 rounded-3xl shadow-xl animate-scale-up">
                    
                    {/* Header Pestaña Reporte */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 sm:p-10 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '40px 40px' }}></div>
                        
                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Denunciar Contenido</h1>
                                <p className="text-red-100 max-w-lg">
                                    Ayúdanos a mantener una comunidad segura. Si esta foto infringe nuestras normas, descríbenos el problema a continuación.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-8 sm:p-10 bg-white dark:bg-gray-900">
                        
                        {/* Foto de previsualizacion */}
                        <div className="mb-8 flex flex-col items-center">
                            <div className="relative w-full sm:w-2/3 h-64 rounded-2xl overflow-hidden border-2 border-gray-100 dark:border-gray-800 shadow-sm bg-gray-50 dark:bg-gray-950">
                                <img 
                                    src={`/images/${fotografia.direccion_imagen}`} 
                                    alt="Contenido a reportar" 
                                    className="object-cover absolute inset-0 w-full h-full"
                                />
                            </div>
                            <p className="mt-4 font-semibold text-gray-700 dark:text-gray-300 capitalize text-lg text-center">{fotografia.titulo}</p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <label htmlFor="motivo" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Motivo del reporte <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="motivo"
                                    value={data.motivo}
                                    onChange={e => setData('motivo', e.target.value)}
                                    rows="5"
                                    className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.motivo ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-red-500'} rounded-2xl px-5 py-4 transition-all resize-y shadow-inner dark:text-white dark:placeholder-gray-500 text-gray-900 leading-relaxed`}
                                    placeholder="Explica qué normas de la comunidad crees que se están violando (ej. desnudez explícita, violencia, spam, etc.)"
                                    required
                                />
                                {errors.motivo && <p className="text-red-500 text-sm mt-2 font-medium">{errors.motivo}</p>}
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 my-8" />

                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                                <button 
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Cancelar y Volver
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                            Enviar Reporte
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
