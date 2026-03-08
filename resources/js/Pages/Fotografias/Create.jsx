import React, { useState, useEffect } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Create() {
    const { auth } = usePage().props;
    
    const { data, setData, post, processing, errors } = useForm({
        usuario_id: auth.user ? auth.user.id : '',
        titulo: '',
        descripcion: '',
        ISO: '',
        velocidad_obturacion: '',
        apertura: '',
        direccion_imagen: null,
        latitud: '',
        longitud: ''
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [showMapModal, setShowMapModal] = useState(false);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    // Manejar el cambio de archivo para la vista previa
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('direccion_imagen', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPreviewUrl(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    // Efecto para inicializar Leaflet cuando se abre el modal
    useEffect(() => {
        if (showMapModal && !map) {
            // Inicializar el mapa
            const initialMap = L.map('mapSelector').setView([40.4168, -3.7038], 5);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(initialMap);

            let currentMarker = null;

            // Si ya hay coordenadas, poner el marcador
            if (data.latitud && data.longitud) {
                currentMarker = L.marker([data.latitud, data.longitud]).addTo(initialMap);
            }

            // Click evento para posicionar el marcador y setear lat/lng
            initialMap.on('click', function (e) {
                if (currentMarker) {
                    currentMarker.setLatLng(e.latlng);
                } else {
                    currentMarker = L.marker(e.latlng).addTo(initialMap);
                }
                setMarker(currentMarker);
                
                // Actualizar setData
                setData(prevData => ({
                    ...prevData,
                    latitud: e.latlng.lat,
                    longitud: e.latlng.lng
                }));
            });

            setMap(initialMap);
        }

        // Forzamos el redibujo
        if (showMapModal && map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        }
    }, [showMapModal]);

    const submit = (e) => {
        e.preventDefault();
        post('/fotografias');
    };

    return (
        <MainLayout>
            <Head title="Subir Fotografía" />

            <div className="max-w-3xl mx-auto py-6">
                <div className="glass-panel overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                            Subir nueva fotografía
                        </h2>
                        <Link href="/fotografias" className="text-gray-500 hover:text-indigo-500 transition-colors font-medium">
                            Cancelar
                        </Link>
                    </div>

                    {/* Body */}
                    <div className="p-6 bg-white dark:bg-gray-900">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Errores globales */}
                            {Object.keys(errors).length > 0 && (
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 text-sm">
                                    <ul className="list-disc pl-5">
                                        {Object.values(errors).map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título de la Fotografía</label>
                                <input 
                                    type="text" 
                                    value={data.titulo} 
                                    onChange={e => setData('titulo', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white"
                                    placeholder="Ej: Atardecer en la montaña"
                                />
                                {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                                <textarea 
                                    value={data.descripcion} 
                                    onChange={e => setData('descripcion', e.target.value)}
                                    rows="3"
                                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none dark:text-white"
                                    placeholder="Cuenta un poco sobre esta fotografía..."
                                />
                                {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
                            </div>

                            {/* Grid de EXIF */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ISO</label>
                                    <input 
                                        type="number" 
                                        value={data.ISO} 
                                        onChange={e => setData('ISO', e.target.value)}
                                        min="50" max="51200" required
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                        placeholder="Ej: 100"
                                    />
                                    {errors.ISO && <p className="text-red-500 text-sm mt-1">{errors.ISO}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Velocidad de Obturación</label>
                                    <input 
                                        type="text" 
                                        value={data.velocidad_obturacion} 
                                        onChange={e => setData('velocidad_obturacion', e.target.value)}
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                        placeholder="Ej: 1/250"
                                    />
                                    {errors.velocidad_obturacion && <p className="text-red-500 text-sm mt-1">{errors.velocidad_obturacion}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apertura (ƒ/)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={data.apertura} 
                                        onChange={e => setData('apertura', e.target.value)}
                                        min="0.7" max="32" required
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                        placeholder="Ej: 1.8"
                                    />
                                    {errors.apertura && <p className="text-red-500 text-sm mt-1">{errors.apertura}</p>}
                                </div>
                            </div>

                            {/* Subida de Imagen */}
                            <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                                <input 
                                    type="file" 
                                    id="direccion_imagen" 
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <label htmlFor="direccion_imagen" className="cursor-pointer flex flex-col items-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-indigo-500 mb-3 hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click para examinar</span>
                                    <span className="text-sm text-gray-500 mt-1">Soporta JPG, PNG, GIF</span>
                                </label>
                                
                                {previewUrl && (
                                    <div className="mt-6 w-full flex justify-center">
                                        <img src={previewUrl} alt="Preview" className="max-h-64 object-contain rounded-lg shadow-md border border-gray-200 dark:border-gray-700" />
                                    </div>
                                )}
                                {errors.direccion_imagen && <p className="text-red-500 text-sm mt-2">{errors.direccion_imagen}</p>}
                            </div>

                            {/* Botón Mapa */}
                            <div>
                                <button type="button" onClick={() => setShowMapModal(true)} className="w-full border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {data.latitud && data.longitud ? 'Ubicación seleccionada (Click para cambiar)' : 'Añadir ubicación desde el mapa (Opcional)'}
                                </button>
                            </div>

                            {/* Botón Guardar */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button type="submit" disabled={processing} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                                    {processing ? 'Publicando...' : 'Publicar Fotografía'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {/* Modal de Mapa */}
            {showMapModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-scale-up border border-gray-200 dark:border-gray-800">
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-950/50">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                Selecciona la ubicación
                            </h3>
                            <button onClick={() => setShowMapModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-0">
                            <div id="mapSelector" className="h-[400px] w-full z-0"></div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                            <button onClick={() => setShowMapModal(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-colors">
                                Confirmar Ubicación
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
