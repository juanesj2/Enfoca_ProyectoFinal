@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Reportes de Fotografías</h2>

    <!-- Mostrar mensajes de éxito o error -->
    @if($reportes->count() > 0)
        <div class="table-responsive">
            <!-- En esta tabla mostraremos los reportes de cada foto -->
            <table class="table table-hover text-center align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Foto</th>
                        <th>Total de Reportes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($reportes as $reporte)
                        <tr>
                            <td>
                                <img src="{{ asset('images/' . $reporte->foto->direccion_imagen) }}" alt="Foto reportada" width="100">
                            </td>
                            <td>{{ $reporte->total_reportes }}</td>
                            <td>
                                <a href="{{ route('reportes.detalle', $reporte->foto_id) }}" class="btn btn-sm btn-primary">
                                    Ver detalles
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @else
        <div class="alert alert-info text-center">No se han reportado fotos.</div>
    @endif
</div>
@endsection
