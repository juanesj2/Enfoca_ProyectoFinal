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
        <div class="col-sm-10 col-md-8 col-lg-6">
            <!-- Comprobamos si el usuario tiene fotos subidas -->
            @if(count($misFotografias) > 0)
                @foreach($misFotografias as $fotografia)
                <div class="card mb-4 w-100 w-md-75 w-lg-50 mx-auto">
                    
                    <!-- Imagen del usuario y su nombre -->
                    <div class="card-header d-flex align-items-center">
                        <span>Publicación de: <strong>{{ Auth::user()->name }}</strong></span>
                    </div>

                    <!-- Imagen publicada -->
                    <div class="d-flex justify-content-center bg-light">
                        <a href="{{ route('comentar.index', ['fotografia_id' => $fotografia->id]) }}" class="w-100">
                            <img src="{{ asset('images/' . $fotografia->direccion_imagen) }}" class="card-img-top img-fluid">
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

                        <!-- Botón para generar un PDF -->
                        <a href="{{ route('generar.pdf', ['id' => $fotografia->id]) }}" target="_blank" class="btn btn-secondary btn-lg">
                            <i class="fa-solid fa-file-pdf"></i>
                        </a>

                        <!-- Botón para enviar correo -->
                        <a href="#" class="btn btn-secondary btn-lg enviarCorreo" data-foto-id="{{ $fotografia->id }}">
                            <i class="fa-solid fa-envelope"></i>
                        </a>
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
    //**************************************************************/
    //**************************************************************/
    //                            Likes
    //**************************************************************/
    //**************************************************************/

    // Función para dar like
    function darLike(button) {
        const fotoId = button.getAttribute('fotoId'); // ID de la fotografia
        const contadorLikes = document.getElementById('contadorLikes-' + fotoId); // Contador de los likes

        // Usamos JQuery para hacer una solicitud POST la URL es "/fotografias/" + fotoId + "/like"
        $.post("/fotografias/" + fotoId + "/like", {
            _token: '{{ csrf_token() }}' // Este es un token que usa Laravel
        }, 
        function(datos) {
            // La variable datos nos devuelve informacion de los likes desde el servidor

            // Si el like esta dado entonces hacemos cosas
            if (datos.liked) {
                button.querySelector('i').style.color = 'red'; // Cambiamos el color del icono de corazon a rojo
                button.setAttribute('onclick', 'quitarLike(this)'); // Tambien cambiamos la funcionalidad del boton para que al volver a darle quite el like
            }

            // En el contador de likes metemos el conteo de los likes de esa foto
            contadorLikes.textContent = datos.likesCount;
        })
        // Si algo salio mal damos un error
        .fail(function() {
            alert("Error al dar like.");
        });
    }

    // Función para quitar like
    function quitarLike(button) {
        const fotoId = button.getAttribute('fotoId'); // ID de la fotografia
        const contadorLikes = document.getElementById('contadorLikes-' + fotoId); // Contador de los likes

        // Usamos JQuery para hacer una solicitud POST la URL es "/fotografias/" + fotoId + "/unlike"
        $.post("/fotografias/" + fotoId + "/unlike", {
            _token: '{{ csrf_token() }}' // Este es un token que usa Laravel
        }, function(datos) {
            // La variable datos nos devuelve informacion de los likes desde el servidor

            // Si el like no esta dado entonces hacemos cosas
            if (!datos.liked) {
                button.querySelector('i').style.color = '';
                button.setAttribute('onclick', 'darLike(this)');
            }

            // En el contador de likes metemos el conteo de los likes de esa foto
            contadorLikes.textContent = datos.likesCount;
        })
        // Si algo salio mal damos un error
        .fail(function() {
            alert("Error al quitar el like.");
        });
    }

    //**************************************************************/
    //**************************************************************/
    //                            Enviar correo
    //**************************************************************/
    //**************************************************************/

    // Esta funcion se carga cuando la pagina ya este disponible
    $(document).ready(function() {
    // Le asiciamos el evento onclick a los elementos con la clase .enviarCorreo
    $('.enviarCorreo').on('click', function(e) {
        e.preventDefault(); // Evita recargar la página

        const fotoId = $(this).data('foto-id'); // Obtenemos el ID de la foto

        // Mandamos la solicitud al servidor mediante ajax
        $.ajax({
            url: '{{ route('generar.correo') }}',
            method: 'POST',
            data: {
                _token: '{{ csrf_token() }}',
                fotografia_id: fotoId
            },
            // Si todo sale bien sacamos un mensaje de exito
            success: function(response) {
                if (response.success) {
                    $('.alert').remove();
                    $('body').prepend('<div class="alert alert-success">' + response.message + '</div>');
                }
            },
            // Si algo no sale bien devolvemos un mensaje de error
            error: function(xhr) {
                $('.alert').remove();
                $('body').prepend('<div class="alert alert-danger">Error al enviar el correo</div>');
            }
        });
    });
});

</script>

@endsection

@section('css')
<style>
    .alert {
        margin-top: 70px; 
    }

    .card {
        max-width: 80%;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        margin: 0 auto;
    }

    @media (min-width: 768px) {
        .card {
            max-width: 80%;
        }
    }

    @media (min-width: 1024px) {
        .card {
            max-width: 65%;
        }
    }
</style>
@endsection
