<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsuarioController extends Controller
{
    // Mostrar todos los usuarios
    public function index()
    {
        $usuarios = User::all();
        return view('usuarios.index', compact('usuarios'));
    }

    // Mostrar formulario de edición
    public function edit($id)
    {
        $usuario = User::findOrFail($id);
        return view('ControlUsuarios.edit', compact('usuario'));
    }

    // Método para actualizar los datos del usuario
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'rol' => 'required|in:admin,usuario',
            'vetado' => 'required|integer|min:0', // minutos
        ]);
    
        $usuario = User::findOrFail($id);
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        $usuario->rol = $request->rol;
    
        // Lógica de veto basada en minutos
        $minutos = (int) $request->vetado;
        if ($minutos > 0) {
            $usuario->vetado_hasta = now()->addMinutes($minutos);
        } else {
            $usuario->vetado_hasta = null;
        }
    
        $usuario->save();
    
        return redirect()->route('admin.usuarios')->with('success', 'Usuario actualizado correctamente.');
    }    

    // Eliminar usuario
    public function destroy($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete();

        return redirect()->route('admin.usuarios')->with('success', 'Usuario eliminado correctamente.');
    }
}
