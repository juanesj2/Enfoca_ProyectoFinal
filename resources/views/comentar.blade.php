@extends('master')

@section('contenido')
<!-- contenedor ptincipal de todo  -->
<div class="container mt-5 d-flex justify-content-center">
    
    <!-- Contenedor para la fotografia y los comentarios -->
    <div class="col-md-8 d-flex">

        <!-- Card de la fotografía -->
        <div class="card mb-4 w-75">

            <!-- La cabecera de la imagen -->
            <div class="card-header">
                <!-- Mas adelante añadire la foto de perfil del usuario junto a su publicacion -->
                <!-- <img src="{{ asset('images/user.png') }}" class="rounded-circle me-2" width="40" height="40"> -->
                <span>Publicaion de: <strong>{{ $fotografia->user->name }}</strong></span>
            </div>

            <!-- La imagen publicada -->
            <div>
                <img id="laimagen" src="{{ asset('images/' . $fotografia->direccion_imagen) }}" class="img-fluid w-100">
            </div>

            <!-- Contenedor para la informacion de la imagen -->
            <div class="card-body p-3 d-flex justify-content-between">

                <!-- Contenedor de los likes (Izquierda) -->
                <div>
                    <!-- Comprobamos si el usuario ha dado o no like -->
                    <button class="btn p-0" onclick="{{ $fotografia->likes()->where('usuario_id', Auth::id())->exists() ? 'quitarLike(this)' : 'darLike(this)' }}" fotoId="{{ $fotografia->id }}">
                        <i class="fa-solid fa-heart fs-4" id="corazon-{{ $fotografia->id }}" style="{{ $fotografia->likes()->where('usuario_id', Auth::id())->exists() ? 'color: red;' : '' }}"></i>
                    </button>
                    <!-- Contador de likes -->
                    <span id="contadorLikes-{{ $fotografia->id }}">{{ $fotografia->likesCount() }}</span>
                </div>

                <!-- Botón de comentarios (Derecha) -->
                <form action="{{ route('comentarios.index') }}" method="GET" class="m-0">
                    <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">

                    <!-- Comprobamos si el usuario ha hecho un comentario o no -->
                    <button type="submit" class="btn p-0">
                        <i class="fa-solid fa-comment fs-4" style="{{ \App\Models\Comentarios::comprobarComentario($fotografia->id) ? 'color: #FFD700;' : '' }}"></i>
                    </button>
                    <!-- Contador de comentarios -->
                    <span id="contadorComentarios-{{ $fotografia->id }}">{{ $fotografia->comentariosCount() }}</span>
                </form>
            </div>

            <!-- Descripción y título debajo -->
            <p class="ms-2"><strong>{{ $fotografia->user->name }}</strong> {{ $fotografia->titulo }}</p>
            <p class="text-muted ms-2">{{ $fotografia->descripcion }}</p>

        </div>

        <!-- Card de los comentarios -->
        <div class="ms-4 w-75 d-flex flex-column">
            <div class="card mb-4 p-3 h-100">
                <div id="comentarios" class="mb-3" style="max-height: 390px; overflow-y: auto;">
                    <!-- Aquí se cargan los comentarios -->
                </div>

                <!-- Formulario para crear un nuevo comentario -->
                <form action="{{ route('comentarios.store') }}" method="POST" class="mt-auto">
                    <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">
                    <div class="form-group">
                        <textarea name="comentario" id="comentario" class="form-control" rows="4" placeholder="Añade un comentario..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Enviar Comentario</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    // Definir la función cargarComentarios globalmente
    function cargarComentarios() {
        const fotoId = '{{ $fotografia->id }}';
        const userId = '{{ Auth::id() }}';  // ID del usuario autenticado
        $.get("/fotografias/" + fotoId + "/comentarios", function(comentarios) {
            let comentariosHtml = '';
            comentarios.forEach(function(comentario) {
                comentariosHtml += `
                    <div class="mb-2 d-flex justify-content-between">
                        <div>
                            <strong>${comentario.user.name}</strong>
                            <p>${comentario.contenido}</p>
                            <small class="text-muted">${comentario.fecha}</small>
                        </div>

                        ${comentario.user.id == userId ? 
                        `
                        <button class="btn" onclick="eliminarComentario(${comentario.id})">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                        ` : ''}
                    </div>
                `;
            });
            $('#comentarios').html(comentariosHtml);
        }).fail(function() {
            alert("Error al cargar los comentarios.");
        });
    }

    // Función para eliminar comentario
    window.eliminarComentario = function(comentarioId) {
        if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            console.log('Eliminando comentario con ID:', comentarioId); // Verifica el comentario ID

            $.ajax({
                url: '/comentarios/' + comentarioId,
                method: 'DELETE',
                data: {
                    _token: '{{ csrf_token() }}'
                },
                success: function() {
                    cargarComentarios();  // Recargar comentarios después de eliminar
                    location.reload();
                },
                error: function(xhr) {
                    alert("Error al eliminar el comentario: " + xhr.responseText);
                }
            });
        }
    };

    $(document).ready(function() {
        cargarComentarios();  // Llamamos a cargar los comentarios cuando la página esté lista
    });

    // Función para dar like
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

    // Función para quitar like
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
