<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // "LoginRequest" es una clase que Laravel utiliza para validar las entradas de un formulario.
        // El método authenticate() trata de encontrar al usuario en la base de datos con las 
        // credenciales proporcionadas y verificar si son correctas.

        // Si las credenciales son incorrectas, Laravel automáticamente redirige de vuelta
        // con un mensaje de error. Si son correctas, el usuario es autenticado y se crea una sesión.        
        $request->authenticate();

        // regenera el ID de la sesión del usuario después de que se haya autenticado correctamente.
        // Razón para hacerlo: Después de la autenticación, regenerar el ID de la sesión es una medida
        // de seguridad para prevenir ataques de fijación de sesión (session fixation).        
        $request->session()->regenerate();

        // Vamos a verificar el rol del usuario para redirigirlo a un lado o a otro
        $user = Auth::user();

        // Si el usuario es un administrador, lo redirigimos a la página de administración
        if($user->rol == 'admin'){
            //return redirect()->intended(route('dashboard', absolute: false));
            return redirect(route('fotografias.index',absolute:false));
        }

        // Si el usuario no es un administrador, lo redirigimos a la página de inicio
        return redirect(route('fotografias.index',absolute:false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // cierra la sesión del usuario
        Auth::guard('web')->logout();

        // accede a la sesión activa de la solicitud.
        // este método invalida la sesión actual, lo que significa que borra todos los datos
        // almacenados en la sesión, como las variables de la sesión
        // (por ejemplo, el ID del usuario autenticado, etc.).
        $request->session()->invalidate();

        // este método genera un nuevo token de seguridad CSRF (Cross-Site Request Forgery).
        // Laravel utiliza este token para proteger las solicitudes POST contra ataques CSRF.
        $request->session()->regenerateToken();
        
        // página de inicio
        return redirect('/');
    }
}
