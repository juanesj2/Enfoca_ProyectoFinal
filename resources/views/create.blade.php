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

<div class="d-flex justify-content-center mb-3">
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

                <!-- Campo ISO -->
                <div class="mb-4">
                    <input type="number" id="iso" name="ISO" class="form-control" placeholder="ISO (ej: 100)" 
                        value="{{ old('iso') }}" required min="50" max="51200" />
                    @error('iso')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Campo Velocidad de obturación -->
                <div class="mb-4">
                    <input type="text" id="velocidad_obturacion" name="velocidad_obturacion" class="form-control" 
                        placeholder="Velocidad de obturación (ej: 1/250)" value="{{ old('velocidad_obturacion') }}" required />
                    @error('velocidad_obturacion')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Campo Apertura -->
                <div class="mb-4">
                    <input type="number" step="0.1" id="apertura" name="apertura" class="form-control" 
                        placeholder="Apertura (f/1.8, f/5.6, etc)" value="{{ old('apertura') }}" required min="0.7" max="32" />
                    @error('apertura')
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


                <!-- Botón para abrir el modal del mapa -->
                <div class="mb-4 text-center">
                    <button type="button" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#modalMapa">
                        Seleccionar ubicación en el mapa
                    </button>
                </div>

                <!-- Campos ocultos donde se guardarán lat/lon -->
                <input type="hidden" name="latitud" id="latitud" value="{{ old('latitud') }}">
                <input type="hidden" name="longitud" id="longitud" value="{{ old('longitud') }}">

                <!-- Boton de publicar -->
                <div class="text-center">
                    <button type="submit" class="btn btn-primary w-100">Publicar</button>
                </div>
            </form>

            <!-- Modal de Bootstrap -->
            <div class="modal fade" id="modalMapa" tabindex="-1" aria-labelledby="modalMapaLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="modalMapaLabel">Selecciona la ubicación de la foto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <div class="modal-body">
                            <div id="map" style="height: 400px; width: 100%; border-radius: 10px;"></div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Usar esta ubicación</button>
                        </div>

                    </div>
                </div>
            </div>

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

<!-- Carga Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<script>
let mapa;
let marcador;

// Inicializamos el mapa cuando se abre el modal
document.getElementById('modalMapa').addEventListener('shown.bs.modal', function () {
    if (!mapa) {
        mapa = L.map('map').setView([40.4168, -3.7038], 5); // Ubicación inicial España

        // Configuramos el marcador si ya hay coordenadas
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapa);

        // Si ya hay coordenadas, las usamos para centrar el mapa
        mapa.on('click', function (e) {
            if (marcador) {
                marcador.setLatLng(e.latlng);
            } else {
                marcador = L.marker(e.latlng).addTo(mapa);
            }

            // Rellenamos los campos ocultos del formulario
            document.getElementById('latitud').value = e.latlng.lat;
            document.getElementById('longitud').value = e.latlng.lng;
        });
    }

    // Forzamos el redibujo del mapa cuando el modal se muestra
    setTimeout(() => {
        mapa.invalidateSize();
    }, 200);
});
</script>



@endsection