@if(isset($appName) && $appName === 'love_widget')
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Love Widget | Recuperar Contraseña</title>
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
        .icon-wrapper { background: linear-gradient(135deg, #FF4D6D, #c9184a); width: 50px; height: 50px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; box-shadow: 0 8px 20px rgba(255, 77, 109, 0.4); }
        .icon-wrapper svg { color: white; width: 26px; height: 26px; }
        h1 { color: #590D22; font-size: 24px; font-weight: 800; margin-bottom: 4px; margin-top: 0; }
        p { color: #A4133C; font-size: 14px; margin-top: 0; }

        .glass-form-container { width: 100%; max-width: 350px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 24px; padding: 20px 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05); box-sizing: border-box; }
        .auth-form { display: flex; flex-direction: column; gap: 12px; }
        .input-group { display: flex; align-items: center; background: rgba(255, 255, 255, 0.7); border-radius: 16px; padding: 2px 15px; border: 1px solid rgba(255, 255, 255, 0.8); transition: all 0.3s ease; box-sizing: border-box; }
        .input-group:focus-within { background: rgba(255, 255, 255, 0.9); border-color: #FF4D6D; box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.1); }
        
        input { flex: 1; border: none; background: transparent; padding: 10px 0; color: #590D22; font-size: 15px; outline: none; width: 100%; }
        input::placeholder { color: rgba(89, 13, 34, 0.5); }
        input:-webkit-autofill { -webkit-text-fill-color: #590D22 !important; transition: background-color 5000s ease-in-out 0s; }
        
        .glass-btn { background: linear-gradient(135deg, #FF4D6D, #c9184a); color: white; border: none; border-radius: 16px; padding: 14px; font-size: 16px; font-weight: 700; width: 100%; box-shadow: 0 8px 20px rgba(255, 77, 109, 0.3); transition: transform 0.2s, box-shadow 0.2s; display: flex; justify-content: center; align-items: center; cursor: pointer; margin-top: 10px; }
        .glass-btn:active { transform: scale(0.96); }
        .error-msg { color: #c9184a; font-size: 12px; margin-top: 2px; }
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
                <p>Restablece la contraseña de tu vínculo</p>
            </div>

            <div class="glass-form-container">
                <form method="POST" action="{{ route('password.store') }}" class="auth-form">
                    @csrf
                    <input type="hidden" name="token" value="{{ $request->route('token') }}">
                    <input type="hidden" name="appName" value="love_widget">

                    <div>
                        <div class="input-group">
                            <input type="email" name="email" value="{{ old('email', $request->email) }}" required autofocus autocomplete="username" placeholder="Correo electrónico" readonly />
                        </div>
                        <x-input-error :messages="$errors->get('email')" class="error-msg" />
                    </div>

                    <div>
                        <div class="input-group">
                            <input type="password" name="password" required autocomplete="new-password" placeholder="Nueva Contraseña" />
                        </div>
                        <x-input-error :messages="$errors->get('password')" class="error-msg" />
                    </div>

                    <div>
                        <div class="input-group">
                            <input type="password" name="password_confirmation" required autocomplete="new-password" placeholder="Confirmar Contraseña" />
                        </div>
                        <x-input-error :messages="$errors->get('password_confirmation')" class="error-msg" />
                    </div>

                    <button type="submit" class="glass-btn">
                        Restablecer
                    </button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
@else
<x-guest-layout>
    <div class="text-center mb-6">
        <img src="{{ asset('images/enfoca-logo.png') }}" alt="Enfoca" class="h-16 mx-auto mb-2" onerror="this.style.display='none'">
        <h2 class="text-2xl font-bold text-gray-800">Enfoca</h2>
        <p class="text-sm text-gray-500 mt-1">Introduce tu nueva contraseña</p>
    </div>

    <form method="POST" action="{{ route('password.store') }}">
        @csrf
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="password" :value="__('Contraseña')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirmar Contraseña')" />
            <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Restablecer') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
@endif
