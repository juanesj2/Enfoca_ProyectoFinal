<!-- Esta el la vista que se usa para crear una nueva imagen -->
@extends('master')

@section('contenido')

<!-- Comprobamos si hay errores con la funcion any() y la variable $error de Laravel -->
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

        <!-- Este es el header del card -->
        <div class="card-header text-center p-3">
            <h5 class="fw-bold">Subir una nueva fotografía</h5>
            <a href="{{ route('fotografias.index') }}" class="btn btn-light btn-sm position-absolute top-0 end-0 m-3">Cancelar</a>
        </div>

        <!-- Este es el body del card -->
        <div class="card-body">
            <!-- Formulario para subir una nueva fotografia -->
            <form method="post" action="{{ route('fotografias.store') }}" enctype="multipart/form-data">

                @csrf <!-- El token de Laravel para que acepte las solicitudes -->

                <!-- Enviamos el id del usuario logeado -->
                <input type="hidden" name="usuario_id" value="{{ Auth::user()->id }}">

                <!-- El titulo de la foto -->
                <div class="mb-4">
                    <!-- Si se diera algun error en la validacion el old() nos sirve para que los valores no se borren -->
                    <input type="text" id="titulo" name="titulo" value="{{ old('titulo') }}" class="form-control" placeholder="Título" />
                    @error('titulo')
                    <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- La descripcion de la foto -->
                <div class="mb-4">
                    <!-- Si se diera algun error en la validacion el old() nos sirve para que los valores no se borren -->
                    <textarea id="descripcion" name="descripcion" class="form-control" placeholder="Descripción" rows="3">{{ old('descripcion') }}</textarea>
                    @error('descripcion')
                    <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Aqui subimos la foto -->
                <div class="mb-4 text-center">
                    <!-- el accept="image/" solo permite que subamos archivos de imagen -->
                    <input type="file" id="direccion_imagen" name="direccion_imagen" class="form-control-file d-none" accept="image/*" onchange="vistaPreviaImagen(event)"/>
                    
                    <label for="direccion_imagen" class="btn btn-light border rounded-circle p-4">
                        <i class="fas fa-camera fa-2x"></i>
                    </label>

                    <!-- Aqui mostraremos la imagen -->
                    <div class="mt-3" id="vista-previa-imagen"></div>
                    @error('direccion_imagen')
                    <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Boton de publicar -->
                <div class="text-center">
                    <button type="submit" class="btn btn-primary w-100">Publicar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    // Esta el la funcion que se encarga de la vista previa
    function vistaPreviaImagen(event) {
        const archivo = event.target.files[0]; // cogemos el archivo que hemos subido al input
        if (archivo) {
            const lector = new FileReader(); // FileReader() es un objeto de javaScript que nos permite leer archivos
            // Con el onload() se llama a la funcion una vez el archivo se a leido por completo
            lector.onload = function(evento) {
                const salida = document.getElementById('vista-previa-imagen');
                salida.innerHTML = `<img src="${evento.target.result}" class="img-fluid rounded" style="max-height: 300px; margin-top: 10px;"/>`;
            };
            // Al usar la funcion readAsDataURL() creamos una url con los datos asi podemos ver la imagen antes de subirla a ningun servidor
            lector.readAsDataURL(archivo);
        }
    }
</script>

@endsection