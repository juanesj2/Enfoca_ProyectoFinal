<!-- Esta es la vista para enviar el correo -->
<!DOCTYPE html>
<html>
<head>
    <title>Detalles de tu Fotografía</title>
</head>
<body>
    <!-- $detail son los detalles del mensaje esto esta configurado en el controlador del correo -->
    <h2>Hola, {{ $details['nombre'] }}</h2>

    <p>Aquí está la fotografía que seleccionaste:</p>

    <!-- La foto seleccionada -->
    <img src="{{ url('images/' . $details['fotografia']) }}" alt="Fotografía" style="width: 100%; max-width: 400px;">

    <p><strong>Likes:</strong> {{ $details['likes'] }}</p>
    <p><strong>Comentarios:</strong> {{ $details['comentariosCount'] }}</p>

    <p><strong>Comentarios:</strong></p>
    <ul>
        <!-- Sacamos los comentarios de la imagen -->
        @foreach ($details['comentarios'] as $comentario)
            <li>{{ $comentario }}</li>
        @endforeach
    </ul>

    <p>Gracias por usar Enfoca.</p>
</body>
</html>
