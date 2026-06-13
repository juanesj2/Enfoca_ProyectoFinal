<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Contraseña</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            background-color: #f3f4f6;
            padding: 40px 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        /* Estilos dinámicos según app */
        <?php if($app === 'love-widget'): ?>
            .header {
                background-color: #FF4D6D;
                color: #ffffff;
            }
            .button {
                background-color: #FF4D6D;
                color: #ffffff;
            }
            .button:hover {
                background-color: #590D22;
            }
        <?php else: ?>
            .header {
                background-color: #1A202C;
                color: #ffffff;
            }
            .button {
                background-color: #3B82F6;
                color: #ffffff;
            }
            .button:hover {
                background-color: #2563EB;
            }
        <?php endif; ?>

        .content {
            padding: 40px 30px;
            color: #374151;
            line-height: 1.6;
            font-size: 16px;
        }
        .content h2 {
            margin-top: 0;
            font-size: 20px;
            color: #111827;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #6b7280;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }
        .small-link {
            word-break: break-all;
            color: #6b7280;
            font-size: 12px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>{{ $app === 'love-widget' ? 'Love Widget' : 'Enfoca' }}</h1>
            </div>
            
            <div class="content">
                <h2>¡Hola!</h2>
                <p>Estás recibiendo este correo porque hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
                
                <div class="button-container">
                    <a href="{{ $url }}" class="button" style="color: #ffffff;">Restablecer Contraseña</a>
                </div>
                
                <p>Este enlace de recuperación expirará en 60 minutos.</p>
                <p>Si no has solicitado un cambio de contraseña, no es necesario que realices ninguna acción. Tu cuenta está segura.</p>
                
                <p>Saludos,<br>
                El equipo de {{ $app === 'love-widget' ? 'Love Widget' : 'Enfoca' }}</p>

                <div class="small-link">
                    Si tienes problemas haciendo clic en el botón "Restablecer Contraseña", copia y pega la siguiente URL en tu navegador web:<br>
                    <a href="{{ $url }}" style="color: #6b7280;">{{ $url }}</a>
                </div>
            </div>
            
            <div class="footer">
                &copy; {{ date('Y') }} {{ $app === 'love-widget' ? 'Love Widget' : 'Enfoca' }}. Todos los derechos reservados.
            </div>
        </div>
    </div>
</body>
</html>
