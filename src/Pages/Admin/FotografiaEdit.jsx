import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';

export default function FotografiaEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const imageBaseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000';

    const [fotografia, setFotografia] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        apta: true, // En vez de vetada, la BD original puede tener apta o vetada. Asumimos apta.
    });

    useEffect(() => {
        fetchFotografia();
    }, [id]);

    const fetchFotografia = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/fotografias/${id}`);
            const data = res.data.data || res.data;
            setFotografia(data);
            setFormData({
                titulo: data.titulo || '',
                descripcion: data.descripcion || '',
                apta: data.apta !== undefined ? data.apta : true,
            });
            document.title = `Editar Fotografía: ${data.titulo}`;
        } catch (error) {
            console.error("Error fetching fotografia:", error);
            alert("Error al cargar datos de la fotografía.");
            navigate('/admin/fotografias');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`/fotografias/${id}`, formData);
            alert("Fotografía actualizada correctamente.");
            navigate('/admin/fotografias');
        } catch (error) {
            console.error("Error updating fotografia:", error);
            alert("Error al actualizar fotografía.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center p-20">
                    <svg className="animate-spin w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                </div>
            </MainLayout>
        );
    }

    if (!fotografia) return null;

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin/fotografias" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-xl transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
                        Moderación de Publicación
                    </h1>
                </div>

                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl flex flex-col md:flex-row">
                    
                    {/* Visual de Referencia de la Foto */}
                    <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center justify-center shrink-0">
                        <div className="w-full aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-800">
                             <img 
                                src={(fotografia.direccion_imagen || fotografia.ruta)?.startsWith('http') ? (fotografia.direccion_imagen || fotografia.ruta) : `${imageBaseUrl}/images/${fotografia.direccion_imagen || fotografia.ruta}`} 
                                alt="Previsualizacion" 
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="mt-6 w-full text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-bold mb-1">Autor de Imagen</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-2 px-4">
                                {fotografia.user?.name || `Usuario ID ${fotografia.usuario_id}`}
                            </p>
                        </div>
                    </div>

                    {/* Formulario de Modificacion */}
                    <div className="p-8 md:p-10 w-full bg-white dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Titulo */}
                            <div>
                                <label htmlFor="titulo" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Título de la Obra</label>
                                <input 
                                    id="titulo"
                                    name="titulo"
                                    type="text" 
                                    value={formData.titulo} 
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    required
                                />
                            </div>

                            {/* Descripcion */}
                            <div>
                                <label htmlFor="descripcion" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Descripción Contextual</label>
                                <textarea 
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 my-8" />

                            {/* Moderación */}
                            <div>
                                <h3 className="text-lg font-bold text-red-600 dark:text-red-500 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Estado de Visibilidad
                                </h3>
                                <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-xl p-4 flex items-start gap-4 shadow-sm">
                                    <div className="flex items-center h-5 mt-1">
                                        <input 
                                            id="apta" 
                                            name="apta" 
                                            type="checkbox" 
                                            checked={!formData.apta} 
                                            onChange={(e) => setFormData({...formData, apta: !e.target.checked})}
                                            className="focus:ring-red-500 h-5 w-5 text-red-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="apta" className="font-bold text-gray-900 dark:text-gray-200 cursor-pointer">
                                            Ocultar Fotografía (Marcar como No Apta)
                                        </label>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                                            Si marcas esta opción, la fotografía no será visible en el feed público. Útil si viola normas pero no deseas eliminarla permanentemente.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                                <Link 
                                    to="/admin/fotografias"
                                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl shadow-sm transition-colors"
                                >
                                    Cancelar
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all hover-lift disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
