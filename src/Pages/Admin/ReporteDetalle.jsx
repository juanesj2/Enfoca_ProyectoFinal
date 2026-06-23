import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Navigate } from 'react-router-dom';

export default function ReporteDetalle() {
    // Si en el futuro es necesario ver los detalles agrupados de todos los reportes
    // de una foto específica, se puede implementar aquí.
    // De momento redirigimos al listado de reportes ya que se atiende desde ahí
    // o desde la edición de fotografía.
    return <Navigate to="/admin/reportes" />;
}
