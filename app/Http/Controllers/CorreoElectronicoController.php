<?php

namespace App\Http\Controllers;

use App\Mail\miCorreoElectronico;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

use App\Models\Fotografia;

class CorreoElectronicoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        // Obtén el usuario autenticado
        $usuario = Auth::user();
    
        if (!$usuario) {
            return response()->json(['success' => false, 'message' => 'Usuario no autenticado'], 401);
        }
    
        // Obtiene la fotografía seleccionada
        $fotografia = Fotografia::with(['likes', 'comentarios'])->find($request->fotografia_id);
    
        if (!$fotografia) {
            return response()->json(['success' => false, 'message' => 'Fotografía no encontrada'], 404);
        }
    
        // Datos a enviar al correo
        $details = [
            'nombre' => $usuario->name,
            'email' => $usuario->email,
            'fotografia' => asset('images/' . $fotografia->direccion_imagen),
            'likes' => $fotografia->likes->count(),
            'comentarios' => $fotografia->comentarios->pluck('contenido')->toArray(),
        ];
    
        // Enviar el correo
        Mail::to($usuario->email)->send(new miCorreoElectronico($details));
    
        // Devolver una respuesta JSON para AJAX
        return response()->json(['success' => true, 'message' => 'Correo enviado con éxito!']);
    }
    
}
