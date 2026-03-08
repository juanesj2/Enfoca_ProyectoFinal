import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Componente pequeño para el mapa de Leaflet
const LeafletMap = ({ lat, lng }) => {
    useEffect(() => {
        if (!lat || !lng) return;

        let map = L.map('map').setView([lat, lng], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map);

        return () => {
            map.remove();
        };
    }, [lat, lng]);

    return <div id="map" className="h-64 md:h-96 w-full rounded-xl z-0 border border-gray-200 dark:border-gray-800"></div>;
};

export default function Comentar({ fotografia, comentariosInitial }) {
    const { auth, flash } = usePage().props;
    const [comentarios, setComentarios] = useState(comentariosInitial || []);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);

    // Lógica de "Me gusta" clonada del PhotoCard adaptada para el detalle
    const isInitiallyLiked = fotografia.likes && fotografia.likes.length > 0;
    const [liked, setLiked] = useState(isInitiallyLiked);
    const [likesCount, setLikesCount] = useState(fotografia.likes_count || 0);
    const [isLiking, setIsLiking] = useState(false);

    const toggleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);
        try {
            if (liked) {
                const response = await axios.post(`/fotografias/${fotografia.id}/unlike`);
                setLiked(false);
                setLikesCount(response.data.likesCount);
            } else {
                const response = await axios.post(`/fotografias/${fotografia.id}/like`);
                setLiked(true);
                setLikesCount(response.data.likesCount);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            alert('Error al dar me gusta a esta foto.');
        } finally {
            setIsLiking(false);
        }
    };

    const submitComentario = (e) => {
        e.preventDefault();
        if (!nuevoComentario.trim()) return;

        setIsSubmitting(true);
        router.post('/comentar', {
            fotografia_id: fotografia.id,
            comentario: nuevoComentario,
        }, {
            onSuccess: () => {
                setNuevoComentario('');
                setIsSubmitting(false);
                // Refrescar los comentarios dinámicamente si no recarga
                axios.get(`/fotografias/${fotografia.id}/comentarios`).then(res => {
                    setComentarios(res.data);
                });
            },
            onError: () => setIsSubmitting(false)
        });
    };

    const deleteComentario = async (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            try {
                await axios.delete(`/comentarios/${id}`);
                setComentarios(comentarios.filter(c => c.id !== id));
            } catch (err) {
                alert("Error al eliminar el comentario.");
            }
        }
    };

    return (
        <MainLayout>
            <Head title={`Comentarios - ${fotografia.titulo}`} />

            {/* Flash Messages */}
            {flash?.success && (
                <div className="mb-6 p-4 bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-xl backdrop-blur-sm animate-fade-in">
                    {flash.success}
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <Link href="/fotografias" className="flex items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 font-medium transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Volver al Feed
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna Izquierda: Fotografía */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
                    <div className="glass-panel overflow-hidden flex flex-col group">
                        {/* Cabecera foto */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                                    {fotografia.user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{fotografia.user?.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Publicado el {new Date(fotografia.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            {/* Opciones (Reportar) */}
                            <a href={`/reportes/create/${fotografia.id}`} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" title="Reportar Imagen">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </a>
                        </div>

                        {/* Imagen principal */}
                        <div className="bg-gray-100 dark:bg-black/40 flex items-center justify-center p-4">
                            <img 
                                src={`/images/${fotografia.direccion_imagen}`} 
                                alt={fotografia.titulo} 
                                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2md"
                            />
                        </div>

                        {/* Controles de Interacción */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50">
                            <div className="flex gap-4">
                                <button onClick={toggleLike} disabled={isLiking} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-pink-500 dark:text-gray-400'}`}>
                                    <svg className={`w-7 h-7 ${liked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    <span className="font-semibold text-lg">{likesCount}</span>
                                </button>
                                
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    <span className="font-semibold text-lg">{fotografia.comentarios_count}</span>
                                </div>
                            </div>
                            
                            <button onClick={() => setShowMapModal(true)} className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Metadatos EXIF
                            </button>
                        </div>

                        {/* Descripción */}
                        <div className="p-5">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{fotografia.titulo}</h2>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                {fotografia.descripcion}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Comentarios */}
                <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-[calc(100vh-8rem)] sticky top-24">
                    <div className="glass-panel flex flex-col h-full overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                                Comentarios ({comentarios.length})
                            </h3>
                        </div>

                        {/* Lista de Comentarios scrolleable */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 dark:bg-gray-950/30 custom-scrollbar">
                            {comentarios.length === 0 ? (
                                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                    <p className="mb-2">No hay comentarios todavía.</p>
                                    <p className="text-sm">¡Sé el primero en aportar!</p>
                                </div>
                            ) : (
                                comentarios.map(comentario => (
                                    <div key={comentario.id} className="relative group bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{comentario.user?.name}</span>
                                            <span className="text-xs text-gray-400">{new Date(comentario.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
                                            {comentario.comentario || comentario.contenido}
                                        </p>
                                        
                                        {/* Botón Eliminar si es dueño */}
                                        {auth?.user?.id === comentario.usuario_id && (
                                            <button 
                                                onClick={() => deleteComentario(comentario.id)}
                                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600 bg-red-50 dark:bg-gray-700 p-1.5 rounded-md"
                                                title="Eliminar Comentario"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Formulario Añadir Comentario */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                            <form onSubmit={submitComentario} className="flex flex-col">
                                <textarea
                                    className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all placeholder-gray-400 dark:text-gray-100"
                                    rows="3"
                                    placeholder="Añade un comentario..."
                                    value={nuevoComentario}
                                    onChange={(e) => setNuevoComentario(e.target.value)}
                                    required
                                ></textarea>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || !nuevoComentario.trim()}
                                    className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                            Enviar Comentario
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Metadatos y Mapa */}
            {showMapModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-gray-900 dark:text-gray-100">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-slide-up border border-gray-200 dark:border-gray-800">
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-950/50">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Metadatos EXIF de la Captura
                            </h3>
                            <button onClick={() => setShowMapModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Sensibilidad ISO</p>
                                    <p className="text-2xl font-bold dark:text-white text-indigo-600">{fotografia.ISO || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Velocidad</p>
                                    <p className="text-2xl font-bold dark:text-white text-indigo-600">{fotografia.velocidad_obturacion || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Apertura</p>
                                    <p className="text-2xl font-bold dark:text-white text-indigo-600">ƒ/{fotografia.apertura || 'N/A'}</p>
                                </div>
                            </div>

                            {fotografia.latitud && fotografia.longitud ? (
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        Ubicación de la Captura
                                    </h4>
                                    <LeafletMap lat={fotografia.latitud} lng={fotografia.longitud} />
                                </div>
                            ) : (
                                <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="text-gray-500 dark:text-gray-400">Esta fotografía no contiene datos geográficos (GPS).</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
