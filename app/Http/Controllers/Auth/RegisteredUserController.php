<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // El evento Registered está incluido en el framework de Laravel y se dispara generalmente
        // después de que un usuario se registre en el sistema.
        // Al disparar este evento, puedes realizar acciones adicionales relacionadas
        // con el registro del usuario, como enviar un correo electrónico de bienvenida,
        // actualizar estadísticas, etc.
        event(new Registered($user));

        // iniciamos sesión
        Auth::login($user);
        
        // absolute -> referente a rutas relativas o absolutas
        // return redirect(route('dashboard', absolute: false));
        return redirect(route('fotografias.index',absolute:false));
    }
}



