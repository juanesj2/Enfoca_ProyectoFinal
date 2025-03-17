@extends('master')

@section('contenido')

@if($errors->any())
    <div class="alert alert-danger text-center">
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="d-flex justify-content-center">
    <div class="card shadow-lg" style="width: 500px; border-radius: 15px;">
        <div class="card-header bg-white text-center py-3">
            <h5 class="fw-bold">Subir una nueva fotografía</h5>
            <a href="{{ route('fotografias.index') }}" class="btn btn-light btn-sm position-absolute top-0 end-0 m-3">Cancelar</a>
        </div>

        <div class="card-body">
            <form method="post" action="{{ route('fotografias.store') }}" enctype="multipart/form-data">
                @csrf
                @method('POST')

                <input type="hidden" name="usuario_id" value="{{ Auth::user()->id }}">

                <div class="mb-4">
                    <!-- Si se diera algun error en la validacion el old() nos sirve para que los valores no se borren -->
                    <input type="text" id="titulo" name="titulo" value="{{ old('titulo') }}" class="form-control" placeholder="Título" />
                    @error('titulo')
                    <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <div class="mb-4">
                    <textarea id="descripcion" name="descripcion" class="form-control" placeholder="Descripción" rows="3">{{ old('descripcion') }}</textarea>
                    @error('descripcion')
                    <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <div class="mb-4 text-center">
                    <input type="file" id="direccion_imagen" name="direccion_imagen" class="form-control-file d-none" accept="image/*" onchange="vistaPreviaImagen(event)"/>
                    <label for="direccion_imagen" class="btn btn-light border rounded-circle p-4">
                        <i class="fas fa-camera fa-2x"></i>
                    </label>
                    <div class="mt-3" id="vista-previa-imagen"></div>
                    @error('direccion_imagen')
                    <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-primary w-100">Publicar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function vistaPreviaImagen(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = function(e) {
                const salida = document.getElementById('vista-previa-imagen');
                salida.innerHTML = `<img src="${e.target.result}" class="img-fluid rounded" style="max-height: 300px; margin-top: 10px;"/>`;
            };
            lector.readAsDataURL(archivo);
        }
    }
</script>

@endsection