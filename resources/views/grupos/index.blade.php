@extends('master')

@section('contenido')
<div class="container mt-4">
    <div class="row mb-4 align-items-center">
        <div class="col-md-8">
            <h2 class="fw-bold mb-0">Mis Grupos</h2>
            <p class="text-muted">Gestiona tus grupos compartidos</p>
        </div>
        <div class="col-md-4 text-end">
            <a href="{{ route('grupos.joinForm') }}" class="btn btn-outline-secondary btn-sm me-2"><i class="fas fa-sign-in-alt"></i> Unirse</a>
            <a href="{{ route('grupos.create') }}" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Crear Grupo</a>
        </div>
    </div>

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            <i class="fas fa-check-circle me-2"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif
    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>{{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <div class="row">
        @forelse($grupos as $grupo)
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 rounded-3">
                    <div class="card-body">
                        <h4 class="card-title fw-bold text-dark">{{ $grupo->nombre }}</h4>
                        <p class="card-text text-muted" style="min-height: 48px;">{{ Str::limit($grupo->descripcion, 90) ?: 'Sin descripción' }}</p>
                        
                        <div class="d-flex align-items-center text-primary bg-light p-2 rounded">
                            <i class="fas fa-users me-2"></i> 
                            <span class="fw-medium">{{ $grupo->usuarios->count() }} miembros</span>
                        </div>
                    </div>
                    <div class="card-footer bg-white border-top-0 pt-0 pb-3">
                        <a href="{{ route('grupos.show', $grupo->id) }}" class="btn btn-outline-primary w-100">Ir al Grupo</a>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12 mt-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body text-center py-5">
                        <i class="fas fa-users fa-4x mb-3 text-secondary opacity-50"></i>
                        <h4 class="fw-bold text-dark">No tienes ningún grupo todavía</h4>
                        <p class="text-muted mb-4">Puedes crear un nuevo grupo o unirte a uno mediante un código de invitación.</p>
                        <div>
                            <a href="{{ route('grupos.create') }}" class="btn btn-primary me-2"><i class="fas fa-plus"></i> Crear Administrador</a>
                            <a href="{{ route('grupos.joinForm') }}" class="btn btn-secondary"><i class="fas fa-sign-in-alt"></i> Unirse como Miembro</a>
                        </div>
                    </div>
                </div>
            </div>
        @endforelse
    </div>
</div>
@endsection
