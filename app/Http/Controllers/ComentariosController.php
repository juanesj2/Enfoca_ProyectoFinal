<?php

namespace App\Http\Controllers;

use App\Models\Comentarios;
use App\Models\Fotografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentariosController extends Controller
{
    // Método para mostrar la vista de comentarios
    public function index(Request $request)
    {
        if (Auth::check()) {
            // Obtener el ID de la fotografía desde la solicitud
            $fotografiaId = $request->input('fotografia_id');

            // Obtener la instancia de la fotografía
            $fotografia = Fotografia::findOrFail($fotografiaId);

            // Pasar el ID de la fotografía a la vista
            return view('comentar', compact('fotografia'));
        } else {
            // Si el usuario no está logueado, redirige a la vista principal.
            return redirect('/');
        }
    }

    // Método para almacenar un nuevo comentario
    public function store(Request $request)
    {
        // Validaciones de los datos que envía el cliente
        $request->validate([
            'fotografia_id' => 'required|exists:fotografias,id',
            'comentario' => 'required|string|max:255',
        ]);

        // Crear y guardar el comentario usando el modelo
        Comentarios::crearComentario([
            'fotografia_id' => $request->fotografia_id,
            'usuario_id' => Auth::id(),
            'comentario' => $request->comentario,
        ]);

        // Redirigir de vuelta a la vista de comentarios con un mensaje de éxito
        return redirect()->route('comentarios.index', ['fotografia_id' => $request->fotografia_id])
                         ->with('success', 'Comentario añadido con éxito.');
    }
}