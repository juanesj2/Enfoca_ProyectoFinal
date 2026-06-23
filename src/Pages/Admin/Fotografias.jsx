import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link } from 'react-router-dom';
import axios from '../../lib/axios';

export default function Fotografias() {
    const [fotografias, setFotografias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const imageBaseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000';

    useEffect(() => {
        document.title = "Control de Fotografías - Enfoca";
        fetchFotografias();
    }, []);

    const fetchFotografias = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/admin/fotografias');
            setFotografias(res.data.data || res.data);
        } catch (error) {
            console.error("Error fetching admin fotografias:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        if (window.confirm('¿Estás seguro de que quieres eliminar esta fotografía? Esta acción es irreversible.')) {
            try {
                await axios.delete(`/fotografias/${id}`);
                setFotografias(fotografias.filter(f => f.id !== id));
            } catch (error) {
                console.error("Error eliminando fotografía:", error);
                alert("Hubo un error al eliminar la fotografía.");
            }
        }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 animate-fade-in-up">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2.5 bg-white dark:bg-gray-800 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:-translate-x-1">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize flex items-center gap-3">
                                Control de Fotografías
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Supervisa y modera todo el contenido subido por los usuarios.</p>
                        </div>
                    </div>
                </div>

                {/* Grid Listado */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <svg className="animate-spin w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    </div>
                ) : !fotografias || fotografias.length === 0 ? (
                    <div className="glass-panel p-16 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-3xl animate-fade-in">
                        <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-2xl font-medium mb-2 text-gray-900 dark:text-white">Sin publicaciones</p>
                        <p className="text-gray-500">Aún no hay fotografías en la plataforma.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {fotografias.map((foto, index) => (
                            <div key={foto.id} className="glass-panel rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row bg-white dark:bg-gray-900 animate-slide-up" style={{animationDelay: `${index * 50}ms`}}>
                                
                                {/* Imagen Miniatura */}
                                <div className="md:w-1/3 relative group bg-gray-100 dark:bg-gray-800">
                                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                                    <img 
                                        src={(foto.direccion_imagen || foto.ruta)?.startsWith('http') ? (foto.direccion_imagen || foto.ruta) : `${imageBaseUrl}/images/${foto.direccion_imagen || foto.ruta}`} 
                                        alt={foto.titulo} 
                                        className="w-full h-48 md:h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    {/* Overlay con estado de reportes (simulado) */}
                                    <div className="absolute top-2 right-2 z-20 flex gap-2">
                                        {foto.reportes && foto.reportes.length > 0 && (
                                            <span className="bg-red-500 text-white font-bold px-2 py-1 rounded shadow text-xs flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                                {foto.reportes.length}
                                            </span>
                                        )}
                                        {foto.apta === 0 && (
                                            <span className="bg-gray-800 text-white font-bold px-2 py-1 rounded shadow text-xs">Oculta</span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Info y Controles Moderacion */}
                                <div className="p-6 md:w-2/3 flex flex-col border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800">
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize leading-tight truncate">
                                                {foto.titulo}
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5 mt-1">
                                                Autor: <span className="font-semibold text-gray-700 dark:text-gray-300">{foto.user?.name || 'Desconocido'}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2 shrink-0 border border-gray-200 dark:border-gray-800 rounded-xl p-1 bg-gray-50 dark:bg-gray-950">
                                            {/* Editar */}
                                            <Link 
                                                to={`/admin/fotografias/${foto.id}/editar`} 
                                                className="px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 transition-colors flex items-center gap-1.5"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                Editar
                                            </Link>
                                            {/* Eliminar */}
                                            <button 
                                                onClick={(e) => handleDelete(foto.id, e)}
                                                className="px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-500 transition-colors flex items-center gap-1.5"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 dark:bg-gray-800/20 p-4 rounded-2xl mb-4 border border-gray-100 dark:border-gray-800 flex-grow">
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                                            {foto.descripcion || 'Sin descripción.'}
                                        </p>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 gap-4">
                                        {/* Estadísticas */}
                                        <div className="flex gap-3">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                                                <svg className="w-3.5 h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> 
                                                {foto.likes_count || 0}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                                                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> 
                                                {foto.comentarios_count || 0}
                                            </span>
                                        </div>
                                        
                                        <Link to={`/comentar?fotografia_id=${foto.id}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 uppercase tracking-wider">
                                            Ver publicación
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
