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
    Route::get('/usuario', [UserController::class, 'show']); // Antes /user
    Route::put('/usuario', [UserController::class, 'update']); // Antes /user
    Route::get('/usuarios/buscar', [UserController::class, 'search']); // Antes /users/search

    // ----- FOTOGRAFIAS -----
    Route::get('/fotografias', [FotografiaController::class, 'index']);
    Route::get('/fotografias/buscar', [FotografiaController::class, 'buscar']);
    Route::get('/mis-fotos', [FotografiaController::class, 'misFotos']);
    Route::get('/fotografias-usuario/{id}', [FotografiaController::class, 'fotografiasUsuario']);
    Route::get('/fotografias/{id}', [FotografiaController::class, 'show']);
    Route::post('/fotografias', [FotografiaController::class, 'store']);
    Route::delete('/fotografias/{id}', [FotografiaController::class, 'destroy']);
    Route::put('/fotografias/{id}', [FotografiaController::class, 'update']);

    // Admin Fotografia Route
    Route::get('/admin/fotografias', [FotografiaController::class, 'adminIndex']); 

    // ----- COMENTARIOS -----
    Route::get('/fotografias/{fotografiaId}/comentarios', [ComentarioController::class, 'index']);
    Route::post('/fotografias/{fotografiaId}/comentarios', [ComentarioController::class, 'store']);
    Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);

    // ----- LIKES -----
    Route::post('/fotografias/{fotografia}/like', [LikeController::class, 'darLike']);
    Route::delete('/fotografias/{fotografia}/like', [LikeController::class, 'quitarLike']);

    // ----- GRUPOS -----
    Route::get('/grupos/mis-grupos', [GrupoController::class, 'misGrupos']);
    Route::post('/grupos/unirse', [GrupoController::class, 'unirse']);
    Route::delete('/grupos/{id}/salir', [GrupoController::class, 'salir']);
    Route::apiResource('grupos', GrupoController::class);

    // ----- DESAFIOS -----
    Route::apiResource('desafios', DesafioController::class);

    // ----- REPORTES -----
    Route::post('/reportes', [ReporteController::class, 'store']);
    
    // Admin routes (Reportes)
    Route::get('/admin/reportes', [ReporteController::class, 'index']); 
    Route::delete('/admin/reportes/{id}', [ReporteController::class, 'destroyByPhoto']); 

    // ----- USUARIOS -----
    // Admin routes (Usuarios)
    Route::get('/admin/usuarios', [UserController::class, 'index']);
    Route::delete('/admin/usuarios/{id}', [UserController::class, 'destroy']);
    Route::put('/admin/usuarios/{id}', [UserController::class, 'updateAdmin']);
    
    // Rutas públicas de usuarios (si se necesitan)
    Route::get('/usuarios', [UserController::class, 'index']);

});
