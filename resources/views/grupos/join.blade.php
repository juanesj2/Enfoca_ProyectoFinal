@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <div class="card shadow border-0 rounded-3">
                <div class="card-header bg-dark text-white rounded-top-3 py-4 text-center border-0">
                    <div class="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 72px; height: 72px;">
                        <i class="fas fa-users-cog fs-1"></i>
                    </div>
                    <h4 class="mb-0 fw-bold">Unirse a un Grupo</h4>
                </div>
                <div class="card-body p-4 pb-5">
                    @if(session('error'))
                        <div class="alert alert-danger bg-danger text-white border-0 shadow-sm d-flex align-items-center mb-4">
                            <i class="fas fa-exclamation-circle fs-4 me-3"></i> 
                            <div>{{ session('error') }}</div>
                        </div>
                    @endif

                    <p class="text-center text-muted mb-4 fs-6">
                        Pide a tu amigo que te envíe el <strong>Código de Invitación</strong> de su grupo e introdúcelo aquí abajo.
                    </p>
                    
                    <form action="{{ route('grupos.join') }}" method="POST">
                        @csrf
                        <div class="mb-4">
                            <input type="text" 
                                   class="form-control form-control-lg text-center font-monospace fs-4 py-3 bg-light @error('codigo_invitacion') is-invalid border-danger @enderror" 
                                   id="codigo_invitacion" 
                                   name="codigo_invitacion" 
                                   placeholder="Ej: FeRqEHCanAc" 
                                   value="{{ old('codigo_invitacion') }}"
                                   autocomplete="off"
                                   required>
                            @error('codigo_invitacion')
                                <div class="invalid-feedback text-center fw-medium mt-2">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold rounded-3 mb-3 py-3 shadow-sm">
                            <i class="fas fa-sign-in-alt me-2"></i> Unirse Ahora
                        </button>
                        
                        <div class="text-center">
                            <a href="{{ route('grupos.index') }}" class="text-decoration-none text-secondary">
                                <i class="fas fa-arrow-left me-1"></i> Cancelar
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
