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


                                <!--Modificar aqui para darle funcionalidad al boton de like-->
                                <div class="d-flex flex-column align-items-center">
                                    <button class="btn like-btn" onclick="{{ $fotografia->comprobarLike() ? 'quitarLike(this)' : 'darLike(this)' }}" fotoId="{{ $fotografia->id }}">
                                        <i class="fa-solid fa-heart" id="heart-{{ $fotografia->id }}" style="{{ $fotografia->comprobarLike() ? 'color: red;' : '' }}"></i>
                                    </button>
                                    <span id="contadorLikes-{{ $fotografia->id }}">{{ $fotografia->likesCount() }}</span>
                                </div>
                            </td>
                            <td class="bg-info text-white" style="width: 50px;">
                                <div class="d-flex flex-column align-items-center">


                                    <!--Modificar aqui para darle funcionalidad al boton de comentario-->
                                    <form action="{{ route('comentarios.index') }}" method="GET">
                                        @csrf
                                        <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">
                                        <button type="submit" class="btn">
                                            <i class="fa-solid fa-comment"></i>
                                        </button>
                                    </form>
                                    <span class="small text-dark">{{ $fotografia->comentariosCount() }}</span>
                                </div>
                            </td>
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