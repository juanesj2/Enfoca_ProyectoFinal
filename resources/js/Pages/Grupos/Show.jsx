import React, { useRef, useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';

export default function Show({ grupo, isGlobalAdmin, currentUserId }) {
    const { auth, flash } = usePage().props;
    const codigoRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [nuevaImagen, setNuevaImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isCreator = grupo.creado_por === currentUserId;
    const canDelete = isCreator || isGlobalAdmin;

    const copiarCodigo = () => {
        if (codigoRef.current) {
            navigator.clipboard.writeText(codigoRef.current.innerText).then(() => {
                alert("¡Código copiado al portapapeles!");
            }).catch(err => {
                console.error('Error al copiar el código: ', err);
            });
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm('¿Estás seguro de eliminar este grupo definitivamente? Todos los usuarios serán expulsados.')) {
            router.delete(`/grupos/${grupo.id}`);
        }
    };

    const handleLeave = (e) => {
        e.preventDefault();
        if (confirm('¿Seguro que deseas salir de este grupo? Tendrás que pedir el código para volver a entrar.')) {
            router.delete(`/grupos/${grupo.id}/salir`);
        }
    };

    // -------------------------------------------------------------
    // FUNCIONES DEL CHAT
    // -------------------------------------------------------------

    // Cargar mensajes
    const fetchMensajes = async () => {
        try {
            const response = await axios.get(`/grupos/${grupo.id}/mensajes`);
            setMensajes(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error cargando mensajes", error);
            setIsLoading(false);
        }
    };

    // Auto-scroll hacia abajo
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Al montar el componente, cargar mensajes y programar polling simple
    useEffect(() => {
        fetchMensajes();
        
        // Polling cada 5 segundos para simular tiempo real
        const interval = setInterval(() => {
            fetchMensajes();
        }, 5000);

        return () => clearInterval(interval);
    }, [grupo.id]);

    // Cuando cambian los mensajes, scrollear abajo
    useEffect(() => {
        scrollToBottom();
    }, [mensajes]);

    // Manejar selección de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("La imagen no puede pesar más de 5MB.");
                return;
            }
            setNuevaImagen(file);
            const reader = new FileReader();
            reader.onload = (ev) => setImagenPreview(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setNuevaImagen(null);
        setImagenPreview(null);
    };

    // Enviar mensaje
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim() && !nuevaImagen) return;

        setIsSubmitting(true);
        const formData = new FormData();
        if (nuevoMensaje.trim()) formData.append('mensaje', nuevoMensaje);
        if (nuevaImagen) formData.append('imagen', nuevaImagen);

        try {
            const response = await axios.post(`/grupos/${grupo.id}/mensajes`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Añadir el nuevo mensaje manualmente para respuesta inmediata (optimistic/fast UI)
            setMensajes(prev => [...prev, response.data.data]);
            setNuevoMensaje('');
            clearImage();
        } catch (error) {
            console.error("Error al enviar mensaje", error);
            alert("Error al enviar el mensaje. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <MainLayout>
            <Head title={`Grupo: ${grupo.nombre}`} />

            <div className="max-w-7xl mx-auto py-8">
                
                {/* Botón Volver */}
                <div className="mb-4">
                    <Link href="/grupos" className="inline-flex items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 font-medium transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Mis grupos
                    </Link>
                </div>

                {/* Mensajes Flash */}
                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-xl backdrop-blur-sm animate-fade-in flex items-center gap-3">
                        <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {flash.success}
                    </div>
                )}
                {flash?.info && (
                    <div className="mb-4 p-4 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 rounded-xl backdrop-blur-sm animate-fade-in flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {flash.info}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-14rem)] min-h-[600px]">
                    
                    {/* Columna Izquierda: Información y Miembros */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                        
                        {/* Detalles del Grupo */}
                        <div className="glass-panel p-6 border border-gray-200 dark:border-gray-800 rounded-2xl relative overflow-hidden bg-white/50 dark:bg-gray-900/50">
                            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white capitalize tracking-tight mb-2">
                                {grupo.nombre}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                {grupo.descripcion || 'Sin descripción.'}
                            </p>
                            
                            <div className="flex gap-2">
                                {canDelete ? (
                                    <button onClick={handleDelete} className="w-full justify-center btn-danger-outline px-3 py-2 text-xs font-medium border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/40 text-red-600 dark:text-red-500 rounded-xl transition-colors flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        Eliminar
                                    </button>
                                ) : (
                                    <button onClick={handleLeave} className="w-full justify-center btn-warning-outline px-3 py-2 text-xs font-medium border border-orange-200 dark:border-orange-900 hover:bg-orange-50 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-500 rounded-xl transition-colors flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Salir
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Código de Invitación (Minificado) */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative border border-indigo-500/30">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-sm">Invitar Amigos</h3>
                                <button onClick={copiarCodigo} className="text-white hover:text-indigo-200 transition-colors p-1" title="Copiar código">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/20">
                                <span ref={codigoRef} className="text-2xl font-mono font-bold tracking-widest text-white select-all">
                                    {grupo.codigo_invitacion}
                                </span>
                            </div>
                        </div>

                        {/* Miembros */}
                        <div className="glass-panel p-5 border border-gray-200 dark:border-gray-800 rounded-2xl flex-1 bg-white/50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Miembros ({grupo.usuarios?.length || 0})
                            </h3>
                            <div className="space-y-2">
                                {grupo.usuarios && grupo.usuarios.map(miembro => (
                                    <div key={miembro.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center font-bold text-sm">
                                                {miembro.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900 dark:text-white text-sm capitalize leading-tight">{miembro.name}</span>
                                                {(miembro.id === grupo.creado_por || miembro.pivot?.rol === 'admin') && (
                                                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase mt-0.5">Admin</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: El Chat */}
                    <div className="w-full lg:w-2/3 flex flex-col glass border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden h-full">
                        
                        {/* Chat Header */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between z-10 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                </div>
                                <h2 className="font-bold text-lg text-gray-800 dark:text-white">Chat del Grupo</h2>
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                En vivo
                            </span>
                        </div>

                        {/* Mensajes Body */}
                        <div className="flex-1 bg-gray-50/50 dark:bg-gray-950/30 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                </div>
                            ) : mensajes.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                                    <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                                    <p>No hay mensajes todavía. ¡Comienza la conversación!</p>
                                </div>
                            ) : (
                                mensajes.map((msg, index) => {
                                    const isMe = msg.usuario_id === currentUserId;
                                    
                                    return (
                                        <div key={msg.id || index} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                                                
                                                {/* Nombre del remitente si no soy yo */}
                                                {!isMe && (
                                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1 mb-1 capitalize">
                                                        {msg.user?.name || 'Usuario'}
                                                    </span>
                                                )}

                                                <div className={`p-3 rounded-2xl shadow-sm ${
                                                    isMe 
                                                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none' 
                                                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'
                                                }`}>
                                                    
                                                    {/* Imagen adjunta */}
                                                    {msg.imagen && (
                                                        <a href={`/images/${msg.imagen}`} target="_blank" rel="noopener noreferrer" className="block mb-2">
                                                            <img 
                                                                src={`/images/${msg.imagen}`} 
                                                                alt="Imagen adjunta" 
                                                                className="rounded-xl max-h-48 object-cover hover:opacity-90 transition-opacity"
                                                            />
                                                        </a>
                                                    )}

                                                    {/* Texto del mensaje */}
                                                    {msg.mensaje && (
                                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.mensaje}</p>
                                                    )}
                                                </div>
                                                
                                                <span className="text-[10px] text-gray-400 mt-1 mx-1">
                                                    {formatTime(msg.created_at || new Date())}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Preview de Imagen subida (antes de enviar) */}
                        {imagenPreview && (
                            <div className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3 flex items-start gap-4">
                                <div className="relative">
                                    <img src={imagenPreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm" />
                                    <button 
                                        type="button" 
                                        onClick={clearImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Chat Input (Footer) */}
                        <div className="bg-white dark:bg-gray-900 p-4 border-t border-gray-100 dark:border-gray-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-10">
                            <form onSubmit={handleSendMessage} className="flex gap-2 items-end relative">
                                
                                {/* Botón Adjuntar Imagen */}
                                <div className="shrink-0 mb-1">
                                    <input 
                                        type="file" 
                                        id="chat-image" 
                                        accept="image/png, image/jpeg, image/jpg, image/gif" 
                                        className="hidden" 
                                        onChange={handleImageChange}
                                    />
                                    <label 
                                        htmlFor="chat-image" 
                                        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                        title="Adjuntar imagen (Max 5MB)"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </label>
                                </div>

                                {/* Textarea Input */}
                                <div className="flex-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all flex">
                                    <textarea 
                                        rows="1"
                                        value={nuevoMensaje}
                                        onChange={(e) => setNuevoMensaje(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                        className="w-full bg-transparent border-none py-3 px-4 resize-none focus:ring-0 dark:text-white max-h-32 text-sm"
                                        placeholder="Escribe un mensaje..."
                                    ></textarea>
                                </div>

                                {/* Botón Enviar */}
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || (!nuevoMensaje.trim() && !nuevaImagen)}
                                    className="shrink-0 mb-1 w-11 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                    )}
                                </button>
                            </form>
                            <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-2 font-medium">
                                Presiona Enter para enviar, Mayús + Enter para saltar línea
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </MainLayout>
    );
}
