<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grupo;
use App\Http\Resources\GrupoResource;

class GrupoController extends Controller
{
    public function index()
    {
        $grupos = Grupo::with('usuarios')->get();
        return GrupoResource::collection($grupos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $grupo = Grupo::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'codigo_invitacion' => \Illuminate\Support\Str::random(10),
            'creado_por' => $request->user()->id,
        ]);

        // Añadir al creador como miembro del grupo automáticamente
        $grupo->usuarios()->attach($request->user()->id, ['rol' => 'admin']);

        return new GrupoResource($grupo);
    }

    public function show($id)
    {
        $grupo = Grupo::with('usuarios')->findOrFail($id);
        return new GrupoResource($grupo);
    }

    public function update(Request $request, $id)
    {
        $grupo = Grupo::findOrFail($id);
        
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $grupo->update($request->all());

        return new GrupoResource($grupo);
    }

    public function destroy($id)
    {
        $grupo = Grupo::findOrFail($id);
        $grupo->delete();

        return response()->json(['message' => 'Grupo eliminado']);
    }
}
