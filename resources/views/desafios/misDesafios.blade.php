@extends('master')

@section('contenido')
<div class="container">
    <h1 class="mb-4">Mis Logros</h1>

    @if($misDesafios->isEmpty())
        <p>No has conseguido ningún desafío todavía.</p>
    @else
        <div class="list-group">
            @foreach($misDesafios as $desafio)
                <div class="list-group-item d-flex align-items-center">
                    @if($desafio->icono)
                        <img src="{{ asset('icons/' . $desafio->icono) }}" alt="{{ $desafio->titulo }}" width="40" height="40" class="me-3">
                    @endif
                    <div>
                        <h5>{{ $desafio->titulo }}</h5>
                        <p>{{ $desafio->descripcion }}</p>
                        <!-- Ejemplo de mostrar la fecha cuando se consiguió -->
                        <small>Conseguido en: {{ $desafio->pivot->conseguido_en ? \Carbon\Carbon::parse($desafio->pivot->conseguido_en)->format('d/m/Y') : 'Fecha no disponible' }}</small>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
