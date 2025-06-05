@extends('master')

@section('contenido')
<div class="container">
    <h2 class="text-center mb-4">Detalles de Reportes</h2>

    <div class="card mb-4">
        <!-- Foto reportada -->
        <div class="card-header">
            <strong>Foto reportada:</strong> {{ $foto->titulo }} por {{ $foto->user->name }}
        </div>

        <div class="card-body text-center">
            <img src="{{ asset('images/' . $foto->direccion_imagen) }}" alt="Foto reportada" class="img-fluid" style="max-width: 300px;">
            <p class="mt-3"><strong>Descripción:</strong> {{ $foto->descripcion }}</p>
        </div>

        <!-- Acciones para la foto reportada -->
        <div class="text-center mt-2 mb-4 d-flex justify-content-center gap-3 flex-wrap">
            {{-- Botón para eliminar la foto --}}
            <form action="{{ route('fotos.destroy', $foto->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de que quieres eliminar esta foto? Esta acción no se puede deshacer.');">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i> Eliminar Foto
                </button>
            </form>

            {{-- Botón para eliminar solo los reportes --}}
            <form action="{{ route('reportes.eliminarPorFoto', $foto->id) }}" method="POST" onsubmit="return confirm('¿Eliminar todos los reportes de esta foto?');">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-warning text-white">
                    <i class="fa-solid fa-broom"></i> Eliminar Reportes
                </button>
            </form>
        </div>

    </div>

    <!-- Mostramos los reportes de la foto, si tiene -->
    @if($reportes->count() > 0)
        <div class="table-responsive">
            <table class="table table-bordered table-hover text-center align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Usuario que reportó</th>
                        <th>Motivo</th>
                        <th>Fecha del reporte</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Recoremos y mostramos los reportes -->
                    @foreach($reportes as $reporte)
                        <tr>
                            <td>{{ $reporte->usuario->name }}</td>
                            <td>{{ $reporte->motivo }}</td>
                            <td>{{ $reporte->created_at->format('d/m/Y H:i') }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @else
        <div class="alert alert-info text-center">No hay detalles de reportes para esta foto.</div>
    @endif

    <div class="text-center mt-4 mb-4">
        <a href="{{ route('admin.reportes') }}" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left"></i> Volver
        </a>
    </div>
</div>
@endsection