@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm border-0 rounded-3">
                <div class="card-header bg-primary text-white rounded-top-3 py-3">
                    <h5 class="mb-0 fw-bold"><i class="fas fa-plus-circle me-2"></i> Crear Nuevo Grupo</h5>
                </div>
                <div class="card-body p-4">
                    <form action="{{ route('grupos.store') }}" method="POST">
                        @csrf
                        <div class="mb-4">
                            <label for="nombre" class="form-label fw-bold">Nombre del Grupo <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-lg @error('nombre') is-invalid @enderror" id="nombre" name="nombre" value="{{ old('nombre') }}" placeholder="Ej: Familia, Amigos viaje..." required>
                            @error('nombre')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="mb-4">
                            <label for="descripcion" class="form-label fw-bold">Descripción (Opcional)</label>
                            <textarea class="form-control @error('descripcion') is-invalid @enderror" id="descripcion" name="descripcion" rows="4" placeholder="¿De qué trata este grupo?">{{ old('descripcion') }}</textarea>
                            @error('descripcion')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <a href="{{ route('grupos.index') }}" class="text-decoration-none text-secondary"><i class="fas fa-arrow-left"></i> Cancelar y volver</a>
                            <button type="submit" class="btn btn-primary btn-lg px-4 fw-bold">Crear Grupo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
