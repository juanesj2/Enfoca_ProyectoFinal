@extends('master')

@section('contenido')

<div class="container-fluid mt-5">
    <div class="row justify-content-center">
        <!-- En pantallas pequeñas (col-12) ocupan el 100% del ancho, y en pantallas medianas (col-md-4) ocupan un 33% -->
        <div class="col-12 col-md-4 mb-4">
            <!-- Card 1: Control de Usuarios -->
            <div class="card shadow-lg rounded-4">
                <div class="card-body text-center">
                    <i class="fa-solid fa-users fa-3x mb-3 text-primary"></i>
                    <h5 class="card-title mb-3 text-dark">Control de Usuarios</h5>
                    <p class="card-text text-muted mb-4">Gestiona todos los usuarios de la plataforma. Visualiza, edita o elimina usuarios.</p>
                    <a href="{{ route('admin.usuarios') }}" class="btn btn-primary w-100 py-2">IR AL CONTROL DE USUARIOS</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-4 mb-4">
            <!-- Card 2: Control de Fotografías -->
            <div class="card shadow-lg rounded-4">
                <div class="card-body text-center">
                    <i class="fa-solid fa-camera fa-3x mb-3 text-warning"></i>
                    <h5 class="card-title mb-3 text-dark">Control de Fotografías</h5>
                    <p class="card-text text-muted mb-4">Gestiona todas las fotografías subidas. Puedes ver, editar o eliminar fotos.</p>
                    <a href="{{ route('admin.fotografias') }}" class="btn btn-warning w-100 py-2">IR AL CONTROL DE FOTOGRAFIAS</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-4 mb-4">
            <!-- Card 3: Gestión de Reportes -->
            <div class="card shadow-lg rounded-4">
                <div class="card-body text-center">
                    <i class="fa-solid fa-flag fa-3x mb-3 text-danger"></i>
                    <h5 class="card-title mb-3 text-dark">Gestión de Reportes</h5>
                    <p class="card-text text-muted mb-4">Revisa los reportes de contenido inapropiado o problemas con la plataforma.</p>
                    <a href="{{ route('admin.reportes') }}" class="btn btn-danger w-100 py-2">IR AL GESTIÓN DE REPORTES</a>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection

@section('css')
<style>
    .card {
        border-radius: 20px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-10px);
    }

    .card-title {
        font-weight: bold;
    }

    .card-body {
        padding: 2rem;
    }

    .btn {
        font-weight: bold;
        font-size: 1.1rem;
        border-radius: 20px;
        padding: 12px;
        transition: background-color 0.3s ease;
        color: white;
    }

    .btn-primary:hover {
        background-color:rgb(10, 87, 202);
        color: white;
    }

    .btn-warning:hover {
        background-color:rgb(233, 176, 7);
        color: white;
    }


    .btn-danger:hover {
        background-color:rgb(187, 46, 60);
        color: white;
    }

</style>
@endsection
