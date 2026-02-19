<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FotografiaController;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\GrupoController;
use App\Http\Controllers\Api\DesafioController;
use App\Http\Controllers\Api\ReporteController;
use App\Http\Controllers\Api\UserController;

// ============================
//          TEST
// ============================
Route::get('/test', function () {
    return response()->json([
        'mensaje' => 'API funcionando correctamente',
        'status' => 200
    ]);
});

// ============================
//       LOGIN / REGISTER
// ============================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ============================
//     RUTAS PÚBLICAS 
// ============================
// Si quisieramos que se muestrnen sin login, descomentamos esto:
// Route::get('/fotografias', [FotografiaController::class, 'index']);
// Route::get('/fotografias/{id}', [FotografiaController::class, 'show']);


// ============================
//     RUTAS PROTEGIDAS
// ============================
Route::middleware('auth:sanctum')->group(function () {

    // ----- AUTH -----
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);
    Route::get('/users/search', [UserController::class, 'search']);

    // ----- FOTOGRAFIAS -----
    Route::get('/fotografias', [FotografiaController::class, 'index']);
    Route::get('/mis-fotos', [FotografiaController::class, 'misFotos']);
    Route::get('/fotografias-usuario/{id}', [FotografiaController::class, 'fotografiasUsuario']);
    Route::get('/fotografias/{id}', [FotografiaController::class, 'show']);
    Route::post('/fotografias', [FotografiaController::class, 'store']);
    Route::delete('/fotografias/{id}', [FotografiaController::class, 'destroy']);
    Route::put('/fotografias/{id}', [FotografiaController::class, 'update']); // UPDATE A FOTO

    // Admin Fotografia Route (para ver todas incluyendo vetadas)
    Route::get('/admin/fotografias', [FotografiaController::class, 'adminIndex']); 

    // ----- COMENTARIOS -----
    Route::get('/fotografias/{fotografiaId}/comentarios', [ComentarioController::class, 'index']);
    Route::post('/fotografias/{fotografiaId}/comentarios', [ComentarioController::class, 'store']);
    Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);

    // ----- LIKES -----
    Route::post('/fotografias/{fotografia}/like', [LikeController::class, 'darLike']);
    Route::delete('/fotografias/{fotografia}/like', [LikeController::class, 'quitarLike']);

    // ----- GRUPOS -----
    //Route::apiResource('grupos', GrupoController::class);

    // ----- DESAFIOS -----
    //Route::apiResource('desafios', DesafioController::class);

    // ----- REPORTES -----
    Route::post('/reportes', [ReporteController::class, 'store']);
    
    // Admin routes (Spanish)
    Route::get('/admin/reportes', [ReporteController::class, 'index']); 
    Route::delete('/admin/reportes/{id}', [ReporteController::class, 'destroyByPhoto']); // OJO: Flutter llama a esto pasando ID de Foto para borrar reportes

    // Aliases for English routes used in Flutter
    Route::get('/admin/reports', [ReporteController::class, 'index']);
    Route::delete('/admin/reports/{id}', [ReporteController::class, 'destroyByPhoto']);


    // ----- USUARIOS -----
    // Admin routes
    Route::get('/admin/usuarios', [UserController::class, 'index']);
    Route::delete('/admin/usuarios/{id}', [UserController::class, 'destroy']);
    Route::put('/admin/usuarios/{id}', [UserController::class, 'updateAdmin']);

    // Aliases for English routes used in Flutter
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::put('/users/{id}', [UserController::class, 'updateAdmin']);
    
    // Existing user routes (if any needed)
    Route::get('/usuarios', [UserController::class, 'index']);

    // ----- FOTOGRAFIAS (Admin delete) -----
    // Route::delete('/admin/fotografias/{id}', [FotografiaController::class, 'destroy']); // Ya cubierta por /fotografias/{id}

});
