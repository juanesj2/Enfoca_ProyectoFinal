import React, { useRef, useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../lib/axios';

export default function Show() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const currentUserId = user?.id;
    const isGlobalAdmin = user?.rol === 'admin';
    
    const codigoRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [grupo, setGrupo] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [nuevaImagen, setNuevaImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchData();
        const interval = setInterval(fetchMensajes, 5000); // Polling cada 5s
        return () => clearInterval(interval);
    }, [id]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const resGrupo = await axios.get(`/grupos/${id}`);
            const dataGrupo = resGrupo.data.data || resGrupo.data;
            setGrupo(dataGrupo);
            document.title = `${dataGrupo.nombre} - Enfoca`;
            
            await fetchMensajes();
        } catch (error) {
            console.error("Error fetching grupo", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMensajes = async () => {
        try {
            const res = await axios.get(`/grupos/${id}/mensajes`);
            setMensajes(res.data.data || res.data);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching mensajes:', error);
        }
    };

    const isCreator = grupo?.creado_por === currentUserId;
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // Max 5MB
                alert('La imagen no puede superar los 5MB');
                return;
            }
            setNuevaImagen(file);
            setImagenPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setNuevaImagen(null);
        setImagenPreview(null);
        const fileInput = document.getElementById('chat-image');
        if (fileInput) fileInput.value = '';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!nuevoMensaje.trim() && !nuevaImagen) return;
        
        setIsSubmitting(true);

        const formData = new FormData();
        if (nuevoMensaje.trim()) formData.append('mensaje', nuevoMensaje);
        if (nuevaImagen) formData.append('imagen', nuevaImagen);

        try {
            await axios.post(`/grupos/${grupo.id}/mensajes`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setNuevoMensaje('');
            clearImage();
            await fetchMensajes();
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            alert('Error al enviar el mensaje');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteGroup = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este grupo? Esta acción eliminará permanentemente todos los mensajes y expulsará a todos los miembros. Esta acción no se puede deshacer.')) {
            try {
                await axios.delete(`/grupos/${grupo.id}`);
                alert("Grupo eliminado exitosamente");
                navigate('/grupos');
            } catch (error) {
                console.error("Error deleting group", error);
                alert("Hubo un error al eliminar el grupo.");
            }
        }
    };

    const leaveGroup = async () => {
        if (window.confirm('¿Estás seguro de que deseas salir del grupo? Perderás acceso a los mensajes.')) {
            try {
                await axios.delete(`/grupos/${grupo.id}/salir`);
                alert("Has salido del grupo");
                navigate('/grupos');
            } catch (error) {
                console.error("Error leaving group", error);
                alert("Error al salir del grupo.");
            }
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center py-20">
                    <svg className="animate-spin w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                </div>
            </MainLayout>
        );
    }

    if (!grupo) return <MainLayout><p className="text-center mt-10">Grupo no encontrado</p></MainLayout>;

    let currentDate = '';
    const imageBaseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000';

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto py-6 px-4 h-[calc(100vh-80px)] flex flex-col">
                <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
                    
                    {/* Panel Izquierdo: Info del Grupo */}
                    <div className="w-full md:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar shrink-0">
                        
                        {/* Tarjeta Principal Info */}
                        <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg">
                            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                                <Link to="/grupos" className="absolute top-4 left-4 text-white hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors" title="Volver a mis grupos">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                </Link>
                            </div>
                            
                            <div className="p-6 relative">
                                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center absolute -top-10 border-4 border-gray-50 dark:border-gray-900 transform rotate-3">
                                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 uppercase">
                                        {grupo.nombre.substring(0, 2)}
                                    </h2>
                                </div>
                                
                                <div className="mt-12">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-2">{grupo.nombre}</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 leading-relaxed min-h-[4rem]">
                                        {grupo.descripcion || 'Sin descripción proporcionada.'}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Código de Invitación</p>
                                    <div className="flex items-center gap-2">
                                        <div 
                                            ref={codigoRef}
                                            className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono text-lg tracking-widest px-4 py-2 rounded-xl flex-1 text-center font-bold"
                                        >
                                            {grupo.codigo_invitacion}
                                        </div>
                                        <button 
                                            onClick={copiarCodigo}
                                            className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                                            title="Copiar código"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-center">Comparte este código para añadir miembros.</p>
                                </div>
                            </div>
                        </div>

                        {/* Miembros */}
                        <div className="glass-panel p-6 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                Miembros ({grupo.usuarios?.length || 0})
                            </h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                {grupo.usuarios && grupo.usuarios.map(u => (
                                    <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs shadow-inner">
                                            {u.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{u.name}</p>
                                            {u.id === grupo.creado_por && (
                                                <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">Administrador</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Acciones de Grupo (Salir / Eliminar) */}
                        <div className="flex flex-col gap-3">
                            {!isCreator && (
                                <button 
                                    onClick={leaveGroup}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800 transition-all shadow-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Salir del Grupo
                                </button>
                            )}

                            {canDelete && (
                                <button 
                                    onClick={deleteGroup}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 hover:bg-red-600 hover:text-white dark:hover:bg-red-700 dark:hover:text-white transition-all shadow-sm group"
                                >
                                    <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    Eliminar Grupo
                                </button>
                            )}
                        </div>

                    </div>

                    {/* Panel Derecho: Área de Chat */}
                    <div className="w-full md:w-2/3 flex flex-col bg-gray-50/50 dark:bg-gray-950/50 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-inner h-[600px] md:h-auto">
                        
                        {/* Cabecera Chat */}
                        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 shadow-sm z-10">
                            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Chat del Grupo</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                                    En vivo
                                </p>
                            </div>
                        </div>

                        {/* Área de Mensajes */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar relative bg-[#f8f9fa] dark:bg-[#0a0a0a]">
                            
                            {/* Patrón fondo chat */}
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

                            {mensajes.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-60">
                                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">Sé el primero en enviar un mensaje.</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Saluda al grupo o comparte una idea genial.</p>
                                </div>
                            ) : (
                                mensajes.map((msg, index) => {
                                    const msgDate = new Date(msg.created_at || new Date()).toDateString();
                                    const showDateSeparator = msgDate !== currentDate;
                                    if (showDateSeparator) {
                                        currentDate = msgDate;
                                    }

                                    const isMine = msg.usuario_id === currentUserId;

                                    return (
                                        <div key={msg.id || index}>
                                            {/* Separador de Fecha */}
                                            {showDateSeparator && (
                                                <div className="flex justify-center my-6">
                                                    <span className="bg-gray-200/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
                                                        {formatDate(msg.created_at || new Date())}
                                                    </span>
                                                </div>
                                            )}

                                            <div className={`flex flex-col mb-4 ${isMine ? 'items-end' : 'items-start'}`}>
                                                
                                                {/* Nombre Autor (solo si no es mío) */}
                                                {!isMine && (
                                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-2 mb-1">
                                                        {msg.usuario?.name || 'Usuario'}
                                                    </span>
                                                )}

                                                {/* Burbuja */}
                                                <div className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                                                    isMine 
                                                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                                                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                                                }`}>
                                                    
                                                    {/* Imagen adjunta */}
                                                    {msg.imagen && (
                                                        <a href={msg.imagen.startsWith('http') ? msg.imagen : `${imageBaseUrl}/images/${msg.imagen}`} target="_blank" rel="noopener noreferrer" className="block mb-2">
                                                            <img 
                                                                src={msg.imagen.startsWith('http') ? msg.imagen : `${imageBaseUrl}/images/${msg.imagen}`} 
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
