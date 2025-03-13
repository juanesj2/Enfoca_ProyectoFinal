<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FotografiaController;
use App\Http\Controllers\ComentariosController;

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

// Rutas para los comentarios
Route::resource('comentarios', ComentariosController::class);

Route::get('/comentar', [ComentariosController::class, 'index'])->name('comentar.index');
Route::post('/comentar', [ComentariosController::class, 'store'])->name('comentar.store');


// Rutas para dar y quitar likes
Route::post('/fotografias/{fotografia}/like', [FotografiaController::class, 'darLike'])
    ->middleware('auth')
    ->name('fotografias.like');

Route::post('/fotografias/{fotografia}/unlike', [FotografiaController::class, 'quitarLike'])
    ->middleware('auth')
    ->name('fotografias.unlike');