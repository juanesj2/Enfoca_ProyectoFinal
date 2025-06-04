<?php

namespace App\Http\Controllers;

// Este es el modelo que usaremos en este controlador
use App\Models\Fotografia;
use App\Models\Desafio;

use Illuminate\Http\Request; // Esto nos permitira interactuar con los datos enviados desde un formulario
use Illuminate\Support\Facades\Auth; // Este nos servira para realizar autenticaciones del usuario
use Intervention\Image\Facades\Image; // Esta libreria nos permitira redimensionar y optimizar las imagenes

class FotografiaController extends Controller
{
    
    //**************************************************************/
    //**************************************************************/
    //                Visualizamos las fotografias
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
        $fotografias = Fotografia::with('user', 'likes', 'comentarios')
            ->where('vetada', false)
            ->orderBy('id', 'desc')
            ->paginate(5);

        return view('index', compact('fotografias'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }


    // Funcion que se encarga de devolver solamente las publicaiones del usuario logeado
    public function misFotos() {
        // Buscamos las fotografias del usuario logeado y si no tiene devolvemos una coleccion 
        // Vacia para que la pagina siga funcionando sin dar error
        // El operador ?? sirve para que php combruebe si el valor pasado el null
        $misFotografias = Auth::user()->fotografias ?? collect(); 
        return view('mis_fotografias', compact('misFotografias'));
    }   

    //**************************************************************/
    //**************************************************************/
    //                Crear y guardar fotografias
    //**************************************************************/
    //**************************************************************/

    // Esta funcion unicamente nos va a redireccionar a la vista create
    public function create()
    {
        if (Auth::check() && Auth::user()->estaVetado()) {
            return redirect()->route('vetado');
        }
        
        return view('create');
    }

    // Esta funcion es la encargada de crear y guardar una nueva fotografia
    public function store(Request $request)
    {
        // Usamos la funcion validate() para comprobar que los daton enviados por el $request cumplen los requisitos
        $request->validate([
            'usuario_id' => 'required',
            'direccion_imagen' => 'required|image|mimes:jpg,png,jpeg,gif,svg', // Se puede enviar cualquiera de estos tipos de archivo
            'titulo' => 'required|max:255',
            'descripcion' => 'required',
            // Metadatos de la fotografía
            'ISO' => 'required|integer|min:50|max:51200',
            'velocidad_obturacion' => 'required|string|max:20',
            'apertura' => 'required|numeric|min:0.7|max:32',
            'latitud' => 'nullable|numeric',
            'longitud' => 'nullable|numeric',
        ]);

        // Estamos definiendo el nombre de la variable con la que guardaremos el archivo
        // Al estar usando el time() nos aseguramos de que cada archivo tiene un nombre diferente
        // y obtenemos la extension con getClientOriginalExtension()
        // El nombre del archivo quedaria algo asi "1633105600.jpg"
        $extension = $request->direccion_imagen->getClientOriginalExtension();
        $nombreArchivo = time() . '.' . $extension;

        // con move() movemos el archivo a la ruta especificada
        $rutaOriginal = public_path('images/original/' . $nombreArchivo);
        $request->direccion_imagen->move(public_path('images/original'), $nombreArchivo);

        // Creamos una copia optimizada de la imagen
        // Usamos la libreria Intervention Image para redimensionar y optimizar la imagen
        // La ruta de la imagen optimizada sera "public/images/optimizadas/1633105600.jpg"
        $rutaOptimizada = public_path('images/optimizadas/' . $nombreArchivo);

        Image::make($rutaOriginal)
            ->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })
            ->encode($extension, 75)
            ->save($rutaOptimizada);

        // Creamos la nueva fotografia con sus datos correspondientes
        $fotografia = new Fotografia;
        $fotografia->usuario_id = $request->usuario_id;
        $fotografia->direccion_imagen = 'original/' . $nombreArchivo; // ORIGINAL
        $fotografia->direccion_optimizada = 'optimizadas/' . $nombreArchivo; // OPTIMIZADA
        $fotografia->titulo = $request->titulo;
        $fotografia->descripcion = $request->descripcion;
        // Metadatos de la fotografía
        $fotografia->ISO = $request->ISO;
        $fotografia->velocidad_obturacion = $request->velocidad_obturacion;
        $fotografia->apertura = $request->apertura;
        $fotografia->latitud = $request->latitud;
        $fotografia->longitud = $request->longitud;
        // Con la funcion save() se guarda en la base de datos nuestra nueva foto
        $fotografia->save();

        /******************** DESAFIO ********************/
        // Comprobamos si es la primera fotografia del usuario
        $user = Auth::user();
        $numFotos = $user->fotografias()->count();

        // Si es la primera foto, le daremos el desafio de primera fotografia"
        if ($numFotos === 1) {
            $desafio = Desafio::where('titulo', 'Primer paso')->first();

            if ($desafio && !$user->desafios->contains($desafio->id)) {
                // attach() nos permite asociar el desafio al usuario en la tabla pivote(La relacion muchos a muchos)
                $user->desafios()->attach($desafio->id, ['conseguido_en' => now()]);
                $user->verificarColeccionista(); // Verificamos si el usuario tiene el desafio de coleccionista
            }
        }

        // Si es la quinta fotografia del usuario le damos otro desafio
        if ($numFotos === 5) {
            $desafio = Desafio::where('titulo', 'Cinco capturas')->first();

            if ($desafio && !$user->desafios->contains($desafio->id)) {
                $user->desafios()->attach($desafio->id, ['conseguido_en' => now()]);
                $user->verificarColeccionista(); // Verificamos si el usuario tiene el desafio de coleccionista
            }
        }

        /****************** FIN DESAFIO ******************/
        
        // Redirijimos a la vista de todas las fotografias con un mensaje de exito
        return redirect('fotografias')->with('success', 'Se ha subido la imagen con éxito !!');
    }

    // Método para mostrar el formulario de edición de la fotografía
    public function edit($id)
    {
        $fotografia = Fotografia::findOrFail($id);
        return view('Controlfotografias.edit', compact('fotografia'));
    }

    // Método para eliminar una fotografía
    public function destroy($id)
    {
        $fotografia = Fotografia::findOrFail($id);
        $fotografia->delete();

        // Redirige con mensaje de éxito
        return redirect()->route('fotografias.index')->with('success', 'Foto eliminada correctamente.');
    }

    public function update(Request $request, $id)
    {
        $fotografia = Fotografia::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
        ]);

        $fotografia->titulo = $request->titulo;
        $fotografia->descripcion = $request->descripcion;

        // Aquí asignamos true si está vetado y false si no
        $fotografia->vetada = $request->has('vetada');

        $fotografia->save();

        return redirect()->route('admin.fotografias')->with('success', 'Fotografía actualizada correctamente.');
    }

}