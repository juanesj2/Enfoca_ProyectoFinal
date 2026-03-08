import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function FotografiaEdit({ fotografia }) {
    const { data, setData, put, processing, errors } = useForm({
        titulo: fotografia.titulo || '',
        descripcion: fotografia.descripcion || '',
        vetada: fotografia.vetada || false,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/fotografias/${fotografia.id}`);
    };

    return (
        <MainLayout>
            <Head title={`Editar ID: ${fotografia.id}`} />

            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/ControlFotografias" className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-xl transition-colors">
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
                                src={`/images/${fotografia.direccion_imagen}`} 
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
                                    type="text" 
                                    value={data.titulo} 
                                    onChange={e => setData('titulo', e.target.value)} 
                                    className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.titulo ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500'} rounded-2xl px-5 py-3 transition-colors text-gray-900 dark:text-white font-medium`}
                                    required
                                />
                                {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
                            </div>

                            {/* Descripcion */}
                            <div>
                                <label htmlFor="descripcion" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Descripción Contextual</label>
                                <textarea 
                                    id="descripcion"
                                    rows="5"
                                    value={data.descripcion} 
                                    onChange={e => setData('descripcion', e.target.value)} 
                                    className={`w-full bg-gray-50 dark:bg-gray-950 border ${errors.descripcion ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500'} rounded-2xl px-5 py-4 transition-colors text-gray-900 dark:text-white leading-relaxed resize-y`}
                                    required
                                />
                                {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
                            </div>

                            {/* Moderacion Sensible (Veto) */}
                            <div className={`p-5 rounded-2xl border-2 transition-colors ${data.vetada ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/30' : 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800'} cursor-pointer`} onClick={() => setData('vetada', !data.vetada)}>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex items-center shrink-0">
                                        <input
                                            type="checkbox"
                                            id="vetada"
                                            className="sr-only"
                                            checked={data.vetada}
                                            onChange={(e) => setData('vetada', e.target.checked)}
                                        />
                                        <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${data.vetada ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                                        <div className={`shadow-sm absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out transform flex items-center justify-center ${data.vetada ? 'translate-x-6' : 'translate-x-0'}`}>
                                            {data.vetada && <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="vetada" className="font-bold text-gray-900 dark:text-white block cursor-pointer">
                                            Penalizar Público (Vetar Contenido)
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 cursor-pointer">
                                            Si habilitas esto, la foto y sus datos desaparecerán del Feed General y se marcarán como prohibidas temporalmente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {errors.vetada && <p className="text-red-500 text-sm">{errors.vetada}</p>}

                            <hr className="border-gray-100 dark:border-gray-800 my-8" />

                            <div className="flex justify-end gap-4">
                                <Link 
                                    href="/admin/ControlFotografias"
                                    className="px-6 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Descartar
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-8 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {processing ? 'Guardando...' : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Guardar Cambios
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
