<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reporte;
use App\Models\Fotografia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReporteController extends Controller
{

    public function index()
    {
        $reportes = Reporte::select('foto_id', DB::raw('count(*) as total_reportes'))
            ->with('foto')
            ->groupBy('foto_id')
            ->get();

        return view('ControlReportes.index', compact('reportes'));
    }

    public function detalle($foto_id)
    {
        $foto = Fotografia::findOrFail($foto_id);

        $reportes = Reporte::where('foto_id', $foto_id)
            ->with('usuario')
            ->get();

        return view('ControlReportes.detalles', compact('foto', 'reportes'));
    }

    public function create($id)
    {
        $fotografia = Fotografia::findOrFail($id);
        return view('ControlReportes.create', compact('fotografia'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'fotografia_id' => 'required|exists:fotografias,id',
            'motivo' => 'required|string|max:1000',
        ]);

        Reporte::create([
            'foto_id' => $request->fotografia_id,
            'usuario_id' => Auth::id(),
            'motivo' => $request->motivo,
        ]);

        return redirect()->route('fotografias.index')->with('success', '¡Reporte enviado con éxito!');
    }

    public function eliminarPorFoto($foto_id)
    {
        Reporte::where('foto_id', $foto_id)->delete();

        return redirect()->route('admin.reportes')->with('success', 'Todos los reportes de la foto fueron eliminados.');
    }

}
