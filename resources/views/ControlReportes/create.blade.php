@extends('master')

@section('contenido')
<div class="container mt-5">
    <h2 class="text-center mb-4">Reportar Fotografía</h2>

    <div class="card mx-auto" style="max-width: 600px;">
        <div class="card-body">
            <!-- Nuestro formulario de reporte -->
            <form action="{{ route('reportes.store') }}" method="POST">
                @csrf

                <input type="hidden" name="fotografia_id" value="{{ $fotografia->id }}">

                <!-- La iamgen que queremos reportar -->
                <div class="mb-3 text-center">
                    <img src="{{ asset('images/' . $fotografia->direccion_imagen) }}" alt="Foto reportada" class="img-fluid" style="max-height: 300px;">
                </div>

                <!-- Motivo -->
                <div class="mb-3">
                    <label for="motivo" class="form-label">Motivo del reporte:</label>
                    <textarea name="motivo" id="motivo" rows="4" class="form-control" placeholder="Describe brevemente por qué estás reportando esta imagen..." required></textarea>
                </div>

                <div class="d-flex justify-content-between">
                    <!-- Volver -->
                    <a href="{{ url()->previous() }}" class="btn btn-secondary">
                        <i class="fa-solid fa-arrow-left"></i> Volver
                    </a>

                    <!-- Botón para enviar el reporte -->
                    <button type="submit" class="btn btn-danger">
                        <i class="fa-solid fa-triangle-exclamation"></i> Enviar Reporte
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
