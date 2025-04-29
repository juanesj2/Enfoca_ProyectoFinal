@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Control de Fotografías</h2>

    @if($fotos->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>Miniatura</th>
                        <th>Usuario</th>
                        <th class="d-none d-sm-table-cell">Subida</th>
                        <th class="d-none d-md-table-cell">Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($fotos as $foto)
                        <tr>
                            <td>
                                <img src="{{ $foto->url ?? 'https://via.placeholder.com/80' }}"
                                     alt="Foto"
                                     class="rounded"
                                     style="width: 80px; height: 80px; object-fit: cover;">
                            </td>
                            <td>{{ $foto->usuario->name ?? 'Desconocido' }}</td>
                            <td class="d-none d-sm-table-cell">{{ $foto->created_at->format('d/m/Y H:i') }}</td>
                            <td class="d-none d-md-table-cell">
                                <span class="badge bg-info text-dark">{{ $foto->estado ?? 'pendiente' }}</span>
                            </td>
                            <td>
                                <a
                                    {{-- href="{{ route('fotos.ver', $foto->id) }}" --}}
                                    class="text-primary me-2"
                                    title="Ver"
                                >
                                    <i class="fas fa-eye"></i>
                                </a>
                                <a
                                    {{-- href="{{ route('fotos.aprobar', $foto->id) }}" --}}
                                    class="text-success me-2"
                                    title="Aprobar"
                                >
                                    <i class="fas fa-check-circle"></i>
                                </a>
                                <a
                                    {{-- href="{{ route('fotos.eliminar', $foto->id) }}" --}}
                                    class="text-danger"
                                    title="Eliminar"
                                    onclick="return confirm('¿Eliminar esta foto?')"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @else
        <div class="alert alert-info text-center">No se encontraron fotografías.</div>
    @endif
</div>
@endsection
