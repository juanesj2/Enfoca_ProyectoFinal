<!DOCTYPE html>
<html>
<head>
    <title>Detalles de tu Fotografía</title>
</head>
<body>
    <h2>Hola, {{ $details['nombre'] }}</h2>

    <p>Aquí está la fotografía que seleccionaste:</p>

    <img src="{{ asset('storage/' . $details['fotografia']) }}" alt="Fotografía" style="width: 100%; max-width: 400px;">

    <p><strong>Likes:</strong> {{ $details['likes'] }}</p>

    <p><strong>Comentarios:</strong></p>
    <ul>
        @foreach ($details['comentarios'] as $comentario)
            <li>{{ $comentario }}</li>
        @endforeach
    </ul>

    <p>Gracias por usar nuestra plataforma.</p>
</body>
</html>
