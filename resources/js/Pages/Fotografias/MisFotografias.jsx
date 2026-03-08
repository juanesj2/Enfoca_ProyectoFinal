import React, { useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function MisFotografias({ misFotografias }) {
    const defaultImageFallback = '/images/placeholder.png'; // En caso de que se necesite
    const fotos = Array.isArray(misFotografias) ? misFotografias : Object.values(misFotografias);

    const deleteFotografia = (id, e) => {
        e.preventDefault();
        if (confirm('¿Estás seguro de que deseas eliminar tu publicación? Esto no se puede deshacer.')) {
            router.delete(`/fotografias/${id}`);
        }
    };

    const downloadPDF = (id, e) => {
        e.preventDefault();
        window.open(`/fotografia/${id}/pdf`, '_blank');
    };

    const sendEmail = (id, e) => {
        e.preventDefault();
        // Dispara la llamada post enviando el ID de la foto, usando router.post
        router.post('/enviar-correo', { foto_id: id }, {
            preserveScroll: true,
            onSuccess: () => alert("¡Correo enviado exitosamente con los detalles!"),
            onError: () => alert("Hubo un error al intentar enviar el correo. Verifica tu configuración.")
        });
    };

    return (
        <MainLayout>
            <Head title="Mis Fotografías" />

            <div className="max-w-7xl mx-auto py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                            Mis Publicaciones
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Administra tu portafolio, visualiza tus métricas y gestiona el contenido que compartes con la comunidad.
                        </p>
                    </div>
                    <Link href="/fotografias/create" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 hover-lift whitespace-nowrap">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Subir Nueva Foto
                    </Link>
                </div>

                {/* Grid de Fotos Propias */}
                {fotos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
                        {fotos.map((foto) => (
                            <div key={foto.id} className="glass-panel group overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:shadow-2xl hover-lift flex flex-col">
                                {/* Contenedor Imagen */}
                                <Link href={`/comentar?fotografia_id=${foto.id}`} className="relative aspect-square block overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img 
                                        src={`/images/${foto.direccion_imagen}`} 
                                        alt={foto.titulo || 'Mifotografia'}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => { e.target.onError = null; e.target.src = defaultImageFallback; }}
                                    />
                                    {foto.vetada && (
                                        <div className="absolute inset-0 bg-red-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                                            <div className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                Oculta por Moderación
                                            </div>
                                        </div>
                                    )}
                                    {/* Overlay hover */}
                                    {!foto.vetada && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/50">
                                                Ver Detalles
                                            </span>
                                        </div>
                                    )}
                                </Link>

                                {/* Contenido debajo */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white capitalize mb-1 line-clamp-1">{foto.titulo}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
                                        Subida el {new Date(foto.created_at).toLocaleDateString()}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center relative gap-2">
                                        <div className="flex gap-3 text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1.5 text-sm font-medium" title="Me gustas"><svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> {foto.likes_count || 0}</span>
                                            <span className="flex items-center gap-1.5 text-sm font-medium" title="Comentarios"><svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> {foto.comentarios_count || 0}</span>
                                        </div>
                                        
                                        <div className="flex gap-1 items-center">
                                            {/* Reporte PDF */}
                                            <button 
                                                onClick={(e) => downloadPDF(foto.id, e)}
                                                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-50 hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-lg transition-all"
                                                title="Descargar Informe en PDF"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM10 18v-4h4m-4 0l2-2m-2 2l2 2" /></svg>
                                            </button>

                                            {/* Reporte Email */}
                                            <button 
                                                onClick={(e) => sendEmail(foto.id, e)}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-lg transition-all"
                                                title="Enviar reporte por Correo"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </button>

                                            {/* Eliminar Foto */}
                                            <button 
                                                onClick={(e) => deleteFotografia(foto.id, e)}
                                                className="text-red-400 hover:text-white bg-red-50 hover:bg-red-500 dark:bg-red-900/40 dark:hover:bg-red-600 p-2 rounded-lg transition-all"
                                                title="Eliminar publicación"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State O no hay fotos */
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm mt-12 animate-slide-up">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No tienes publicaciones aún</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                            Aún no has compartido ninguna de tus capturas maestras. Comienza a subir fotos ahora para unirte a la inspiración de Enfoca.
                        </p>
                        <Link href="/fotografias/create" className="inline-flex bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all items-center gap-2 hover-lift">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            Subir mi primera fotografía
                        </Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
