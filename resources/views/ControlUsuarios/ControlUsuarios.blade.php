@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Usuarios</h2>
    
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    @endif

    @if($usuarios->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Veto</th> {{-- Nueva columna para mostrar si está vetado --}}
                        <th>Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($usuarios as $usuario)
                        <tr>
                            <td>{{ $usuario->name }}</td>
                            <td>{{ $usuario->email }}</td>
                            <td>
                                <span class="badge bg-secondary">{{ $usuario->rol ?? 'usuario' }}</span>
                            </td>
                            <td>
                                @if ($usuario->estaVetado()) {{-- Verificar si está vetado --}}
                                    <span class="badge bg-danger">
                                        Vetado hasta {{ $usuario->vetado_hasta->format('d/m/Y H:i') }}
                                    </span>
                                @else
                                    <span class="badge bg-success">Activo</span>
                                @endif
                            </td>
                            <td>
                                {{ $usuario->created_at->format('d/m/Y H:i') }}
                            </td>
                            <td>
                                <a
                                    href="{{ route('usuarios.edit', $usuario->id) }}"
                                    class="text-primary me-2"
                                    title="Editar"
                                >
                                    <i class="fas fa-edit"></i>
                                </a>
                                <form action="{{ route('usuarios.eliminar', $usuario->id) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-link text-danger p-0" onclick="return confirm('¿Eliminar este usuario?')">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </form>
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
