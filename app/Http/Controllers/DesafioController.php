<?php

namespace App\Http\Controllers;

// Este es el modelo que usaremos en este controlador
use App\Models\Desafio;

use Illuminate\Http\Request; // Esto nos permitira interactuar con los datos enviados desde un formulario
use Illuminate\Support\Facades\Auth; // Este nos servira para realizar autenticaciones del usuario

class DesafioController extends Controller
{
    
    //**************************************************************/
    //**************************************************************/
    //                Visualizamos los desafios
    //**************************************************************/
    //**************************************************************/

    // Funcion para mostrar la vista de comentarios
    public function index()
    {
        // 1) Si está autenticado y vetado, lo mando a /vetado
        if (Auth::check() && Auth::user()->estaVetado()) {
            return redirect()->route('vetado');
        }

        // 2) Si no está vetado, muestro normalmente
        $desafios = Desafio::paginate(6);

        return view('desafios.index', compact('desafios'));
    }


    // Funcion que se encarga de devolver solamente los desafios del usuario logeado
    public function misDesafios()
    {
        $usuario = Auth::user();
        $misDesafios = $usuario->desafios()->paginate(5);

        return view('desafios.misDesafios', compact('misDesafios'));
    }

}