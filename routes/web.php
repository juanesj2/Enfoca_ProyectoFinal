<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FotografiaController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ComentariosController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\CorreoElectronicoController;

Route::get('/fotografia/{id}/pdf', [PDFController::class, 'generarPDF'])->name('generar.pdf');

Route::get('/enviar-correo', [CorreoElectronicoController::class, 'enviarCorreo'])->name('generar.correo');
Route::post('/enviar-correo', [CorreoElectronicoController::class, 'enviarCorreo'])->name('generar.correo');



Route::get('/', function () {
    //Esto redirige nuestra pagina al login que comprueba si el usuario esta o no logeado
    //Si lo esta entras a la pagina si no te pide que lo hagas
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return redirect()->route('fotografias.index');;
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::resource('fotografias', FotografiaController::class);

Route::get('/fotografias/create', [FotografiaController::class, 'create'])->name('fotografias.create');

Route::get('/mis-fotografias', [FotografiaController::class, 'misFotos'])->name('mis.fotografias')->middleware('auth');

// Rutas para dar y quitar likes
Route::post('/fotografias/{fotografia}/like', [LikeController::class, 'darLike'])
    ->middleware('auth')
    ->name('fotografias.like');

Route::post('/fotografias/{fotografia}/unlike', [LikeController::class, 'quitarLike'])
    ->middleware('auth')
    ->name('fotografias.unlike');

// Rutas para los comentarios
Route::resource('comentarios', ComentariosController::class)->except(['show']);

Route::get('/comentar', [ComentariosController::class, 'index'])->name('comentar.index');

// Vamos a crear el metodo delete para eliminar el comentario
Route::delete('/comentarios/{comentarioId}', [ComentariosController::class, 'destroy'])->name('comentarios.destroy');

Route::post('/comentar', [ComentariosController::class, 'store'])->name('comentar.store');

// Vamos a obtener los comentarios de cada foto
Route::get('/fotografias/{id}/comentarios', [ComentariosController::class, 'getComentarios'])->name('comentarios.get');


