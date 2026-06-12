<x-guest-layout>
    @if(isset($appName) && $appName === 'love_widget')
        <div class="text-center mb-6">
            <div class="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Love Widget</h2>
            <p class="text-sm text-gray-500 mt-1">Restablece la contraseña de tu vínculo</p>
        </div>
        <style>
            .bg-gray-100 { background-color: #FFF0F3 !important; }
            .bg-white { background: rgba(255, 255, 255, 0.7) !important; backdrop-filter: blur(10px); }
            button { background-color: #FF4D6D !important; }
            button:hover { background-color: #c9184a !important; }
            input:focus { border-color: #FF4D6D !important; box-shadow: 0 0 0 1px #FF4D6D !important; }
        </style>
    @else
        <div class="text-center mb-6">
            <img src="{{ asset('images/enfoca-logo.png') }}" alt="Enfoca" class="h-16 mx-auto mb-2" onerror="this.style.display='none'">
            <h2 class="text-2xl font-bold text-gray-800">Enfoca</h2>
            <p class="text-sm text-gray-500 mt-1">Introduce tu nueva contraseña</p>
        </div>
    @endif

    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Contraseña')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirmar Contraseña')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                                type="password"
                                name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Restablecer') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
