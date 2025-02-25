@extends('master')

@section('contenido')
<!-- iniciamos SECCIÓN contenido -->

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

<div class="card">
    <div class="card-header text-center bg-primary text-white">
        <div class="row">
            <div class="col"><b>Bienvenido a Enfoka, {{ Auth::user()->name }}</b></div>
        </div>
    </div>
    <div class="card-body" style="text-align: center">
        <!-- 
        <table id="latabla" style="margin: 0 auto; width:80%" class="table table-bordered">
            <tr>
                <th style="text-align:center">Imagen</th>
                <th>Dirección de Imagen</th>
                <th>ID de Estudiante</th>
                <th style="text-align:center">Acción</th>
            </tr>
            @if(count($fotografias) > 0)
                @foreach($fotografias as $fotografia)
                    <tr>
                        <td class="align-middle">
                            <img id="laimagen" style="border-radius:6px;" src="{{ asset('images/' . $fotografia->direccion_imagen) }}" width="75" />
                        </td>
                        <td class="align-middle">{{ $fotografia->direccion_imagen }}</td>
                        <td class="align-middle">{{ $fotografia->student_id }}</td>
                        <td class="align-middle">
                            <form method="post" style="text-align: center;" action="{{ route('fotografias.destroy', $fotografia->id) }}">
                                @csrf
                                @method('DELETE')
                                <a id="b1" href="{{ route('fotografias.show', $fotografia->id) }}" style="width:70px;" class="btn btn-primary btn-sm">Ver</a>
                                <a id="b2" href="{{ route('fotografias.edit', $fotografia->id) }}" style="width:70px;" class="btn btn-warning btn-sm">Editar</a>
                                <input id="b3" type="submit" class="btn btn-danger btn-sm" style="width:70px;" value="Borrar" />
                            </form>
                        </td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="4" class="text-center">No se han encontrado datos</td>
                </tr>
            @endif
        </table><br> 
        -->

        <div class="container mt-3 d-flex flex-column align-items-center">
            @if(count($fotografias) > 0)
                @foreach($fotografias as $fotografia)
                    <table class="table table-bordered text-center" style="width: 50%;">
                        <tr>
                            <td colspan="4" class="bg-light align-middle" style="height: 150px;">
                                <img id="laimagen" style="border-radius:6px;" src="{{ asset('images/' . $fotografia->direccion_imagen) }}" width="75" />
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-primary text-white" style="width: 50px;">
                            <div class="d-flex flex-column align-items-center">

                            @if($fotografia->comprobarLike())
                                        <form method="POST" action="{{ route('fotografias.unlike', $fotografia->id) }}">
                                            @csrf
                                            <button type="submit" class="btn like-btn" data-foto-id="{{ $fotografia->id }}">
                                                <i class="fa-solid fa-heart" id="heart-{{ $fotografia->id }}" style="color: red;"></i>
                                            </button>
                                        </form>
                                    @else
                                        <form method="POST" action="{{ route('fotografias.like', $fotografia->id) }}">
                                            @csrf
                                            <button type="submit" class="btn like-btn" data-foto-id="{{ $fotografia->id }}">
                                                <i class="fa-solid fa-heart" id="heart-{{ $fotografia->id }}"></i>
                                            </button>
                                        </form>
                                    @endif
                            <span id="contadorLikes-{{ $fotografia->id }}">{{ $fotografia->likesCount() }}</span>

                            </div>
                            </td>
                            <td class="bg-info text-white" style="width: 50px;">
                                <div class="d-flex flex-column align-items-center">
                                    <button class="btn">
                                        <i class="fa-solid fa-comment"></i>
                                    </button>
                                    <span class="small text-dark">{{ $fotografia->comentariosCount() }}</span>
                                </div>
                            </td>
                            <!-- Esto lo usare mas adelante-->
                            <!--         
                            <td class="bg-info text-white" style="width: 50px;">
                                <div class="d-flex flex-column align-items-center">
                                    <button class="btn" style="width: 100%; height: 100%;">
                                        <i class="fa-solid fa-bookmark"></i>
                                    </button>
                                    <span class="small text-dark">Contador Favoritos</span>
                                </div>
                            </td> 
                            -->
                            <td class="bg-secondary text-white d-flex justify-content-between">
                                <span>{{ $fotografia->titulo }}</span>
                                <span>Fotografía publicada por: {{ $fotografia->user->name }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="bg-light text-start">{{ $fotografia->descripcion }}</td>
                        </tr>
                    </table>
                @endforeach
            @else
                <tr>
                    <td colspan="4" class="text-center">No se han encontrado datos</td>
                </tr>
            @endif
        </div>
        {!! $fotografias->links() !!}
    </div>
</div><br><br>

<!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    function darQuitarLike(laImagen) {
        const fotoId = laImagen.getAttribute('data-foto-id');
        const contadorLikes = document.getElementById('contadorLikes-' + fotoId);

        $.post("/fotografias/" + fotoId + "/like", {
            _token: '{{ csrf_token() }}'  // Necesario para Laravel
        }, function(datos) {
            if (datos.liked) {
                laImagen.classList.add('active');
                laImagen.setAttribute('data-liked', 'true');
            } else {
                laImagen.classList.remove('active');
                laImagen.setAttribute('data-liked', 'false');
            }
            contadorLikes.textContent = datos.likesCount;
        }).fail(function() {
            alert("Error: No puedes dar like si no estás autenticado.");
        });
    }
</script> -->


@endsection

@section('css')
<style>
@media (max-width: 767.98px)
{
    #latabla
    {
        width: 100%;
        border-collapse: separate;
        border-spacing: 5px;         
    }

    #latabla td, th
    {
        font-size:10px;
        border: 1px solid #dee2e6; 
        border-radius: 5px;        
    }

    #laimagen
    {
        width:40px;
    }
}
</style>
@endsection
