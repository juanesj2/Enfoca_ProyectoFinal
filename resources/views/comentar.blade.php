@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2>Comentar Fotografía</h2>

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

    <table class="table table-bordered text-center" style="width: 50%;">
        <tr>
            <td colspan="4" class="bg-light align-middle" style="height: 150px;">
                <img id="laimagen" style="border-radius:6px;" src="{{ asset('images/' . $fotografia->direccion_imagen) }}" width="75" />
            </td>
        </tr>
        <tr>
            <td class="bg-primary text-white" style="width: 50px;">
                <!-- Modificar aqui para darle funcionalidad al boton de like -->
                <div class="d-flex flex-column align-items-center">
                    <button class="btn like-btn" onclick="{{ $fotografia->comprobarLike() ? 'quitarLike(this)' : 'darLike(this)' }}" fotoId="{{ $fotografia->id }}">
                        <i class="fa-solid fa-heart" id="heart-{{ $fotografia->id }}" style="{{ $fotografia->comprobarLike() ? 'color: red;' : '' }}"></i>
                    </button>
                    <span id="contadorLikes-{{ $fotografia->id }}">{{ $fotografia->likesCount() }}</span>
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

    <form action="{{ route('comentarios.store') }}" method="POST">
        @csrf
        <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">
        <div class="form-group">
            <label for="comentario">Comentario:</label>
            <textarea name="comentario" id="comentario" class="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Enviar Comentario</button>
    </form>
</div>
@endsection