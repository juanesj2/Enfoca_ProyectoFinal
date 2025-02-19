<?php

namespace App\Http\Controllers;

use App\Models\estudiante;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::check())
        {
            // si el usuario está logueado, muestra la vista con los datos.
            $data = Estudiante::latest()->paginate(5);
            return view('index', compact('data'))->with('i', (request()->input('page', 1) - 1) * 5);
        }
        else
        {
            // si el usuario no está logueado, redirige a la vista principal.
            // página de inicio
            return redirect('/');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        error_log('ESTOY create');
        return view('create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validaciones de los datos que envía el cliente
        $request->validate([
            'student_name' =>  'required|max:10',
            'student_email'=>  'required|max:15|email|unique:estudiantes',
            'student_image'=>  'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
        ]);

        // obtiene información de la imagen y la copia
        $file_name = time() . '.' . request()->student_image->getClientOriginalExtension();
        request()->student_image->move(public_path('images'), $file_name);

        // crea una instancia del objeto -> 'Estudiante'
        // y lo almacena en la Base de Datos
        $estudiante = new Estudiante;
        $estudiante->student_name = $request->student_name;
        $estudiante->student_email = $request->student_email;
        $estudiante->student_gender = $request->student_gender;
        $estudiante->student_image = $file_name;
        $estudiante->save();

        // volvemos a llamar a la ruta 'students' con un mensaje
        return redirect('students')->with('success', 'Estudiante añadido con éxito !!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        error_log('el estudiante a mostrar'.$id);
        $estudiante = Estudiante::find($id);
        return view('show', compact('estudiante'));
    }

    /**
     * Show the form for editing the specified resource.
     */
	public function edit($id)
    {
        error_log('el estudiante a modificar:'.$id);
        $estudiante = Estudiante::find($id);
        return view('edit', compact('estudiante'));
    }

    /**
     * Update the specified resource in storage.
     */
	public function update(Request $request,$id)
    {
        // no usamos ese parámetro $id
        // lo haremos con inputs ocultos
        // <input type="" name="hidden_id" value="{{ $estudiante->id }}" />

        // la imagen no es "required"
        // quitamos unique en "email"
        $request->validate([
            'student_name' =>  'required|max:10',
            'student_email'=>  'required|max:15|email',
            'student_image'=>  'image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
        ]);

        $estudiante = new Estudiante;

        $student_image = $request->hidden_student_image;

        if($request->student_image != '')
        {
            $student_image = time() . '.' . request()->student_image->getClientOriginalExtension();
            request()->student_image->move(public_path('images'), $student_image);
        }

        $estudiante = Estudiante::find($request->hidden_id);

        $estudiante->student_name = $request->student_name;
        $estudiante->student_email = $request->student_email;
        $estudiante->student_gender = $request->student_gender;
        $estudiante->student_image = $student_image;

        $estudiante->save();

        return redirect('students')->with('success', 'El estudiante se ha modificado con éxito !!');
    }

    /**
     * Remove the specified resource from storage.
     */
	public function destroy($id)
    {
        $estudiante = Estudiante::find($id);

        if ($estudiante)
        {

            $nombre_fichero=$estudiante->student_image;
            error_log('la imagen a borrar:'.$nombre_fichero);
            unlink('images/'.$nombre_fichero);
            // borro estudiante de la BD
            $estudiante->destroy($id);
            // borro imagen física

            return redirect('students')->with('success', 'Estudiante borrado con éxito !!');
        }
        else 
        {
            return redirect('students')->with('error', 'Error: estudiante no existe!!');
        }
    }
}
