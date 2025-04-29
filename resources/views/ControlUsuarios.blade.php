@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Usuarios</h2>

    @if($usuarios->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th class="d-none d-sm-table-cell">Email</th>
                        <th class="d-none d-md-table-cell">Rol</th>
                        <th class="d-none d-lg-table-cell">Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($usuarios as $usuario)
                        <tr>
                            <td>
                                <img src="{{ $usuario->avatar_url ?? 'https://via.placeholder.com/40' }}"
                                     alt="Avatar"
                                     class="rounded-circle"
                                     style="width: 40px; height: 40px; object-fit: cover;">
                            </td>
                            <td>{{ $usuario->name }}</td>
                            <td class="d-none d-sm-table-cell">{{ $usuario->email }}</td>
                            <td class="d-none d-md-table-cell">
                                <span class="badge bg-secondary">{{ $usuario->rol ?? 'usuario' }}</span>
                            </td>
                            <td class="d-none d-lg-table-cell">
                                {{ $usuario->created_at->format('d/m/Y H:i') }}
                            </td>
                            <td>
                                <a
                                    {{-- href="{{ route('usuarios.editar', $usuario->id) }}" --}}
                                    class="text-primary me-2"
                                    title="Editar"
                                >
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a
                                    {{-- href="{{ route('usuarios.eliminar', $usuario->id) }}" --}}
                                    class="text-danger"
                                    title="Eliminar"
                                    onclick="return confirm('¿Eliminar este usuario?')"
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
        <div class="alert alert-info text-center">No se encontraron usuarios.</div>
    @endif
</div>
@endsection
