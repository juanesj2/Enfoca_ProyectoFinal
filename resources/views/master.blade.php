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
  
<body class="d-flex flex-column justify-content-center" style="background-color:#e0e0e0;">
    <!-- Esta es la barra de navegacion de la web -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">

            <a class="navbar-brand" href="{{ url('/fotografias') }}">
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
                    <li class="nav-item border-end me-2">
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-house"></i>
                            <a class="nav-link active" aria-current="page" href="{{ url('/fotografias') }}">Inicio</a>
                        </div>
                    </li>
                    <li class="nav-item border-end me-2">
                        <div class="d-flex align-items-center">
                            <i class="fa-regular fa-square-plus"></i>
                            <a class="nav-link active" aria-current="page" href="{{ route('fotografias.create') }}">Crear</a>
                        </div>
                    </li>
                    <li class="nav-item border-end me-2">
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-medal"></i>
                            <a class="nav-link active" aria-current="page" href="{{ route('desafios.index') }}">Desafios</a>
                        </div>
                    </li>

                    <!-- Mas adelante pestaña de prupos -->
                    <!-- <li class="nav-item border-end me-2">
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-user-group"></i>
                            <a class="nav-link active" aria-current="page" href="{{ route('desafios.index') }}">Grupos</a>
                        </div>
                    </li> -->

                    @if (Auth::user()->rol == 'admin')
                    <li class="nav-item border-end me-2">
                        <div class="d-flex align-items-center">
                        <i class="fa-solid fa-crown"></i>
                            <a class="nav-link active" aria-current="page" href="{{ url('/admin') }}">Admin</a>
                        </div>
                    </li>
                    @endif
                    <!-- <li class="nav-item dropdown border-end">
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
                    </li> -->
                </ul>

                <!-- Con esto de aqui añadimos a la 
                nav bar el nombre del usuario y un boton
                para cerrar sesion -->
                <div class="d-flex align-items-center ms-auto">
                    <span class="navbar-text me-3">
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-user me-1"></i>
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ Auth::user()->name }}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a class="dropdown-item" href="{{ route('profile.edit') }}">
                                        <i class="fas fa-user-circle me-2"></i>Mi perfil
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('mis.fotografias') }}">
                                        <i class="fa-solid fa-upload"></i> Mis publicaciones
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('mis.desafios') }}">
                                        <i class="fa-solid fa-medal"></i> Mis desafios
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <form action="{{ route('logout') }}" method="POST">
                                        @csrf
                                        <button type="submit" class="dropdown-item text-danger">
                                            <i class="fas fa-sign-out-alt me-2"></i>Cerrar sesión
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </span>

                    <!-- Esta barra de busqueda la implementare mas adelante -->
                    <!-- <form class="d-flex ms-auto" role="search">
                        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
                        <button type="submit" class="btn btn-success"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form> -->
                </div>
            </div>
        </div>
    </nav>

    <div class="container mt-5 pt-5">
        @yield('contenido')
    </div>
</body>
</html>