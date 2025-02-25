<?php

namespace App\Http\Controllers;

use App\Models\Fotografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FotografiaController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            // si el usuario está logueado, muestra las fotografías
            // Se pasara el usuario que subio la fotografia y una paginacion de 5 fotografias
            // la funcion with() se utiliza para cargar las relaciones de manera anticipada
            $fotografias = Fotografia::with('user', 'likes', 'comentarios')->paginate(5);

            return view('index', compact('fotografias'))->with('i', (request()->input('page', 1) - 1) * 5);
        } else {
            // si el usuario no está logueado, redirige a la vista principal.
            return redirect('/');
        }
    }

    public function create()
    {
        error_log('ESTOY create');
        return view('create');
    }

    public function store(Request $request)
    {
        // validaciones de los datos que envía el cliente
        $request->validate([
            'usuario_id' => 'required',
            'fotografia_image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',
            'fotografia_titulo' => 'required|max:255',
            'fotografia_descripcion' => 'required'
        ]);

        // obtiene información de la imagen y la copia
        $file_name = time() . '.' . $request->fotografia_image->getClientOriginalExtension();
        $request->fotografia_image->move(public_path('images'), $file_name);

        // crea una instancia del objeto -> 'Fotografia'
        // y lo almacena en la Base de Datos
        $fotografia = new Fotografia;
        $fotografia->usuario_id = $request->usuario_id;
        $fotografia->fotografia_image = $file_name;
        $fotografia->fotografia_titulo = $request->fotografia_titulo;
        $fotografia->fotografia_descripcion = $request->fotografia_descripcion;
        $fotografia->save();

        // volvemos a llamar a la ruta 'fotografias' con un mensaje
        return redirect('fotografias')->with('success', 'Se ha subido la imagen con éxito !!');
    }

    public function show(Fotografia $fotografia)
    {
        return view('show', compact('fotografia'));
    }

    public function edit(Fotografia $fotografia)
    {
        return view('edit', compact('fotografia'));
    }

    public function update(Request $request, Fotografia $fotografia)
    {
        $request->validate([
            'fotografia_titulo' => 'required|max:255',
            'fotografia_descripcion' => 'required',
            'fotografia_image' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
        ]);

        $file_name = $fotografia->fotografia_image;
        if ($request->hasFile('fotografia_image')) {
            $file_name = time() . '.' . $request->fotografia_image->getClientOriginalExtension();
            $request->fotografia_image->move(public_path('images'), $file_name);
        }

        $fotografia->update([
            'fotografia_titulo' => $request->fotografia_titulo,
            'fotografia_descripcion' => $request->fotografia_descripcion,
            'fotografia_image' => $file_name
        ]);

        return redirect()->route('fotografias.index')
                        ->with('success', 'Fotografía actualizada con éxito.');
    }

    public function destroy(Fotografia $fotografia)
    {
        $fotografia->delete();

        return redirect()->route('fotografias.index')
                        ->with('success', 'Fotografía eliminada con éxito.');
    }

    public function darLike(Fotografia $fotografia)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'No autenticado');
        }

        $fotografia->darLike();

        return redirect()->back()->with('success', 'Has dado like a la fotografía');
    }

    public function quitarLike(Fotografia $fotografia)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'No autenticado');
        }

        $fotografia->quitarLike();

        return redirect()->back()->with('success', 'Has quitado el like de la fotografía');
    }
    
}