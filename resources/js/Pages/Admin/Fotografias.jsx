import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Fotografias({ fotografias }) {
    const { flash } = usePage().props;

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (confirm('¿Estás seguro de eliminar esta foto?')) {
            router.delete(`/fotografias/${id}`);
        }
    };

    return (
        <MainLayout>
            <Head title="Control de Fotografías" />

            <div className="max-w-7xl mx-auto py-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-xl transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 p-2 rounded-xl">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                Control de Fotografías
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Supervisa y modera todo el contenido multimedia subido a la red.</p>
                        </div>
                    </div>
                </div>

                {/* Mensajes Flash */}
                {flash?.success && (
                    <div className="mb-6 mx-auto p-4 bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-xl backdrop-blur-sm animate-fade-in flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-6 mx-auto p-4 bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-xl backdrop-blur-sm animate-fade-in flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {flash.error}
                    </div>
                )}

                {/* Grid de Fotografías - Layout de Moderación */}
                {!fotografias.data || fotografias.data.length === 0 ? (
                    <div className="glass-panel text-center p-16 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No hay fotografías publicadas aún.</p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in-up">
                        {fotografias.data.map(foto => (
                            <div key={foto.id} className="glass-panel flex flex-col md:flex-row overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl transition-all hover:shadow-xl">
                                
                                {/* Contenedor Imagen Moderada */}
                                <div className="md:w-1/3 shrink-0 relative flex items-center justify-center bg-gray-50 dark:bg-gray-900 group">
                                    <div className="w-full h-0 pb-[75%] relative"> {/* Aspect Ratio 4:3 para el panel de admin */}
                                        <img 
                                            src={`/images/${foto.direccion_imagen}`} 
                                            alt={foto.titulo || 'ControlFoto'}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        {/* Overlay oscuro si está vetada */}
                                        {foto.vetada && (
                                            <div className="absolute inset-0 bg-red-900/40 backdrop-blur-md flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-red-500 mb-2 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-md shadow-md text-sm uppercase tracking-wide">Contenido Vetado</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Info y Controles Moderacion */}
                                <div className="p-6 md:w-2/3 flex flex-col bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800">
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize leading-tight">
                                                {foto.titulo}
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5 mt-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                Autor: <span className="font-semibold text-gray-700 dark:text-gray-300">{foto.user?.name || 'Desconocido'}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2 shrink-0 border border-gray-200 dark:border-gray-800 rounded-xl p-1 bg-gray-50 dark:bg-gray-950">
                                            {/* Editar */}
                                            <a 
                                                href={`/fotografias/${foto.id}/edit`} 
                                                className="btn-primary-outline px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                <span className="hidden sm:inline">Editar</span>
                                            </a>
                                            {/* Eliminar */}
                                            <button 
                                                onClick={(e) => handleDelete(foto.id, e)}
                                                className="btn-danger-outline px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-500 transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                <span className="hidden sm:inline">Eliminar</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 dark:bg-gray-800/20 p-4 rounded-2xl mb-4 border border-gray-100 dark:border-gray-800 flex-grow">
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                            {foto.descripcion}
                                        </p>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 gap-4">
                                        {/* Estadísticas */}
                                        <div className="flex gap-4">
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                                                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> 
                                                {foto.likes_count || 0} Likes
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                                                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> 
                                                {foto.comentarios_count || 0} Comentarios
                                            </span>
                                        </div>
                                        
                                        {/* Link a Fotografía (Frontend) */}
                                        <Link href={`/comentar?fotografia_id=${foto.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                                            Ver publicación pública
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Paginación */}
                {fotografias.links && (
                    <div className="mt-10 flex justify-center gap-2">
                        {fotografias.links.map((link, i) => (
                            <Link 
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border shadow-sm ${link.active ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-800'} ${!link.url ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ))}
                    </div>
                )}

            </div>
        </MainLayout>
    );
}
