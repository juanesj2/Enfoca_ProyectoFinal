import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';

export default function UsuarioEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rol: 'usuario',
        vetado: 0, // Minutos
    });

    useEffect(() => {
        fetchUsuario();
    }, [id]);

    const fetchUsuario = async () => {
        setIsLoading(true);
        try {
            // Como no hay endpoint `/admin/usuarios/:id`, pedimos todos y filtramos
            const res = await axios.get('/admin/usuarios');
            const data = res.data.data || res.data;
            const user = data.find(u => u.id === parseInt(id));
            
            if (user) {
                setUsuario(user);
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    rol: user.rol || 'usuario',
                    vetado: 0
                });
                document.title = `Editar Usuario: ${user.name}`;
            } else {
                alert("Usuario no encontrado.");
                navigate('/admin/usuarios');
            }
        } catch (error) {
            console.error("Error fetching usuario:", error);
            alert("Error al cargar datos del usuario");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`/admin/usuarios/${id}`, formData);
            alert("Usuario actualizado correctamente.");
            navigate('/admin/usuarios');
        } catch (error) {
            console.error("Error updating usuario:", error);
            alert("Error al actualizar usuario.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAmnistia = async () => {
        if (window.confirm('¿Estás seguro de que quieres quitar el veto a este usuario inmediatamente?')) {
            setIsSubmitting(true);
            try {
                await axios.put(`/admin/usuarios/${id}`, { ...formData, vetado: 0 });
                alert("Veto retirado.");
                fetchUsuario();
            } catch (error) {
                console.error("Error quitando veto:", error);
                alert("Error al quitar el veto.");
            } finally {
                setIsSubmitting(false);
            }
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

    if (!usuario) return null;

    const now = new Date();
    const isVetado = usuario.vetado_hasta && new Date(usuario.vetado_hasta) > now;
    const vetadoHasta = isVetado ? new Date(usuario.vetado_hasta).toLocaleString() : null;

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin/usuarios" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-xl transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
                        Editar Información de Usuario
                    </h1>
                </div>

                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl">
                    
                    {isVetado && (
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex gap-4">
                                <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-2 rounded-full shrink-0 h-min">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-800 dark:text-red-400">Usuario actualmente restringido (Veto Muteado)</h3>
                                    <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                                        Estará vetado hasta el <strong>{vetadoHasta}</strong>.
                                    </p>
                                </div>
                            </div>
                            <button onClick={handleAmnistia} type="button" disabled={isSubmitting} className="btn-primary-outline bg-white dark:bg-gray-800 text-red-600 hover:bg-red-50 border border-red-200 shrink-0 shadow-sm py-2 px-4 rounded-xl font-bold sm:self-center transition-colors">
                                Quitar Veto Ahora
                            </button>
                        </div>
                    )}

                    <div className="p-8 bg-white dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Nombre de Usuario
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Correo Electrónico
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800 my-8" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Rol */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Privilegios y Rol</h3>
                                    <label htmlFor="rol" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Asignar Rol
                                    </label>
                                    <select
                                        id="rol"
                                        name="rol"
                                        value={formData.rol}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    >
                                        <option value="usuario">Usuario Normal</option>
                                        <option value="admin">Administrador (Control Total)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">Los administradores tienen acceso al panel de control y pueden moderar el contenido.</p>
                                </div>

                                {/* Veto */}
                                <div>
                                    <h3 className="text-lg font-bold text-red-600 dark:text-red-500 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                        Castigos y Restricciones
                                    </h3>
                                    <label htmlFor="vetado" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Añadir Tiempo de Veto (Minutos)
                                    </label>
                                    <input 
                                        type="number" 
                                        id="vetado"
                                        name="vetado"
                                        value={formData.vetado}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                        placeholder="0 para no alterar"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Introduce los minutos adicionales de castigo. El usuario no podrá subir fotos ni comentar durante este tiempo.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                                <Link 
                                    to="/admin/usuarios"
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
