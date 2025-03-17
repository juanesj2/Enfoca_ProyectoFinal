<!-- Esta es nuestra navBar -->
@extends('master')

<!-- Abrimos una sección donde meteremos el contenido que queramos -->
@section('contenido')

<!-- Mensajes de éxito o error -->
@if($message = Session::get('success'))
    <div class="alert alert-success">
        {{ $message }}
    </div>
@endif

@if($message = Session::get('error'))
    <div class="alert alert-danger">
        {{ $message }}
    </div>
@endif

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- Comprobamos si el usuario tiene fotos subidas -->
            @if(count($misFotografias) > 0)
                <!-- Recorremos cada foto del usuario autenticado -->
                @foreach($misFotografias as $fotografia)
                <div class="card mb-4">

                    <!-- Imagen del usuario y su nombre -->
                    <div class="card-header d-flex align-items-center">
                        <span>Publicación de: <strong>{{ Auth::user()->name }}</strong></span>
                    </div>

                    <!-- Imagen publicada -->
                    <div class="d-flex justify-content-center" style="background-color:#e9ecef;">
                        <a href="{{ route('comentar.index', ['fotografia_id' => $fotografia->id]) }}" class="w-100">
                            <img src="{{ asset('images/' . $fotografia->direccion_imagen) }}" class="card-img-top img-fluid tamano-img ">
                        </a>
                    </div>

                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <!-- Contenedor de likes -->
                            <div>
                                <button class="btn p-0" onclick="{{ $fotografia->likes()->where('usuario_id', Auth::id())->exists() ? 'quitarLike(this)' : 'darLike(this)' }}" fotoId="{{ $fotografia->id }}">
                                    <i class="fa-solid fa-heart fs-4" id="corazon-{{ $fotografia->id }}" style="{{ $fotografia->likes()->where('usuario_id', Auth::id())->exists() ? 'color: red;' : '' }}"></i>
                                </button>
                                <span id="contadorLikes-{{ $fotografia->id }}">{{ $fotografia->likesCount() }}</span>
                            </div>

                            <!-- Botón de comentario -->
                            <form action="{{ route('comentarios.index') }}" method="GET" class="m-0">
                                <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">
                                <button type="submit" class="btn p-0">
                                    <i class="fa-solid fa-comment fs-4" style="{{ \App\Models\Comentarios::comprobarComentario($fotografia->id) ? 'color: #FFD700;' : '' }}"></i>
                                </button>
                                <span id="contadorComentarios-{{ $fotografia->id }}">{{ $fotografia->comentariosCount() }}</span>
                            </form>

                            
                        </div>
                        <p class="mb-1"><strong>{{ Auth::user()->name }}</strong> {{ $fotografia->titulo }}</p>
                        <p class="text-muted">{{ $fotografia->descripcion }}</p>
                        
                        <!-- Botón adicional -->
                        <button class="btn btn-secondary btn-lg">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                    </div>
                </div>
                @endforeach
            @else
                <p class="text-center">No has subido ninguna fotografía</p>
            @endif
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    function darLike(button) {
        const fotoId = button.getAttribute('fotoId');
        const contadorLikes = document.getElementById('contadorLikes-' + fotoId);

        $.post("/fotografias/" + fotoId + "/like", {
            _token: '{{ csrf_token() }}'
        }, function(datos) {
            if (datos.liked) {
                button.querySelector('i').style.color = 'red';
                button.setAttribute('onclick', 'quitarLike(this)');
            }
            contadorLikes.textContent = datos.likesCount;
        }).fail(function() {
            alert("Error: No puedes dar like si no estás autenticado.");
        });
    }

    function quitarLike(button) {
        const fotoId = button.getAttribute('fotoId');
        const contadorLikes = document.getElementById('contadorLikes-' + fotoId);

        $.post("/fotografias/" + fotoId + "/unlike", {
            _token: '{{ csrf_token() }}'
        }, function(datos) {
            if (!datos.liked) {
                button.querySelector('i').style.color = '';
                button.setAttribute('onclick', 'darLike(this)');
            }
            contadorLikes.textContent = datos.likesCount;
        }).fail(function() {
            alert("Error: No puedes quitar like si no estás autenticado.");
        });
    }
</script>

@endsection

@section('css')
<style>
    .card {
        max-width: 80%;
        margin: 0 auto;
        border: none;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        background-color: white;
        border-bottom: none;
    }

    .card-img-top {
        border-radius: 0;
    }

    .tamano-img {
        max-width: 100%;
        height: auto;
    }

</style>
@endsection
