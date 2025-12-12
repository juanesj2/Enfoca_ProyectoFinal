<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reporte;
use App\Http\Resources\ReporteResource;
use Illuminate\Support\Facades\Auth;

class ReporteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reportes = Reporte::with('usuario', 'foto')->get();
        return ReporteResource::collection($reportes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'foto_id' => 'required|exists:fotografias,id',
            'motivo' => 'required|string|max:255',
        ]);

        $reporte = Reporte::create([
            'usuario_id' => Auth::id(),
            'foto_id' => $request->foto_id,
            'motivo' => $request->motivo,
        ]);

        return new ReporteResource($reporte);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
