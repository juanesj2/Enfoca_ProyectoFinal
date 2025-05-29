@extends('master')

@section('contenido')

<!-- Mensajes de éxito o error -->
@if($message = Session::get('success'))
    <div class="alert alert-success">{{ $message }}</div>
@endif

@if($message = Session::get('error'))
    <div class="alert alert-danger">{{ $message }}</div>
@endif

<div class="container py-4">
    <h1 class="mb-5 text-center">Desafíos Disponibles</h1>

    @if($desafios->isEmpty())
        <div class="text-center text-muted">No hay desafíos disponibles en este momento.</div>
    @else
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            @foreach($desafios as $desafio)
                <div class="col">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body d-flex flex-column align-items-center text-center">

                            <!-- Icono redondeado -->
                            <div class="mb-3">
                                @if($desafio->icono)
                                    <img src="{{ asset('icons/' . $desafio->icono) }}" 
                                         alt="{{ $desafio->titulo }}" 
                                         class="rounded-circle border shadow-sm"
                                         width="70" height="70">
                                @else
                                    <img src="{{ asset('icons/default.png') }}" 
                                         alt="Icono por defecto" 
                                         class="rounded-circle border shadow-sm"
                                         width="70" height="70">
                                @endif
                            </div>

                            <h5 class="card-title">{{ $desafio->titulo ?? 'Nombre no disponible' }}</h5>
                            <p class="card-text text-muted">{{ $desafio->descripcion ?? 'Sin descripción' }}</p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Paginación -->
        <div class="mt-5 d-flex justify-content-center">
            {{ $desafios->links() }}
        </div>
    @endif
</div>

@endsection
