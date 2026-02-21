@extends('master')

@section('contenido')
<div class="container mt-5">
    <div class="mb-4">
        <a href="{{ route('grupos.index') }}" class="text-decoration-none text-secondary">
            <i class="fas fa-arrow-left me-2"></i> Volver a mis grupos
        </a>
    </div>

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            <i class="fas fa-check-circle me-2"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif
    @if(session('info'))
        <div class="alert alert-info alert-dismissible fade show shadow-sm" role="alert">
            <i class="fas fa-info-circle me-2"></i> {{ session('info') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <div class="row">
        <!-- Columna Principal: Info del Grupo y Miembros -->
        <div class="col-lg-8 mb-4">
            <div class="card shadow-sm border-0 rounded-3 h-100">
                <div class="card-body p-4">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                        <h2 class="fw-bold text-dark mb-3 mb-md-0">{{ $grupo->nombre }}</h2>
                        
                        <div class="d-flex gap-2">
                            @if($grupo->creado_por === Auth::id() || Auth::user()->rol === 'admin')
                                <form action="{{ route('grupos.destroy', $grupo->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de eliminar este grupo definitivamente? Todos los usuarios serán expulsados.');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-outline-danger btn-sm">
                                        <i class="fas fa-trash-alt me-1"></i> Eliminar
                                    </button>
                                </form>
                            @else
                                <form action="{{ route('grupos.leave', $grupo->id) }}" method="POST" onsubmit="return confirm('¿Seguro que deseas salir de este grupo? Tendrás que pedir el código para volver a entrar.');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-outline-warning btn-sm">
                                        <i class="fas fa-sign-out-alt me-1"></i> Salir del Grupo
                                    </button>
                                </form>
                            @endif
                        </div>
                    </div>
                    
                    <div class="bg-light p-3 rounded-3 mb-4">
                        <p class="mb-0 text-secondary" style="font-size: 1.1rem;">
                            {{ $grupo->descripcion ?? 'Este grupo no tiene descripción.' }}
                        </p>
                    </div>
                    
                    <hr class="text-secondary opacity-25 my-4">
                    
                    <h5 class="fw-bold mb-4">
                        <i class="fas fa-users text-primary me-2"></i> 
                        Miembros ({{ $grupo->usuarios->count() }})
                    </h5>
                    
                    <div class="list-group list-group-flush rounded-3 border">
                        @foreach($grupo->usuarios as $miembro)
                            <div class="list-group-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                <div class="d-flex align-items-center">
                                    <div class="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                                        <i class="fas fa-user text-secondary fs-4"></i>
                                    </div>
                                    <div>
                                        <h6 class="mb-0 fw-bold">{{ $miembro->name }}</h6>
                                        <small class="text-muted">{{ $miembro->email }}</small>
                                    </div>
                                </div>
                                
                                @if($miembro->id === $grupo->creado_por)
                                    <span class="badge bg-primary px-3 py-2 rounded-pill">Admin</span>
                                @elseif($miembro->pivot->rol === 'admin')
                                    <span class="badge bg-info text-dark px-3 py-2 rounded-pill">Admin</span>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <!-- Columna Lateral: Código de Invitación -->
        <div class="col-lg-4 mb-4">
            <div class="card shadow border-0 rounded-3 bg-primary text-white sticky-top" style="top: 2rem;">
                <div class="card-body p-4 text-center">
                    <div class="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px;">
                        <i class="fas fa-share-alt fs-2"></i>
                    </div>
                    <h4 class="fw-bold mb-2">Invitar Amigos</h4>
                    <p class="text-white-50 mb-4">
                        Comparte este código para que otros se unan a tu grupo.
                    </p>
                    
                    <div class="bg-white text-dark rounded-3 p-3 mb-4 shadow-sm">
                        <span class="fs-2 fw-bold font-monospace letter-spacing-2" id="codigoTexto">{{ $grupo->codigo_invitacion }}</span>
                    </div>
                    
                    <button class="btn btn-light btn-lg w-100 fw-bold rounded-pill text-primary" onclick="copiarCodigo()">
                        <i class="fas fa-copy me-2"></i> Copiar Código
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function copiarCodigo() {
    var codigo = document.getElementById("codigoTexto").innerText;
    navigator.clipboard.writeText(codigo).then(function() {
        alert("¡Código copiado al portapapeles!");
    }, function(err) {
        console.error('Error al copiar el código: ', err);
    });
}
</script>
@endsection
