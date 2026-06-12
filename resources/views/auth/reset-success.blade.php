<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Love Widget | Contraseña Cambiada</title>
    <style>
        body, html { margin: 0; padding: 0; height: 100%; font-family: 'Inter', sans-serif; }
        .login-content { background: #FFF0F3; position: relative; min-height: 100vh; overflow: hidden; }
        
        .background-bubbles { position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; z-index: 0; }
        .bubble { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.6; animation: float 10s infinite ease-in-out alternate; }
        .bubble-1 { width: 200px; height: 200px; background: #FF4D6D; top: -50px; left: -50px; }
        .bubble-2 { width: 250px; height: 250px; background: #FF8FA3; bottom: -50px; right: -50px; animation-delay: -3s; }
        .bubble-3 { width: 150px; height: 150px; background: #c9184a; top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: -5s; }
        @keyframes float { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-20px) scale(1.05); } }

        .login-container { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; padding: 15px 24px; box-sizing: border-box; }
        
        .header-text { text-align: center; margin-bottom: 20px; }
        .icon-wrapper { background: linear-gradient(135deg, #FF4D6D, #c9184a); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 8px 20px rgba(255, 77, 109, 0.4); }
        .icon-wrapper svg { color: white; width: 32px; height: 32px; }
        h1 { color: #590D22; font-size: 26px; font-weight: 800; margin-bottom: 8px; margin-top: 0; }
        p { color: #A4133C; font-size: 15px; margin-top: 0; line-height: 1.5; }

        .glass-form-container { width: 100%; max-width: 350px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 24px; padding: 30px 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05); box-sizing: border-box; text-align: center; }
        
        .success-icon { color: #10B981; width: 48px; height: 48px; margin-bottom: 10px; }
        
        .glass-btn { background: linear-gradient(135deg, #FF4D6D, #c9184a); color: white; border: none; border-radius: 16px; padding: 14px; font-size: 16px; font-weight: 700; width: 100%; box-shadow: 0 8px 20px rgba(255, 77, 109, 0.3); transition: transform 0.2s, box-shadow 0.2s; display: inline-flex; justify-content: center; align-items: center; cursor: pointer; margin-top: 20px; text-decoration: none; }
        .glass-btn:active { transform: scale(0.96); }
    </style>
</head>
<body>
    <div class="login-content">
        <div class="background-bubbles">
            <div class="bubble bubble-1"></div>
            <div class="bubble bubble-2"></div>
            <div class="bubble bubble-3"></div>
        </div>

        <div class="login-container">
            <div class="header-text">
                <div class="icon-wrapper">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <h1>Love Widget</h1>
            </div>

            <div class="glass-form-container">
                <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 style="color: #590D22; margin: 5px 0 10px; font-size: 20px;">¡Contraseña Cambiada!</h2>
                <p style="color: #A4133C; font-size: 14px; margin-bottom: 0;">Tu contraseña ha sido actualizada con éxito.</p>
                <p style="color: #A4133C; font-size: 14px; margin-top: 5px; font-weight: bold;">Ya puedes volver a la aplicación e iniciar sesión.</p>
            </div>
        </div>
    </div>
</body>
</html>
