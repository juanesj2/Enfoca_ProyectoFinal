@extends('master')

@section('contenido')

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

<div class="container-fluid mt-4">
    <div class="row justify-content-center">
        <div class="col-sm-10 col-md-8 col-lg-6">
            @if(count($fotografias) > 0)
                @foreach($fotografias as $fotografia)
                <div class="card mb-4 w-100 w-md-75 w-lg-50 mx-auto">

                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>Publicación de: <strong>{{ $fotografia->user->name }}</strong></span>

                        <!-- Botones para editar y eliminar -->
                        <div>
                            <!-- Botón de Editar -->
                            <a href="{{ route('Controlfotografias.edit', $fotografia->id) }}" class="btn btn-sm btn-primary me-2" title="Editar">
                                <i class="fa-solid fa-edit"></i> Editar
                            </a>

                            <!-- Botón de Eliminar -->
                            <form action="{{ route('fotografias.destroy', $fotografia->id) }}" method="POST" class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('¿Seguro que deseas eliminar esta foto?')">
                                    <i class="fa-solid fa-trash-alt"></i> Eliminar
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center" style="background-color:#e9ecef;">
                        <a href="{{ route('comentar.index', ['fotografia_id' => $fotografia->id]) }}" class="w-100">
                            <img src="{{ asset('images/' . $fotografia->direccion_imagen) }}" class="card-img-top img-fluid tamano-img" alt="Imagen del usuario">
                        </a>
                    </div>


                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <button type="button" role="button" aria-label="Me gusta esta foto" class="btn p-0" onclick="{{ $fotografia->likes()->where('usuario_id', Auth::id())->exists() ? 'quitarLike(this)' : 'darLike(this)' }}" fotoId="{{ $fotografia->id }}">
                                    <i class="fa-solid fa-heart fs-4" id="corazon-{{ $fotografia->id }}" style="{{ $fotografia->likes()->where('usuario_id', Auth::id())->exists() ? 'color: red;' : '' }}"></i>
                                </button>
                                <span id="contadorLikes-{{ $fotografia->id }}">{{ $fotografia->likesCount() }}</span>
                            </div>

                            <form action="{{ route('comentarios.index') }}" method="GET" class="m-0">
                                <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">
                                <button type="submit" class="btn p-0" role="button" aria-label="Comentar en esta foto">
                                    <i class="fa-solid fa-comment fs-4" style="{{ \App\Models\Comentarios::comprobarComentario($fotografia->id) ? 'color: #FFD700;' : '' }}"></i>
                                </button>
                                <span id="contadorComentarios-{{ $fotografia->id }}">{{ $fotografia->comentariosCount() }}</span>
                            </form>
                        </div>

                        <p class="mb-1"><strong>{{ $fotografia->user->name }}</strong> {{ $fotografia->titulo }}</p>
                        <p class="text-muted">{{ $fotografia->descripcion }}</p>

                        {{-- Indicador de vetada al final --}}
                        @if($fotografia->vetada)
                            <div class="mt-2">
                                <span class="badge bg-danger">Esta foto ha sido vetada</span>
                            </div>
                        @endif
                    </div>

                </div>
                @endforeach
            @else
                <p class="text-center">No se han encontrado datos</p>
            @endif

            {!! $fotografias->links() !!}
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
</script>

@endsection

@section('css')
<style>
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
