import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function MisDesafios({ misDesafios }) {

    return (
        <MainLayout>
            <Head title="Mis Logros" />

            <div className="max-w-4xl mx-auto py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-2 rounded-xl">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            </span>
                            Mis Logros Obtenidos
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Has coleccionado {misDesafios.total || misDesafios.data?.length || 0} de los retos disponibles de la plataforma.
                        </p>
                    </div>
                    <Link href="/desafios" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
                        Ver todos los desafíos
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                </div>

                {/* Lista de Logros */}
                {!misDesafios.data || misDesafios.data.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm animate-fade-in">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Aún no has desbloqueado ningún logro</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                            Interactúa con la comunidad, sube tus mejores fotos y comenta en otras para empezar a ganar insignias exclusivas.
                        </p>
                        <Link href="/fotografias" className="inline-flex bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-full shadow-md transition-colors">
                            Explorar la comunidad
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {misDesafios.data.map(desafio => (
                            <div key={desafio.id} className="glass-panel p-5 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4 group hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-50 dark:from-yellow-900/40 dark:to-amber-900/20 rounded-2xl p-2 flex-shrink-0 border border-yellow-200 dark:border-yellow-700/50 shadow-sm">
                                        {desafio.icono ? (
                                            <img src={`/icons/${desafio.icono}`} alt={desafio.titulo} className="w-full h-full object-contain filter drop-shadow-md" />
                                        ) : (
                                            <svg className="w-full h-full text-yellow-500 p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                        )}
                                    </div>
                                    <div className="py-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {desafio.titulo}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 max-w-xl">
                                            {desafio.descripcion}
                                        </p>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            Conseguido el {new Date(desafio.pivot.conseguido_en).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Paginación Mis Desafíos */}
                        {misDesafios.links && misDesafios.data.length > 0 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {misDesafios.links.map((link, i) => (
                                    <Link 
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${link.active ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
