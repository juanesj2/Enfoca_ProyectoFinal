<!DOCTYPE html>
<html lang="es">
<html class="h-100">

<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="imagenes/icon.png"/>
		<title>Laravel 11</title>
		<!-- Bootstrap CSS-JS -->
		<link href="{{ url('bootstrap/bootstrap.min.css') }}" rel="stylesheet">
		<script src="{{ url('bootstrap/bootstrap.bundle.min.js') }}"></script>
</head>

<!-- arreglo particular CSS -->
@yield('css')

<body class="d-flex flex-column  justify-content-center">
		<div class="container mt-5">
				<img id="imagenlogo" src="/imagenes/laravel2.jpg" style="cursor:pointer;max-width: 20%;"></img>
				<h1 class="text-primary mt-3 mb-4 text-center"><b>Laravel 11 Aplicación Crud</b></h1>
				@yield('contenido')
		</div>
</body>
</html>
