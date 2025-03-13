<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class Fotografia extends Model
{
    protected $table = 'fotografias';

    public function user()
    {
        //Con esto estamos haciendo una relacion hacia el modelo User mediante la columna usuario_id
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function likes()
    {
        //Con esto estamos haciendo una relacion hacia el modelo Likes mediante la columna fotografia_id
        return $this->hasMany(Likes::class, 'fotografia_id');
    }

    // Método para contar los likes
    public function likesCount()
    {
        return $this->likes()->count();
    }

    public function comentarios()
    {
        //Con esto estamos haciendo una relacion hacia el modelo comentarios mediante la columna fotografia_id
        return $this->hasMany(Comentarios::class, 'fotografia_id');
    }

    // Método para contar los comentarios
    public function comentariosCount()
    {
        return $this->comentarios()->count();
    }


    //**************************************************************/
    //**************************************************************/
    //                      Control de likes
    //**************************************************************/
    //**************************************************************/


    // Método para verificar si el usuario autenticado ha dado like
    public function comprobarLike()
    {
        // Comprueba si el usuario a dado like o no
        return $this->likes()->where('usuario_id', Auth::id())->exists();
    }

    // Metodo para dar
    public function darLike()
    {
        if (Auth::check()) { // Verificar si el usuario está autenticado
            $usuarioId = Auth::id();
            if (!$this->comprobarLike()) {
                $this->likes()->create(['usuario_id' => $usuarioId]);
            }
        }
    }

    //Funcion para quitar like
    public function quitarLike()
    {
        if (Auth::check()) { // Verificar si el usuario está autenticado
            $usuarioId = Auth::id();
            if ($this->comprobarLike()) {
                $this->likes()->where('usuario_id', $usuarioId)->delete();
            }
        }
    }


    //**************************************************************/
    //**************************************************************/
    //                      Control de comentarios
    //**************************************************************/
    //**************************************************************/

    // Método para verificar si el usuario autenticado ha hecho un comentario en la fotografia
    public function comprobarComent()
    {
        // Comprueba si el usuario a dado like o no
        return $this->likes()->where('usuario_id', Auth::id())->exists();
    }

    // Metodo para dar
    public function darComent()
    {
        if (Auth::check()) { // Verificar si el usuario está autenticado
            $usuarioId = Auth::id();
            if (!$this->comprobarLike()) {
                $this->likes()->create(['usuario_id' => $usuarioId]);
            }
        }
    }

    //Funcion para quitar like
    public function quitarComent()
    {
        if (Auth::check()) { // Verificar si el usuario está autenticado
            $usuarioId = Auth::id();
            if ($this->comprobarLike()) {
                $this->likes()->where('usuario_id', $usuarioId)->delete();
            }
        }
    }
}