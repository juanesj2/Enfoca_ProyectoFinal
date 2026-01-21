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

    // ----- FOTOGRAFIAS -----
    Route::get('/fotografias', [FotografiaController::class, 'index']);
    Route::get('/mis-fotos', [FotografiaController::class, 'misFotos']);
    Route::get('/fotografias/{id}', [FotografiaController::class, 'show']);
    Route::post('/fotografias', [FotografiaController::class, 'store']);
    Route::delete('/fotografias/{id}', [FotografiaController::class, 'destroy']);

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
    Route::get('/reportes', [ReporteController::class, 'index']); // Admin?

});
