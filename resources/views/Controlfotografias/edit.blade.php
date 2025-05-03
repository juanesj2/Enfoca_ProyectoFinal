@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Editar Fotografía</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <strong>Errores encontrados:</strong>
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('fotografias.update', $fotografia->id) }}" method="POST">
        @csrf
        @method('PUT')

        <!-- ID (Solo lectura) -->
        <div class="mb-3">
            <label class="form-label">ID</label>
            <input type="text" class="form-control" value="{{ $fotografia->id }}" readonly>
        </div>

        <!-- Usuario (Solo lectura) -->
        <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input type="text" class="form-control" value="{{ $fotografia->user->name }}" readonly>
        </div>

        <!-- Título -->
        <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" name="titulo" id="titulo" class="form-control" value="{{ old('titulo', $fotografia->titulo) }}" required>
        </div>

        <!-- Descripción -->
        <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea name="descripcion" id="descripcion" class="form-control" rows="4" required>{{ old('descripcion', $fotografia->descripcion) }}</textarea>
        </div>

        <!-- Checkbox para vetar -->
        <div class="form-check mb-4">
            <input type="checkbox" name="vetada" id="vetada" class="form-check-input"
                   {{ $fotografia->vetada ? 'checked' : '' }}>
            <label class="form-check-label" for="vetada">¿Vetada?</label>
        </div>

        <div class="d-flex justify-content-between">
            <a href="{{ route('admin.fotografias') }}" class="btn btn-secondary">Cancelar</a>
            <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
    </form>
</div>
@endsection
