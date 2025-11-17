<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Controladores
use App\Http\Controllers\Api\FotografiaController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\ComentariosController;
use App\Http\Controllers\DesafioController;
use App\Http\Controllers\GruposController;


// ============================
//       LOGIN / LOGOUT
// ============================
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }

    $user->tokens()->delete();
    $token = $user->createToken('flutter_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user'  => $user,
    ]);
});

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return ['message' => 'Logout correcto'];
});


// ============================
//     RUTAS PROTEGIDAS
// ============================
Route::middleware('auth:sanctum')->group(function () {

    // ----- FOTOGRAFIAS -----
    Route::get('/fotografias', [FotografiaController::class, 'index']);
    Route::get('/fotografias/{id}', [FotografiaController::class, 'show']);
    Route::post('/fotografias', [FotografiaController::class, 'store']);
    Route::delete('/fotografias/{id}', [FotografiaController::class, 'destroy']);

    // ----- LIKES -----
    Route::post('/fotografias/{id}/like', [LikeController::class, 'darLike']);
    Route::post('/fotografias/{id}/unlike', [LikeController::class, 'quitarLike']);

/*     // ----- COMENTARIOS -----
    Route::get('/fotografias/{id}/comentarios', [ComentariosController::class, 'getComentarios']);
    Route::post('/comentarios',          [ComentariosController::class, 'store']);

    // ----- DESAFÍOS -----
    Route::get('/desafios',           [DesafioController::class, 'index']);
    Route::get('/mis-desafios',       [DesafioController::class, 'misDesafios']);
    Route::post('/desafios',          [DesafioController::class, 'store']);
    Route::put('/desafios/{id}',      [DesafioController::class, 'update']);
    Route::delete('/desafios/{id}',   [DesafioController::class, 'destroy']);

    // ----- GRUPOS -----
    Route::get('/grupos',             [GruposController::class, 'index']);
    Route::get('/grupos/{id}',        [GruposController::class, 'show']);
    Route::post('/grupos',            [GruposController::class, 'store']);
    Route::put('/grupos/{id}',        [GruposController::class, 'update']);
    Route::delete('/grupos/{id}',     [GruposController::class, 'destroy']);
 */
});