<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FotografiaController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ComentariosController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\CorreoElectronicoController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ReporteController;

// página de avisos para usuarios vetados
Route::get('/vetado', function(){
    return view('vetado');
})->name('vetado');


    //**************************************************************/
    //**************************************************************/
    //               Rutas para Login y cosas del usuario
    //**************************************************************/
    //**************************************************************/

    Route::get('/', function () {
        //Esto redirige nuestra pagina al login que comprueba si el usuario esta o no logeado
        //Si lo esta entras a la pagina si no te pide que lo hagas
        return redirect()->route('login');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    
    Route::get('/dashboard', function () {
        return redirect()->route('fotografias.index');;
    })->middleware(['auth', 'verified'])->name('dashboard');


    //**************************************************************/
    //**************************************************************/
    //                  Rutas para el Admin
    //**************************************************************/
    //**************************************************************/

    Route::middleware(['auth'])->group(function () {
        Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    });

    //****************** Control de usuarios ***********************/

    // Entrar a control de usuarios
    Route::get('/admin/controlUsuarios', [AdminController::class, 'usuarios'])->name('admin.usuarios')->middleware('auth');

    // Mostrar el formulario de edición
    Route::get('/usuarios/{id}/editar', [UsuarioController::class, 'edit'])->name('usuarios.edit');

    // Actualizar los datos del usuario
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update'])->name('usuarios.update');

    //Eliminar un usuario
    Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy'])->name('usuarios.eliminar');

    //****************** Control de fotografias ***********************/

    // Entrar a control de fotografias
    Route::get('/admin/ControlFotografias', [AdminController::class, 'fotografias'])->name('admin.fotografias')->middleware('auth');
    
    // Eliminar fotografia
    Route::delete('/fotografias/{id}', [FotografiaController::class, 'destroy'])->name('fotografias.destroy');

    // Mostrar el formulario de edición
    Route::get('/fotografias/{id}/edit', [FotografiaController::class, 'edit'])->name('Controlfotografias.edit');

    // Actualizar los datos de la fotografia
    Route::put('/admin/fotografias/{id}', [AdminController::class, 'actualizarFoto'])->name('admin.fotografias.update');

    //****************** Control de reportes ***********************/

    // Entrar al panel de control de reportes
    Route::get('/admin/controlReportes', [ReporteController::class, 'index'])->name('admin.reportes')->middleware('auth');

    // Ver detalles de los reportes de una foto específica
    Route::get('/admin/controlReportes/{foto_id}', [ReporteController::class, 'detalle'])->name('reportes.detalle')->middleware('auth');

    // Crear un nuevo reporte
    Route::get('/reportes/create/{id}', [ReporteController::class, 'create'])->name('reportes.create');

    // Guardar un nuevo reporte
    Route::post('/reportes', [ReporteController::class, 'store'])->name('reportes.store');

    // Eliminar los reportes de una foto
    Route::delete('/reportes/foto/{foto_id}', [ReporteController::class, 'eliminarPorFoto'])->name('reportes.eliminarPorFoto');

    //**************************************************************/
    //**************************************************************/
    //                  Rutas para fotografias
    //**************************************************************/
    //**************************************************************/
    
    Route::resource('fotografias', FotografiaController::class);

    Route::get('/fotografias/create', [FotografiaController::class, 'create'])->name('fotografias.create');
    Route::get('/mis-fotografias', [FotografiaController::class, 'misFotos'])->name('mis.fotografias')->middleware('auth');

    Route::delete('/fotos/{foto}', [FotografiaController::class, 'destroy'])->name('fotos.destroy');

    //**************************************************************/
    //**************************************************************/
    //                  Rutas para los likes
    //**************************************************************/
    //**************************************************************/

    Route::post('/fotografias/{fotografia}/like', [LikeController::class, 'darLike'])
    ->middleware('auth')
    ->name('fotografias.like');

    Route::post('/fotografias/{fotografia}/unlike', [LikeController::class, 'quitarLike'])
    ->middleware('auth')
    ->name('fotografias.unlike');

    //**************************************************************/
    //**************************************************************/
    //                Rutas para los comentarios
    //**************************************************************/
    //**************************************************************/

    Route::resource('comentarios', ComentariosController::class)->except(['show']);

    // Obtenemos todos los comentarios
    Route::get('/comentar', [ComentariosController::class, 'index'])->name('comentar.index');

    // Obtenemos las fotos de una foto seleccionada
    Route::get('/fotografias/{id}/comentarios', [ComentariosController::class, 'getComentarios'])->name('comentarios.get');

    // Ruta para almacenar un nuevo comentario
    Route::post('/comentar', [ComentariosController::class, 'store'])->name('comentar.store');


    //**************************************************************/
    //**************************************************************/
    //                       Rutas para los PDFs
    //**************************************************************/
    //**************************************************************/

    Route::get('/fotografia/{id}/pdf', [PDFController::class, 'generarPDF'])->name('generar.pdf');

    //**************************************************************/
    //**************************************************************/
    //                       Rutas para los correos
    //**************************************************************/
    //**************************************************************/

    Route::post('/enviar-correo', [CorreoElectronicoController::class, 'enviarCorreo'])->name('generar.correo');

    require __DIR__.'/auth.php';