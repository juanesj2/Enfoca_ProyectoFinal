import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import PhotoCard from '../../Components/PhotoCard';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ fotografias }) {
    const { flash } = usePage().props;

    return (
        <MainLayout>
            <Head title="Feed de Fotografías" />
            
            {/* Hero Section */}
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Descubre <span className="text-gradient">Inspiración</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Explora las mejores capturas de nuestra comunidad de fotógrafos. Comparte tu visión y conecta con artistas de todo el mundo.
                </p>
            </div>

            {/* Alertas Flash */}
            {flash?.success && (
                <div className="mb-8 p-4 bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-xl backdrop-blur-sm flex items-center gap-3 animate-fade-in">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="font-medium">{flash.success}</span>
                </div>
            )}
            
            {/* Grid de Fotografías */}
            {fotografias.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fotografias.data.map((foto) => (
                        <PhotoCard key={foto.id} foto={foto} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-4 glass-panel">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No hay fotografías aún</h3>
                    <p className="text-gray-500 dark:text-gray-400">Sé el primero en compartir tu arte con el mundo.</p>
                </div>
            )}

            {/* Paginación Modesta */}
            {fotografias.links && fotografias.links.length > 3 && (
                <div className="mt-12 flex justify-center">
                    <div className="flex flex-wrap gap-2 justify-center glass px-4 py-2 rounded-full shadow-sm">
                        {fotografias.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                                    link.active 
                                        ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' 
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
