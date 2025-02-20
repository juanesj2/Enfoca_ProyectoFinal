<!-- resources/views/auth/login.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    
    <!-- Bootstrap -->
    <link href="{{ url('bootstrap/bootstrap.min.css') }}" rel="stylesheet">
    <script src="{{ url('bootstrap/bootstrap.bundle.min.js') }}"></script>

    <style>
        body {
            background-color: #f8f9fa;
        }
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-card {
            width: 100%;
            max-width: 400px;
            padding: 20px;
        }
    </style>
</head>
<body>

<div class="login-container">
    <div class="card login-card shadow-lg">
        <div class="card-body">
        <img src="{{ asset('imagenes/logo_ENFOKA-sin-fondo.png') }}" alt="Logo" class="img-fluid mx-auto d-block mb-3" style="max-width: 150px;">

            <h3 class="text-center mb-4">Iniciar Sesión</h3>

            @if(session('error'))
                <div class="alert alert-danger">{{ session('error') }}</div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="mb-3">
                    <label for="email" class="form-label">Correo Electrónico</label>
                    <input type="email" name="email" id="email" class="form-control" required autofocus>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" name="password" id="password" class="form-control" required>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember" name="remember">
                    <label class="form-check-label" for="remember">Recordarme</label>
                </div>

                <button type="submit" class="btn btn-primary w-100">Ingresar</button>
            </form>

            <div class="text-center mt-3">
                <a href="{{ route('register') }}" class="text-decoration-none">¿No tienes cuenta? Regístrate</a>
                <br>
                <a href="{{ route('password.request') }}" class="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    </div>
</div>

</body>
</html>
