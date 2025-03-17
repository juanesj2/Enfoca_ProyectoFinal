<?php

namespace App\Http\Controllers;

use App\Models\Fotografia;
use App\Models\Likes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    //**************************************************************/
    //**************************************************************/
    //                      Control de likes
    //**************************************************************/
    //**************************************************************/

    // Esta el la funcion que se encarga de dar un nuevo like de alta en la base de datos
    public function darLike(Fotografia $fotografia)
    {
        // Primero comprobamos que el usuario este logeado y si no lo esta devolvemos un mensaje de error
        if (!Auth::check()) {
            return response()->json(['error' => 'No estas logueado'], 401);
        }

        // Mediante la funcion darLike del modelo damos de alta el like
        Likes::darLike($fotografia->id);

        // Le devolvemos al cliente estos datos en formato json para poder hacer cosas en js
        return response()->json([
            'liked' => true,
            'likesCount' => $fotografia->likes()->count()
        ]);
    }

    // Esta el la funcion que se encarga de dar baja un like de alta en la base de datos
    public function quitarLike(Fotografia $fotografia)
    {
        // Primero comprobamos que el usuario este logeado y si no lo esta devolvemos un mensaje de error
        if (!Auth::check()) {
            return response()->json(['error' => 'No estas logueado'], 401);
        }

        // Mediante la funcion darLike del modelo damos de baja el like
        Likes::quitarLike($fotografia->id);

        // Le devolvemos al cliente estos datos en formato json para poder hacer cosas en js
        return response()->json([
            'liked' => false,
            'likesCount' => $fotografia->likes()->count()
        ]);
    }
    
}