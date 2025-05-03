@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Editar Usuario</h2>

    {{-- Alerta si el usuario está vetado --}}
    @if ($usuario->estaVetado())
        <div class="alert alert-warning text-center">
            ⚠️ Este usuario está vetado hasta <strong>{{ $usuario->vetado_hasta->format('H:i:s') }}</strong>
            (faltan <strong>{{ $usuario->tiempoRestanteVeto() }}</strong>)
        </div>
    @endif

    {{-- Verificación de errores --}}
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    {{-- Formulario de edición --}}
    <form action="{{ route('usuarios.update', $usuario->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="id" class="form-label">ID</label>
            <input type="text" class="form-control" id="id" value="{{ $usuario->id }}" disabled>
        </div>

        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $usuario->name) }}" required>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ old('email', $usuario->email) }}" required>
        </div>

        <div class="mb-3">
            <label for="rol" class="form-label">Rol</label>
            <select class="form-select" id="rol" name="rol" required>
                <option value="admin" {{ $usuario->rol == 'admin' ? 'selected' : '' }}>Admin</option>
                <option value="usuario" {{ $usuario->rol == 'usuario' ? 'selected' : '' }}>Usuario</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="vetado" class="form-label">Tiempo de Veto (en minutos)</label>
            <input type="number" class="form-control" id="vetado" name="vetado" value="0" min="0" required>
            <small class="form-text text-muted">
                Ingrese los minutos que durará el veto a partir de ahora. Usa 0 para no vetar.
            </small>
        </div>

        <button type="submit" class="btn btn-primary">Guardar cambios</button>
    </form>
</div>
@endsection
