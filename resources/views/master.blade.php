<!DOCTYPE html>
<html lang="es">
<html class="h-100">

<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="imagenes/logo_ENFOKA-sin-fondo.ico"/>
        <title>Enfoca</title>
        <!-- Bootstrap CSS-JS -->
        <link href="{{ url('bootstrap/bootstrap.min.css') }}" rel="stylesheet">
        <script src="{{ url('bootstrap/bootstrap.bundle.min.js') }}"></script>
        <!-- FontAwesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>

<!-- arreglo particular CSS -->
@yield('css')


<!-- Esto de aqui nos sirve para coger el nombre del usuario que esta logueado en ese momento -->
<!-- {{ Auth::user()->name }} -->
  
<body class="d-flex flex-column  justify-content-center">
    <!-- Esta es la barra de navegacion de la web -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">

            <a class="navbar-brand" href="#">
                <img src="{{ asset('imagenes/logo_ENFOKA-sin-fondo.ico') }}" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                Enfoca
            </a>

            <!-- Botón de colapso -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Contenido colapsable -->
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-house"></i>
                        <a class="nav-link active" aria-current="page" href="{{ url('/students') }}">Inicio</a>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <a class="nav-link active" aria-current="page" href="{{ url('/students') }}">Buscar</a>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-user"></i>
                        <a class="nav-link active" aria-current="page" href="{{ url('/students') }}">Perfil</a>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-question"></i>
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Mas informacion
                        </a>
						
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Contacto</a></li>
                            <li><a class="dropdown-item" href="#">Quien soy?</a></li>
                            <li><a class="dropdown-item" href="#">Que es esto?</a></li>
                        </ul>
						
                    </div>
                </li>
            </ul>
            <!-- Con esto de aqui añadimos a la 
             nav bar el nombre del usuario y un boton
             para cerrar sesion -->
            <div class="d-flex align-items-center ms-auto">
                <span class="navbar-text me-3">
                    {{ Auth::user()->name }}
                </span>
                <form action="{{ route('logout') }}" method="POST" style="display: inline;">
                    @csrf
                    <button type="submit" class="btn btn-danger btn-sm">Logout</button>
                </form>
            </div>
            </div>
        </div>
    </nav>

        <div class="container mt-5">
                <h1 class="text-primary mt-3 mb-4 text-center"><b>Laravel 11 Aplicación Crud</b></h1>
                @yield('contenido')
        </div>
</body>
</html>