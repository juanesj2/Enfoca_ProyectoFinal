import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function PhotoCard({ foto }) {
    // Estado local para los likes
    const isInitiallyLiked = foto.likes && foto.likes.length > 0;
    const [liked, setLiked] = useState(isInitiallyLiked);
    const [likesCount, setLikesCount] = useState(foto.likes_count || 0);
    const [isLiking, setIsLiking] = useState(false);

    const toggleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);

        try {
            if (liked) {
                // Quitar like
                const response = await axios.post(`/fotografias/${foto.id}/unlike`);
                setLiked(false);
                setLikesCount(response.data.likesCount);
            } else {
                // Dar like
                const response = await axios.post(`/fotografias/${foto.id}/like`);
                setLiked(true);
                setLikesCount(response.data.likesCount);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            alert('Debes iniciar sesión para dar me gusta a esta foto.');
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <div className="glass-panel overflow-hidden group hover-lift flex flex-col h-full hover:shadow-2xl transition-all duration-300">
            {/* Contenedor de la Imagen */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img 
                    src={`/images/${foto.direccion_imagen}`} 
                    alt={foto.titulo || 'Fotografía'} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay en Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={`/comentar?fotografia_id=${foto.id}`} className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-white/30 transition-colors">
                        Ver Comentarios
                    </a>
                </div>
            </div>

            {/* Información Inferior */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all">
                    {foto.titulo}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
                    {foto.descripcion}
                </p>

                {/* Footer del Card (Autor y Estadísticas) */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {foto.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {foto.user?.name || 'Usuario'}
                        </span>
                    </div>

                    <div className="flex gap-3 text-gray-400">
                        {/* Botón de Like */}
                        <button 
                            onClick={toggleLike}
                            disabled={isLiking}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${liked ? 'text-red-500 hover:text-red-600' : 'hover:text-pink-500'}`}
                            aria-label="Me gusta"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-xs font-medium">{likesCount}</span>
                        </button>
                        
                        {/* Indicador de Comentarios */}
                        <a href={`/comentar?fotografia_id=${foto.id}`} className="flex items-center gap-1 hover:text-indigo-500 transition-colors cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-xs font-medium">{foto.comentarios_count || 0}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
