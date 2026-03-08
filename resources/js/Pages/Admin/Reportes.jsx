import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function Reportes({ reportes }) {
    return (
        <MainLayout>
            <Head title="Gestión de Reportes" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-xl transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 p-2 rounded-xl">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                                </span>
                                Gestión de Reportes
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Revisa y toma acción sobre posibles abusos o contenido inapropiado.</p>
                        </div>
                    </div>
                </div>

                {/* Grid Listado */}
                {!reportes || reportes.length === 0 ? (
                    <div className="glass-panel text-center p-16 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <svg className="w-16 h-16 mx-auto text-green-300 dark:text-green-600/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xl font-medium text-gray-500 dark:text-gray-400">Excelente. No hay ninguna fotografía reportada.</p>
                    </div>
                ) : (
                    <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm animate-fade-in-up">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                                        <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">Fotografía Reportada</th>
                                        <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs text-center">Nº de Reportes</th>
                                        <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 bg-white dark:bg-gray-900/50">
                                    {reportes.map(reporte => (
                                        <tr key={reporte.foto_id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-20 w-32 relative rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                                                        <img 
                                                            src={reporte.foto?.direccion_imagen ? `/images/${reporte.foto.direccion_imagen}` : '/imagenes/placeholder_no_encontrado.jpg'} 
                                                            alt="Foto reportada" 
                                                            className="object-cover absolute inset-0 w-full h-full"
                                                        />
                                                    </div>
                                                    {reporte.foto && (
                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white capitalize line-clamp-1">{reporte.foto.titulo}</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">Autor ID: {reporte.foto.usuario_id}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold border border-red-200 dark:border-red-800 shadow-inner">
                                                    {reporte.total_reportes}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link 
                                                    href={`/admin/controlReportes/${reporte.foto_id}`}
                                                    className="inline-flex items-center gap-2 btn-primary-outline px-4 py-2 text-sm font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    Ver Detalles
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
