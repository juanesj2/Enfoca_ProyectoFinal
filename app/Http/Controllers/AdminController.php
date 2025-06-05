<?php

namespace App\Http\Controllers;

// Estos seran los modelos que usaremos en este controlador
use App\Models\Fotografia;
use App\Models\User;

use Illuminate\Http\Request;



class AdminController extends Controller
{

    //**************************************************************/
    //**************************************************************/
    //                Cargamos la vista del dashboard
    //**************************************************************/
    //**************************************************************/

    public function dashboard()
    {
        // Verificamos si el usuario es un admin
        if (auth()->user()->rol !== 'admin') {
            return redirect()->route('fotografias.index'); // Redirige si no es admin
        }

        // Obtenemos todas las fotografias
        $fotografias = Fotografia::with('user', 'likes', 'comentarios')->orderBy('id', 'desc')->paginate(5); // Las paginamos de 5 en 5

        return view('admin', compact('fotografias'));
    }

    //**************************************************************/
    //**************************************************************/
    //                Cargamos los usuarios
    //**************************************************************/
    //**************************************************************/

    public function usuarios()
    {
        // Verificamos si el usuario es un admin
        if (auth()->user()->rol !== 'admin') {
            return redirect()->route('fotografias.index');
        }

        $usuarios = User::all(); // Si queremos usar paginacion lo ponemos aqui
        return view('ControlUsuarios.ControlUsuarios', compact('usuarios'));
    }

    //**************************************************************/
    //**************************************************************/
    //                Cargamos las fotografias
    //**************************************************************/
    //**************************************************************/
    public function fotografias()
    {
        // Verificamos si el usuario es un admin
        if (auth()->user()->rol !== 'admin') {
            return redirect()->route('fotografias.index');
        }
        $fotografias = Fotografia::paginate(5);

        return view('Controlfotografias.index', compact('fotografias'));
    }
}
