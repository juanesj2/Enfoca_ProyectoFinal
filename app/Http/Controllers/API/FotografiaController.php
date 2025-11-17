<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fotografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FotografiaController extends Controller
{
    // Listar todas las fotos (solo públicas)
    public function index()
    {
        $fotografias = Fotografia::with('user', 'likes', 'comentarios')
            ->where('vetada', false)
            ->orderBy('id', 'desc')
            ->paginate(10); // paginación opcional

        return response()->json($fotografias);
    }

    // Mostrar las fotos de un usuario logueado
    public function misFotos(Request $request)
    {
        $user = $request->user(); // auth:sanctum
        $misFotos = $user ? $user->fotografias()->with('likes', 'comentarios')->get() : collect();

        return response()->json($misFotos);
    }

    // Mostrar una foto concreta
    public function show($id)
    {
        $foto = Fotografia::with('user', 'likes', 'comentarios')->find($id);

        if (!$foto) {
            return response()->json(['error' => 'Foto no encontrada'], 404);
        }

        return response()->json($foto);
    }

    // Eliminar foto (solo dueño o admin)
    public function destroy(Request $request, $id)
    {
        $foto = Fotografia::find($id);

        if (!$foto) {
            return response()->json(['error' => 'Foto no encontrada'], 404);
        }

        $user = $request->user();
        if ($user->id !== $foto->usuario_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $foto->delete();

        return response()->json(['message' => 'Foto eliminada correctamente']);
    }
}
