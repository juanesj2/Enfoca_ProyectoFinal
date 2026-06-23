import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link } from 'react-router-dom';
import axios from '../../lib/axios';

export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Gestión de Reportes - Enfoca";
        fetchReportes();
    }, []);

    const fetchReportes = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/admin/reportes');
            setReportes(res.data.data || res.data);
        } catch (error) {
            console.error("Error fetching reportes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        if (window.confirm('¿Estás seguro de que quieres eliminar estos reportes? La fotografía ya no estará reportada.')) {
            try {
                // El endpoint según api.php podría ser destroyByPhoto o destroy
                await axios.delete(`/admin/reportes/${id}`);
                setReportes(reportes.filter(r => r.id !== id && r.foto_id !== id));
                fetchReportes(); // refrescamos por si agrupa
            } catch (error) {
                console.error("Error eliminando reporte:", error);
                alert("Hubo un error al eliminar los reportes.");
            }
        }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 animate-fade-in-up">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-xl transition-colors">
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

                {/* Listado */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <svg className="animate-spin w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    </div>
                ) : !reportes || reportes.length === 0 ? (
                    <div className="glass-panel p-16 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-3xl animate-fade-in">
                        <svg className="w-20 h-20 mx-auto text-green-400 dark:text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-2xl font-medium mb-2 text-gray-900 dark:text-white">Todo en orden</p>
                        <p className="text-gray-500">No hay fotografías reportadas en este momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reportes.map((reporte, index) => (
                            <div key={reporte.id} className="glass-panel p-6 border border-red-200 dark:border-red-900/30 rounded-3xl bg-white dark:bg-gray-900 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-lg hover:border-red-300 dark:hover:border-red-800 transition-all animate-slide-up" style={{animationDelay: `${index * 50}ms`}}>
                                
                                <div className="sm:w-1/3 shrink-0 relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-w-4 aspect-h-3">
                                    {reporte.foto ? (
                                        <img 
                                            src={reporte.foto.ruta?.startsWith('http') ? reporte.foto.ruta : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}/storage/${reporte.foto.ruta}`} 
                                            alt="Foto reportada" 
                                            className="w-full h-full object-cover" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Imagen</div>
                                    )}
                                </div>
                                
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                        Reporte por: <span className="text-red-600 dark:text-red-400 font-extrabold">{reporte.motivo || 'Motivo desconocido'}</span>
                                    </h3>
                                    
                                    <div className="bg-red-50/50 dark:bg-red-900/10 p-3 rounded-xl mb-4 border border-red-100 dark:border-red-900/20">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <strong>ID Fotografía:</strong> {reporte.foto_id}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            <strong>Fecha:</strong> {new Date(reporte.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-auto flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <Link 
                                            to={`/admin/fotografias/${reporte.foto_id}/editar`}
                                            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex-1 text-center"
                                        >
                                            Ver Foto / Editar
                                        </Link>
                                        <button 
                                            onClick={(e) => handleDelete(reporte.foto_id, e)} // Usando foto_id si el backend agrupa
                                            className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-colors shrink-0"
                                            title="Descartar reporte"
                                        >
                                            Descartar
                                        </button>
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
