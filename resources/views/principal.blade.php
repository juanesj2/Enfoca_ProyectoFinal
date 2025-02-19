<!DOCTYPE html>
<html lang="es">
<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		 
		<meta name="description" content="Vista Principal Laravel 2ºDAW">
		<meta name="author" content="Jorge López">

		<link rel="shortcut icon" href="imagenes/icon.png"/>

		<title>Laravel</title>
		<link rel="shortcut icon" href="imagenes/icon.png"/>

		<!-- estilo general de la página -->
		<link href="ficheros/estilo_pagina.css" rel="stylesheet">

		<!-- estilo barra de menú -->
		<link href="ficheros/barra_menu.css" rel="stylesheet">		
		
		<!-- estilo de formularios -->
		<link href="ficheros/formularios.css" rel="stylesheet">
		
		<!-- estilo de tablas -->
		<link href="ficheros/tablas.css" rel="stylesheet"
		>
		<!-- biblioteca de iconos -->
		<link href="ficheros/all.css" rel="stylesheet">	
		
		<!-- bootstrap -->
		<link href="{{ url('bootstrap/bootstrap.min.css') }}" rel="stylesheet">
		<script src="{{ url('bootstrap/bootstrap.bundle.min.js') }}"></script>		
</head>

<body onload="">
<!-- **************************** CABECERA ************************************************ -->
<!-- **************************** CABECERA ************************************************ -->
<!-- **************************** CABECERA ************************************************ -->
<header>
		<div class="BarraNavegar">
		   @if (Route::has('login'))
				<nav class="-mx-3 flex flex-1 justify-end">
					@auth
						<a
							href="{{ url('/dashboard') }}"
							class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
						>Principal</a>
			@else
						<a
							href="{{ route('login') }}"
							class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
						>Log in</a>

						@if (Route::has('register'))
							<a
								href="{{ route('register') }}"
								class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
							>Registro</a>
						@endif
					@endauth
				</nav>
			@endif			
		</div>
</header>
<!-- **************************** CUERPO ************************************************ -->
<!-- **************************** CUERPO ************************************************ -->
<!-- **************************** CUERPO ************************************************ -->

<div class="contenedor1">
	<img id="imagenlogo" src="imagenes/laravel2.jpg" style="cursor:pointer;max-width: 90%;"></img>
</div>

<!-- **************************** FOOTER ************************************************ -->
<!-- **************************** FOOTER ************************************************ -->
<!-- **************************** FOOTER ************************************************ -->
<footer class="footer">
		<img  id="estrella" src="imagenes/estrella.gif"  height="40" width="40" style="visibility:hidden;"/>
		&nbspLaravel&nbsp&nbsp<i class="fas fa-bolt fa-2x" ></i>
		<label>&nbsp © 2025 Copyright</label>		
</footer>

</body>
</html>

<!-- ***************************************************************-->
<!-- este código se ejecuta después de cargar la página -->
<!-- ***************************************************************-->
<script type="text/javascript">
//**********************************************************************************
// función asociada al "click" del menú pequeñito de barras  
function visualizo_opciones()
{
	// navs->es un array compuesto por todos los elementos pertenecientes a la clase "'.Grupo_opciones"
	// este array tendrá 2 elementos
	const navs = document.querySelectorAll('.Grupo_opciones');
	const navs2 = document.querySelectorAll('.Grupo_opciones_derecha');
	//alert(navs.length);
	//alert(navs2.length);
	
	// con el método ".forEach" me recorro el array y a cada elemento del array le asocio la clase ".visualizo"
	navs.forEach(nav => {nav.classList.toggle('visualizo');});
	navs2.forEach(nav => {nav.classList.toggle('visualizo');});
}
//***********************************************************************************
// código
//***********************************************************************************
// asocio la función "visualizo_opciones()" al evento "click" sobre el menú de barra para móviles
document.querySelector('.Opcion_menu_icono').addEventListener('click', visualizo_opciones);

</script>



