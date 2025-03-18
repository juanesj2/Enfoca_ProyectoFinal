<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fotografía PDF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .cabecera {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #eee;
        }
        .cabecera strong {
            color: #2c3e50;
        }
        .fotografia img {
            max-width: 100%;
            border-radius: 8px;
            text-align: center;
        }

        .likes {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #e74c3c;
            font-size: 16px;
        }
        .comentarios-section {
            margin-top: 20px;
        }
        .comentario {
            background: #f9f9f9;
            padding: 12px 15px;
            border-radius: 6px;
            margin-bottom: 12px;
            border-left: 3px solid #3498db;
        }


    </style>
</head>
<body>
    <div class="container">
        <div class="cabecera">
            Publicación de: <strong>{{ $fotografia->user->name }}</strong>
        </div>

        <div class="fotografia mb-4 text-center" style="text-align: center;">
            <img src="{{ public_path('images/' . $fotografia->direccion_imagen) }}" alt="Fotografía">
        </div>

        <div class="stats">
            <div class="likes">
                {{ $fotografia->likesCount() }} Me gusta
            </div>
            <div class="comentarios">
                {{ $fotografia->comentariosCount() }} Comentarios
            </div>
        </div>

        <div class="comentarios-section">
            <h5>Estos son los comentarios de tu fotografia</h5>
            <div class="comentarios">
                @foreach($fotografia->comentarios as $comentario)
                    <div class="comentario">
                        <div class="comentario-user">{{ $comentario->user->name }}</div>
                        <p>{{ $comentario->contenido }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</body>
</html>