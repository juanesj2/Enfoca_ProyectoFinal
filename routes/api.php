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
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::get('/test/reset-link/{email}', [AuthController::class, 'testResetLink']);
Route::get('/test/user-app/{email}', function($email) {
    $user = \App\Models\User::where('email', $email)->first();
    if ($user) {
        $user->app = 'love_widget';
        $user->save();
    }
    return response()->json(['email' => $email, 'app' => $user ? $user->app : 'not found']);
});

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
    Route::get('/desafios/mis-desafios', [DesafioController::class, 'misDesafios']);
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

    // ----- LOVE ALBUM & CHAT -----
    Route::prefix('love-album')->group(function () {
        Route::post('/pair', [\App\Http\Controllers\Api\LoveAlbumController::class, 'pair']);
        Route::get('/info', [\App\Http\Controllers\Api\LoveAlbumController::class, 'getCoupleInfo']);
        Route::put('/info', [\App\Http\Controllers\Api\LoveAlbumController::class, 'updateCoupleInfo']);
        Route::post('/poke', [\App\Http\Controllers\Api\LoveAlbumController::class, 'poke']);
        Route::post('/remind-streak', [\App\Http\Controllers\Api\LoveAlbumController::class, 'remindStreak']);
        Route::post('/custom-notification', [\App\Http\Controllers\Api\LoveAlbumController::class, 'customNotification']);
        Route::post('/save-fcm-token', [\App\Http\Controllers\Api\LoveAlbumController::class, 'saveFcmToken']);
        Route::post('/avatar', [\App\Http\Controllers\Api\LoveAlbumController::class, 'uploadAvatar']);
        Route::get('/roulette', [\App\Http\Controllers\Api\LoveAlbumController::class, 'getRouletteOptions']);
        Route::post('/roulette', [\App\Http\Controllers\Api\LoveAlbumController::class, 'updateRouletteOptions']);
        
        // Hitos
        Route::get('/milestones', [\App\Http\Controllers\Api\LoveAlbumController::class, 'getMilestones']);
        Route::post('/milestones', [\App\Http\Controllers\Api\LoveAlbumController::class, 'addMilestone']);
        Route::post('/milestones/{id}', [\App\Http\Controllers\Api\LoveAlbumController::class, 'updateMilestone']);
        Route::delete('/milestones/{id}', [\App\Http\Controllers\Api\LoveAlbumController::class, 'deleteMilestone']);
        
        // Wishes
        Route::get('/wishes', [\App\Http\Controllers\Api\LoveAlbumController::class, 'getWishes']);
        Route::post('/wishes', [\App\Http\Controllers\Api\LoveAlbumController::class, 'addWish']);
        Route::put('/wishes/{id}', [\App\Http\Controllers\Api\LoveAlbumController::class, 'updateWish']);
        Route::delete('/wishes/{id}', [\App\Http\Controllers\Api\LoveAlbumController::class, 'deleteWish']);

        // Widget Extras
        Route::get('/widget/food-places', [\App\Http\Controllers\Api\WidgetController::class, 'getFoodPlaces']);
        Route::post('/widget/food-places', [\App\Http\Controllers\Api\WidgetController::class, 'addFoodPlace']);
        Route::put('/widget/food-places/{id}', [\App\Http\Controllers\Api\WidgetController::class, 'updateFoodPlace']);
        Route::delete('/widget/food-places/{id}', [\App\Http\Controllers\Api\WidgetController::class, 'deleteFoodPlace']);

        Route::post('/widget/food-places/{placeId}/dishes', [\App\Http\Controllers\Api\WidgetController::class, 'addFoodDish']);
        Route::post('/widget/food-places/{placeId}/dishes/{dishId}', [\App\Http\Controllers\Api\WidgetController::class, 'updateFoodDish']);
        Route::delete('/widget/food-places/{placeId}/dishes/{dishId}', [\App\Http\Controllers\Api\WidgetController::class, 'deleteFoodDish']);

        Route::get('/widget/movies', [\App\Http\Controllers\Api\WidgetController::class, 'getMovies']);
        Route::post('/widget/movies', [\App\Http\Controllers\Api\WidgetController::class, 'addMovie']);
        Route::put('/widget/movies/{id}', [\App\Http\Controllers\Api\WidgetController::class, 'updateMovie']);
        Route::delete('/widget/movies/{id}', [\App\Http\Controllers\Api\WidgetController::class, 'deleteMovie']);
        
        // Preguntas (Minijuego)
        Route::get('/questions', [\App\Http\Controllers\Api\LoveAlbumController::class, 'getQuestions']);
        Route::post('/questions/{id}/answer', [\App\Http\Controllers\Api\LoveAlbumController::class, 'answerQuestion']);
        
        // Álbumes Personalizados (Colecciones)
        Route::get('/albums', [\App\Http\Controllers\Api\LoveAlbumController::class, 'getAlbums']);
        Route::post('/albums', [\App\Http\Controllers\Api\LoveAlbumController::class, 'createAlbum']);
        Route::post('/albums/{id}/cover', [\App\Http\Controllers\Api\LoveAlbumController::class, 'updateAlbumCover']);
        Route::post('/albums/{id}/photos', [\App\Http\Controllers\Api\LoveAlbumController::class, 'assignPhotosToAlbum']);

        // Fotos
        Route::get('/photos', [\App\Http\Controllers\Api\LoveAlbumController::class, 'index']);
        Route::post('/photos', [\App\Http\Controllers\Api\LoveAlbumController::class, 'store']);
        Route::get('/photos/{id}', [\App\Http\Controllers\Api\LoveAlbumController::class, 'show']);
        Route::get('/photos/{id}/download', [\App\Http\Controllers\Api\LoveAlbumController::class, 'download']);
        Route::delete('/photos/{id}', [\App\Http\Controllers\Api\LoveAlbumController::class, 'destroy']);
        
        // Reacciones a Fotos
        Route::post('/photos/{id}/reactions', [\App\Http\Controllers\Api\LoveAlbumController::class, 'react']);
        
        // Chat Privado
        Route::get('/chat', [\App\Http\Controllers\Api\CoupleChatController::class, 'index']);
        Route::post('/chat', [\App\Http\Controllers\Api\CoupleChatController::class, 'store']);
        Route::put('/chat/{id}', [\App\Http\Controllers\Api\CoupleChatController::class, 'update']);
        Route::delete('/chat/{id}', [\App\Http\Controllers\Api\CoupleChatController::class, 'destroy']);
        Route::post('/chat/{id}/react', [\App\Http\Controllers\Api\CoupleChatController::class, 'react']);
        // Minijuegos
        Route::get('/games/progress', [\App\Http\Controllers\Api\GameController::class, 'getGameProgress']);
        Route::get('/games/swipe/categories', [\App\Http\Controllers\Api\GameController::class, 'getSwipeCategories']);
        Route::get('/games/swipe/cards', [\App\Http\Controllers\Api\GameController::class, 'getSwipeCards']);
        Route::get('/games/swipe/all', [\App\Http\Controllers\Api\GameController::class, 'getAllSwipeCards']);
        Route::post('/games/swipe/answer', [\App\Http\Controllers\Api\GameController::class, 'answerSwipe']);
        Route::get('/games/swipe/stats', [\App\Http\Controllers\Api\GameController::class, 'getSwipeStats']);

        Route::get('/games/drawing/categories', [\App\Http\Controllers\Api\GameController::class, 'getDrawingCategories']);
        Route::get('/games/drawing/prompt', [\App\Http\Controllers\Api\GameController::class, 'getDrawingPrompt']);
        Route::get('/games/drawing/all', [\App\Http\Controllers\Api\GameController::class, 'getAllDrawingPrompts']);
        Route::post('/games/drawing/upload', [\App\Http\Controllers\Api\GameController::class, 'uploadDrawing']);
        Route::get('/games/drawing/{promptId}/result', [\App\Http\Controllers\Api\GameController::class, 'getDrawingResult']);
    });

});
