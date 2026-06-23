import './bootstrap';
import './css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Importa aquí tus páginas refactorizadas
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

import FotografiasIndex from './Pages/Fotografias/Index';
import FotografiasCreate from './Pages/Fotografias/Create';
import FotografiasComentar from './Pages/Fotografias/Comentar';
import FotografiasMisFotografias from './Pages/Fotografias/MisFotografias';
import FotografiasReportar from './Pages/Fotografias/Reportar';

import DesafiosIndex from './Pages/Desafios/Index';
import DesafiosMisDesafios from './Pages/Desafios/MisDesafios';

import GruposIndex from './Pages/Grupos/Index';
import GruposCreate from './Pages/Grupos/Create';
import GruposJoin from './Pages/Grupos/Join';
import GruposShow from './Pages/Grupos/Show';

import ProfileEdit from './Pages/Profile/Edit';

import AdminDashboard from './Pages/Admin/Dashboard';
import AdminUsuarios from './Pages/Admin/Usuarios';
import AdminUsuarioEdit from './Pages/Admin/UsuarioEdit';
import AdminFotografias from './Pages/Admin/Fotografias';
import AdminFotografiaEdit from './Pages/Admin/FotografiaEdit';
import AdminReportes from './Pages/Admin/Reportes';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Redirección por defecto al feed de fotografías */}
                    <Route path="/" element={<Navigate to="/fotografias" replace />} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Fotografías */}
                    <Route path="/fotografias" element={<FotografiasIndex />} />
                    <Route path="/fotografias/create" element={<FotografiasCreate />} />
                    <Route path="/comentar" element={<FotografiasComentar />} />
                    <Route path="/mis-fotografias" element={<FotografiasMisFotografias />} />
                    <Route path="/reportes/create/:id" element={<FotografiasReportar />} />

                    {/* Desafíos */}
                    <Route path="/desafios" element={<DesafiosIndex />} />
                    <Route path="/mis-desafios" element={<DesafiosMisDesafios />} />

                    {/* Grupos */}
                    <Route path="/grupos" element={<GruposIndex />} />
                    <Route path="/grupos/create" element={<GruposCreate />} />
                    <Route path="/grupos/unirse" element={<GruposJoin />} />
                    <Route path="/grupos/:id" element={<GruposShow />} />

                    {/* Profile */}
                    <Route path="/profile" element={<ProfileEdit />} />

                    {/* Admin */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                    <Route path="/admin/usuarios/:id/editar" element={<AdminUsuarioEdit />} />
                    <Route path="/admin/fotografias" element={<AdminFotografias />} />
                    <Route path="/admin/fotografias/:id/editar" element={<AdminFotografiaEdit />} />
                    <Route path="/admin/reportes" element={<AdminReportes />} />

                    <Route path="*" element={
                        <div style={{ padding: "2rem", textAlign: "center" }}>
                            <h1>Enfoca SPA</h1>
                            <p>Esta ruta aún no ha sido refactorizada para React Router o no existe.</p>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

